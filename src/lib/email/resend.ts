import { Resend } from 'resend';
import {
  renderWelcomeEmail,
  renderPasswordResetEmail,
  renderVerificationEmail,
  renderScanMilestoneEmail,
} from './templates';

let resendInstance: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('placeholder_')) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
  idempotencyKey?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Envoie un email transactionnel via le SDK Resend officiel.
 * Gère l'idempotence, le mode bac à sable / développement si la clé est absente,
 * et respecte la convention SDK Resend : gestion explicite de { data, error }.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = process.env.RESEND_FROM_EMAIL || 'QRCraft <onboarding@resend.dev>',
  idempotencyKey,
}: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();

  // Mode développement ou clé absente : simulation sans échec pour préserver l'UX
  if (!resend) {
    const mockId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.info(
      `[Email Mock / Dev] Envoi simulé à ${Array.isArray(to) ? to.join(', ') : to} | Sujet: "${subject}" | Id: ${mockId}`
    );
    return {
      success: true,
      id: mockId,
    };
  }

  try {
    const { data, error } = await resend.emails.send(
      {
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      },
      idempotencyKey ? { idempotencyKey } : undefined
    );

    if (error) {
      console.error('[Resend Error]', error.message);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erreur réseau inattendue lors de l\'envoi';
    console.error('[Resend Exception]', errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

/**
 * Email de bienvenue envoyé suite à la création de compte
 */
export async function sendWelcomeNotification(user: { id: string; email: string; name?: string | null }) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { subject, html, text } = renderWelcomeEmail({
    userName: user.name ?? undefined,
    dashboardUrl: `${appUrl}/dashboard`,
  });

  return sendEmail({
    to: user.email,
    subject,
    html,
    text,
    idempotencyKey: `welcome-email/${user.id}`,
  });
}

/**
 * Email de réinitialisation de mot de passe (intégré avec Better Auth)
 */
export async function sendPasswordResetNotification(
  user: { id: string; email: string; name?: string | null },
  resetUrl: string
) {
  const { subject, html, text } = renderPasswordResetEmail({
    userName: user.name ?? undefined,
    resetUrl,
    expiresInMinutes: 60,
  });

  return sendEmail({
    to: user.email,
    subject,
    html,
    text,
    idempotencyKey: `password-reset/${user.id}-${Date.now()}`,
  });
}

/**
 * Email de vérification d'adresse (intégré avec Better Auth)
 */
export async function sendVerificationNotification(
  user: { id: string; email: string; name?: string | null },
  verificationUrl: string
) {
  const { subject, html, text } = renderVerificationEmail({
    userName: user.name ?? undefined,
    verificationUrl,
  });

  return sendEmail({
    to: user.email,
    subject,
    html,
    text,
    idempotencyKey: `email-verification/${user.id}`,
  });
}

/**
 * Email d'alerte lors d'un jalon de scans atteint
 */
export async function sendScanMilestoneNotification(
  user: { id: string; email: string; name?: string | null },
  qrCode: { id: string; name: string },
  scanCount: number
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { subject, html, text } = renderScanMilestoneEmail({
    userName: user.name ?? undefined,
    qrName: qrCode.name,
    scanCount,
    dashboardUrl: `${appUrl}/dashboard`,
  });

  return sendEmail({
    to: user.email,
    subject,
    html,
    text,
    idempotencyKey: `scan-milestone/${qrCode.id}-${scanCount}`,
  });
}
