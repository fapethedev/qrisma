'use client';

import { createAuthClient } from 'better-auth/client';
import { twoFactorClient, organizationClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/2fa';
      },
    }),
    organizationClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  twoFactor,
  organization,
} = authClient;
