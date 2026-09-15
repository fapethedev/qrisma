import { describe, it, expect } from 'vitest';
import { routing, locales, defaultLocale } from '@/i18n/routing';
import frMessages from '@/../messages/fr.json';
import enMessages from '@/../messages/en.json';

describe('Internationalization (next-intl)', () => {
  it('defines correct routing locales and default locale', () => {
    expect(locales).toContain('fr');
    expect(locales).toContain('en');
    expect(defaultLocale).toBe('fr');
    expect(routing.locales).toEqual(['fr', 'en']);
    expect(routing.defaultLocale).toBe('fr');
  });

  it('contains valid message dictionaries for fr and en', () => {
    expect(frMessages).toBeDefined();
    expect(enMessages).toBeDefined();
    expect(frMessages.common.appName).toBe('QRCraft');
    expect(enMessages.common.appName).toBe('QRCraft');
  });

  it('ensures all top-level sections exist in both fr and en', () => {
    const frKeys = Object.keys(frMessages).sort();
    const enKeys = Object.keys(enMessages).sort();

    expect(frKeys).toEqual(enKeys);
    expect(frKeys).toEqual(['auth', 'common', 'dashboard', 'landing', 'settings', 'studio']);
  });

  it('ensures all subkeys are identically mirrored between fr.json and en.json', () => {
    function getLeafPaths(obj: Record<string, any>, prefix = ''): string[] {
      let paths: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          paths = paths.concat(getLeafPaths(value, fullPath));
        } else {
          paths.push(fullPath);
        }
      }
      return paths.sort();
    }

    const frPaths = getLeafPaths(frMessages);
    const enPaths = getLeafPaths(enMessages);

    expect(frPaths).toEqual(enPaths);
    expect(frPaths.length).toBeGreaterThan(30);
  });
});
