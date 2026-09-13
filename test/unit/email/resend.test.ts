import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  renderWelcomeEmail,
  renderPasswordResetEmail,
  renderVerificationEmail,
  renderScanMilestoneEmail,
} from '@/lib/email/templates';
import {
  sendEmail,
  sendWelcomeNotification,
  sendPasswordResetNotification,
  sendVerificationNotification,
  sendScanMilestoneNotification,
} from '@/lib/email/resend';

describe('Email Templates Generation', () => {
  it('génère correctement le modèle d\'email de bienvenue', () => {
    const email = renderWelcomeEmail({
      userName: 'Alice',
      dashboardUrl: 'https://qrcraft.app/dashboard',
    });

    expect(email.subject).toContain('Bienvenue sur QRCraft');
    expect(email.html).toContain('Alice');
    expect(email.html).toContain('https://qrcraft.app/dashboard');
    expect(email.html).toContain('Accéder à mon tableau de bord');
    expect(email.text).toContain('Alice');
    expect(email.text).toContain('https://qrcraft.app/dashboard');
  });

  it('génère un fallback gracieux si le nom est manquant dans l\'email de bienvenue', () => {
    const email = renderWelcomeEmail({
      dashboardUrl: 'https://qrcraft.app/dashboard',
    });

    expect(email.html).toContain('Créateur');
  });

  it('génère le modèle de réinitialisation de mot de passe avec lien d\'expiration', () => {
    const email = renderPasswordResetEmail({
      userName: 'Bob',
      resetUrl: 'https://qrcraft.app/reset-password?token=secret123',
      expiresInMinutes: 45,
    });

    expect(email.subject).toContain('Réinitialisation');
    expect(email.html).toContain('Bob');
    expect(email.html).toContain('https://qrcraft.app/reset-password?token=secret123');
    expect(email.html).toContain('45 minutes');
    expect(email.text).toContain('secret123');
  });

  it('génère le modèle de vérification d\'adresse email', () => {
    const email = renderVerificationEmail({
      userName: 'Charlie',
      verificationUrl: 'https://qrcraft.app/verify?token=verify999',
    });

    expect(email.subject).toContain('Confirmez votre adresse email');
    expect(email.html).toContain('Charlie');
    expect(email.html).toContain('https://qrcraft.app/verify?token=verify999');
    expect(email.html).toContain('Vérifier mon adresse email');
  });

  it('génère le modèle de jalon de scans avec le chiffre formaté', () => {
    const email = renderScanMilestoneEmail({
      userName: 'Diane',
      qrName: 'Menu Restaurant Été',
      scanCount: 1500,
      dashboardUrl: 'https://qrcraft.app/dashboard',
    });

    expect(email.subject).toContain('Menu Restaurant Été');
    expect(email.subject).toContain('1500');
    expect(email.html).toContain('1\u202F500'); // formatage toLocaleString en français ou séparateur
    expect(email.html).toContain('Diane');
  });
});

describe('Resend Email Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('utilise le mode simulation / dev lorsque RESEND_API_KEY est vide', async () => {
    process.env.RESEND_API_KEY = '';

    const result = await sendEmail({
      to: 'creator@example.com',
      subject: 'Test Email',
      html: '<p>Test</p>',
      text: 'Test',
      idempotencyKey: 'test/123',
    });

    expect(result.success).toBe(true);
    expect(result.id).toMatch(/^mock_/);
  });

  it('envoie via le SDK Resend et gère le succès', async () => {
    // Mock the resend module
    process.env.RESEND_API_KEY = 're_test_valid_key';

    vi.doMock('resend', () => {
      return {
        Resend: class {
          emails = {
            send: vi.fn().mockResolvedValue({
              data: { id: 'msg_resend_98765' },
              error: null,
            }),
          };
        },
      };
    });

    const { sendEmail: mockedSendEmail } = await import('@/lib/email/resend');

    const result = await mockedSendEmail({
      to: 'delivered@resend.dev',
      subject: 'Test Resend',
      html: '<p>Contenu</p>',
      text: 'Contenu',
      idempotencyKey: 'welcome-email/user-456',
    });

    expect(result.success).toBe(true);
    expect(result.id).toBe('msg_resend_98765');
  });

  it('gère l\'erreur retournée par Resend sans lever d\'exception', async () => {
    process.env.RESEND_API_KEY = 're_test_valid_key';

    vi.doMock('resend', () => {
      return {
        Resend: class {
          emails = {
            send: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Domain unverified' },
            }),
          };
        },
      };
    });

    const { sendEmail: mockedSendEmail } = await import('@/lib/email/resend');

    const result = await mockedSendEmail({
      to: 'unverified@example.com',
      subject: 'Test Error',
      html: '<p>Contenu</p>',
      text: 'Contenu',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('Domain unverified');
  });

  it('les notifications typées s\'exécutent correctement sans crash', async () => {
    process.env.RESEND_API_KEY = '';

    const user = { id: 'usr_abc', email: 'test@user.com', name: 'Jean Dupont' };

    const resWelcome = await sendWelcomeNotification(user);
    expect(resWelcome.success).toBe(true);

    const resReset = await sendPasswordResetNotification(user, 'https://qrcraft.app/reset');
    expect(resReset.success).toBe(true);

    const resVerify = await sendVerificationNotification(user, 'https://qrcraft.app/verify');
    expect(resVerify.success).toBe(true);

    const resMilestone = await sendScanMilestoneNotification(
      user,
      { id: 'qr_123', name: 'Mon QR' },
      100
    );
    expect(resMilestone.success).toBe(true);
  });
});
