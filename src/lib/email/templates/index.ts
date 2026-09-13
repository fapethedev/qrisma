/**
 * Modèles d'emails transactionnels QRCraft
 * Templates HTML responsives, modernes et compatibles tous clients de messagerie.
 */

const baseEmailLayout = (content: string, preheader: string = ''): string => `
<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>QRCraft</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .fluid { max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; color: #f4f4f5;">
  <!-- Preheader text hidden from body -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
    ${preheader}
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #09090b;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!-- Email Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 560px; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #1f1f23 0%, #18181b 100%); border-bottom: 1px solid #27272a;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; padding: 8px 16px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      QRCraft
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 32px 32px; background-color: #121214; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #71717a;">
                © ${new Date().getFullYear()} QRCraft. La plateforme de QR codes nouvelle génération.
              </p>
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                Cet email a été envoyé automatiquement. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export interface WelcomeEmailProps {
  userName?: string;
  dashboardUrl: string;
}

export function renderWelcomeEmail({ userName, dashboardUrl }: WelcomeEmailProps): {
  subject: string;
  html: string;
  text: string;
} {
  const name = userName || 'Créateur';
  const subject = 'Bienvenue sur QRCraft 🚀';
  const preheader = 'Votre compte QRCraft est prêt. Commencez à générer des QR codes uniques dès maintenant.';

  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
      Bienvenue parmi nous, ${name} !
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #a1a1aa;">
      Nous sommes ravis de vous compter parmi nos créateurs. Avec QRCraft, concevez des QR codes esthétiques, personnalisez chaque détail géométrique et suivez les statistiques de scan en direct.
    </p>
    
    <div style="background-color: #27272a; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #f4f4f5;">
        Ce que vous pouvez faire dès aujourd'hui :
      </p>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 22px; color: #d4d4d8;">
        <li>Personnaliser les formes de modules (dots, pixels, fluid)</li>
        <li>Projeter vos QR codes dans des mockups 3D interactifs</li>
        <li>Générer des liens dynamiques modifiables sans réimprimer</li>
        <li>Exporter en SVG haute précision et PNG 300 DPI pour l'impression</li>
      </ul>
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0 16px 0;">
      <tr>
        <td align="center">
          <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 28px; background: linear-space, #4f46e5; background-color: #6366f1; border-radius: 10px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
            Accéder à mon tableau de bord →
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `Bienvenue sur QRCraft, ${name} !\n\nVotre compte est prêt. Accédez à votre tableau de bord pour concevoir vos premiers QR codes personnalisés : ${dashboardUrl}`;

  return {
    subject,
    html: baseEmailLayout(content, preheader),
    text,
  };
}

export interface PasswordResetEmailProps {
  userName?: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

export function renderPasswordResetEmail({
  userName,
  resetUrl,
  expiresInMinutes = 60,
}: PasswordResetEmailProps): {
  subject: string;
  html: string;
  text: string;
} {
  const name = userName || 'Bonjour';
  const subject = 'Réinitialisation de votre mot de passe QRCraft';
  const preheader = 'Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe.';

  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
      Demande de réinitialisation
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #a1a1aa;">
      ${name}, nous avons reçu une demande de réinitialisation du mot de passe associé à votre compte QRCraft.
    </p>

    <div style="background-color: #27272a; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 14px 16px; margin: 20px 0;">
      <p style="margin: 0; font-size: 13px; line-height: 20px; color: #fbbf24;">
        Ce lien est temporaire et expirera dans <strong>${expiresInMinutes} minutes</strong>.
      </p>
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0 20px 0;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; background-color: #e11d48; border-radius: 10px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);">
            Réinitialiser mon mot de passe
          </a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; font-size: 13px; line-height: 20px; color: #71717a;">
      Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :<br/>
      <a href="${resetUrl}" style="color: #6366f1; word-break: break-all;">${resetUrl}</a>
    </p>

    <p style="margin: 20px 0 0 0; font-size: 12px; line-height: 18px; color: #52525b;">
      Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email. Votre mot de passe actuel reste inchangé.
    </p>
  `;

  const text = `Bonjour,\n\nVous avez demandé la réinitialisation de votre mot de passe QRCraft. Cliquez sur le lien suivant pour choisir un nouveau mot de passe (valable ${expiresInMinutes} min) : ${resetUrl}\n\nSi vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.`;

  return {
    subject,
    html: baseEmailLayout(content, preheader),
    text,
  };
}

