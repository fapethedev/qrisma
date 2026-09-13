import { describe, it, expect } from 'vitest';
import { parseUserAgent } from '@/lib/utils/ua-parser';

describe('User Agent Parser', () => {
  it('detects mobile iPhone and Safari', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const parsed = parseUserAgent(ua);
    expect(parsed.deviceType).toBe('Mobile');
    expect(parsed.os).toBe('iOS');
    expect(parsed.browser).toBe('Safari');
  });

  it('detects Android phone and Chrome', () => {
    const ua = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const parsed = parseUserAgent(ua);
    expect(parsed.deviceType).toBe('Mobile');
    expect(parsed.os).toBe('Android');
    expect(parsed.browser).toBe('Chrome');
  });

  it('detects desktop macOS and Firefox', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0';
    const parsed = parseUserAgent(ua);
    expect(parsed.deviceType).toBe('Desktop');
    expect(parsed.os).toBe('macOS');
    expect(parsed.browser).toBe('Firefox');
  });

  it('detects bots / web crawlers', () => {
    const ua = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    const parsed = parseUserAgent(ua);
    expect(parsed.deviceType).toBe('Bot');
    expect(parsed.os).toBe('Bot');
    expect(parsed.browser).toBe('Bot');
  });

  it('handles empty or null user agents gracefully', () => {
    const parsed = parseUserAgent(null);
    expect(parsed.deviceType).toBe('Other');
    expect(parsed.os).toBe('Inconnu');
    expect(parsed.browser).toBe('Inconnu');
  });
});
