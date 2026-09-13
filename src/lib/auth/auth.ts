import { betterAuth } from 'better-auth';
import { twoFactor, organization } from 'better-auth/plugins';
import { qrPlugin } from './plugins/qr-plugin';
import { Pool } from 'pg';
import { sendPasswordResetNotification, sendVerificationNotification } from '../email/resend';

// Utilise PostgreSQL si DATABASE_URL est fourni, sinon mémoire pour le build/dev
const getDatabase = () => {
  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return undefined;
};

export const auth = betterAuth({
  appName: 'QRCraft',
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  secret:
    process.env.BETTER_AUTH_SECRET ||
    'qrcraft-super-secure-production-secret-key-min-32-chars-long',

  database: getDatabase(),

  // Authentification Email & Mot de Passe conforme aux best practices
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetNotification(user, url);
    },
  },

  // Vérification d'email
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationNotification(user, url);
    },
  },

  // Extension du modèle utilisateur pour le modèle SaaS Freemium
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'free',
        required: false,
      },
      plan: {
        type: 'string',
        defaultValue: 'free',
        required: false,
      },
      qrCodeCount: {
        type: 'number',
        defaultValue: 0,
        required: false,
      },
    },
  },

  // Plugins de sécurité, 2FA TOTP & Organisations multi-tenant
  plugins: [
    twoFactor({
      issuer: 'QRCraft',
      otpOptions: {
        period: 30,
        digits: 6,
      },
    }),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5,
      membershipLimit: 100,
    }),
    qrPlugin(),
  ],

  // Sécurisation avancée des sessions et cookies
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // Rafraîchissement chaque 24h
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 100, // 100 requêtes max
  },
});