export interface VerificationEmailProps {
  userName?: string;
  verificationUrl: string;
}

export function renderVerificationEmail({
  userName,
  verificationUrl,
}: VerificationEmailProps): {
  subject: string;
  html: string;
  text: string;
} {
  const name = userName || 'Bonjour';
  const subject = 'Confirmez votre adresse email - QRCraft';
  const preheader = 'Veuillez vérifier votre adresse email pour finaliser votre inscription sur QRCraft.';

  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
      Confirmez votre adresse email
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #a1a1aa;">
      ${name}, merci d'avoir rejoint QRCraft ! Pour sécuriser votre compte et activer toutes vos fonctionnalités de génération et d'analytics, veuillez valider votre adresse email.
    </p>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0 20px 0;">
      <tr>
        <td align="center">
          <a href="${verificationUrl}" style="display: inline-block; padding: 14px 28px; background-color: #10b981; border-radius: 10px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);">
            Vérifier mon adresse email
          </a>
        </td>
      </tr>
    </table>

    <p style="margin: 20px 0 0 0; font-size: 13px; line-height: 20px; color: #71717a;">
      Lien direct : <a href="${verificationUrl}" style="color: #6366f1; word-break: break-all;">${verificationUrl}</a>
    </p>
  `;

  const text = `Bonjour,\n\nMerci d'avoir rejoint QRCraft ! Veuillez cliquer sur le lien suivant pour confirmer votre adresse email : ${verificationUrl}`;

  return {
    subject,
    html: baseEmailLayout(content, preheader),
    text,
  };
}

export interface ScanMilestoneEmailProps {
  userName?: string;
  qrName: string;
  scanCount: number;
  dashboardUrl: string;
}

export function renderScanMilestoneEmail({
  userName,
  qrName,
  scanCount,
  dashboardUrl,
}: ScanMilestoneEmailProps): {
  subject: string;
  html: string;
  text: string;
} {
  const name = userName || 'Créateur';
  const subject = `🎉 Votre QR code "${qrName}" a dépassé ${scanCount} scans !`;
  const preheader = `Nouveau jalon de performance atteint par votre QR code ${qrName}.`;

  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
      Félicitations ${name} ! 🎉
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #a1a1aa;">
      Votre QR code dynamique <strong>"${qrName}"</strong> vient de franchir un nouveau cap symbolique.
    </p>

    <div style="text-align: center; background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px; padding: 28px; margin: 24px 0;">
      <div style="font-size: 44px; font-weight: 800; color: #a855f7; line-height: 1;">
        ${scanCount.toLocaleString()}
      </div>
      <div style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #e4e4e7; margin-top: 8px;">
        Scans Enregistrés
      </div>
    </div>

    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #a1a1aa;">
      Consultez les détails géographiques, les systèmes d'exploitation utilisés et les pics de trafic depuis votre espace analytique :
    </p>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0 20px 0;">
      <tr>
        <td align="center">
          <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 28px; background-color: #8b5cf6; border-radius: 10px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35);">
            Voir les analyses en direct →
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `Félicitations ${name} !\n\nVotre QR code "${qrName}" a atteint ${scanCount} scans !\nConsultez les statistiques détaillées sur votre tableau de bord : ${dashboardUrl}`;

  return {
    subject,
    html: baseEmailLayout(content, preheader),
    text,
  };
}
