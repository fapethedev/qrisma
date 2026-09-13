import { describe, expect, it } from 'vitest';
import { auth } from '@/lib/auth/auth';
import { authClient } from '@/lib/auth/auth-client';

describe('Better Auth Configuration & Security (Unit Tests)', () => {
  it('should initialize auth with correct app name and session policy', () => {
    expect(auth).toBeDefined();
    expect(auth.options.appName).toBe('QRCraft');
    expect(auth.options.session?.expiresIn).toBe(60 * 60 * 24 * 7); // 7 days
  });

  it('should enable email and password with strict minimum length', () => {
    expect(auth.options.emailAndPassword?.enabled).toBe(true);
    expect(auth.options.emailAndPassword?.minPasswordLength).toBe(8);
  });

  it('should configure rate limiting for brute-force protection', () => {
    expect(auth.options.rateLimit?.enabled).toBe(true);
    expect(auth.options.rateLimit?.window).toBe(60);
    expect(auth.options.rateLimit?.max).toBe(100);
  });

  it('should include twoFactor plugin in server configuration', () => {
    const plugins = auth.options.plugins;
    expect(plugins).toBeDefined();
    expect(plugins?.some((p) => p.id === 'two-factor')).toBe(true);
  });

  it('should expose client auth methods including twoFactorClient', () => {
    expect(authClient).toBeDefined();
    expect(typeof authClient.signIn.email).toBe('function');
    expect(typeof authClient.signUp.email).toBe('function');
    expect(typeof authClient.signOut).toBe('function');
    expect(typeof authClient.twoFactor.verifyTotp).toBe('function');
    expect(typeof authClient.twoFactor.enable).toBe('function');
  });
});
