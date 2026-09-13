import { describe, expect, it } from 'vitest';
import {
  buildCryptoString,
  buildEmailString,
  buildQRPayload,
  buildSmsString,
  buildVCardString,
  buildWifiString,
} from './payloads';

describe('QR Payload Generator (TDD)', () => {
  it('should format URL with https scheme if omitted', () => {
    expect(buildQRPayload('url', { url: 'mywebsite.com' })).toBe('https://mywebsite.com');
    expect(buildQRPayload('url', { url: 'http://custom.org' })).toBe('http://custom.org');
    expect(buildQRPayload('url', { url: 'https://secure.dev' })).toBe('https://secure.dev');
  });

  it('should format plain text', () => {
    expect(buildQRPayload('text', { text: 'Hello World' })).toBe('Hello World');
  });

  it('should generate valid vCard 3.0 specification string', () => {
    const vcard = buildVCardString({
      firstName: 'John',
      lastName: 'Doe',
      organization: 'TechCorp',
      phone: '+33123456789',
      email: 'john@techcorp.com',
      url: 'techcorp.com',
    });

    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:John Doe');
    expect(vcard).toContain('N:Doe;John;;;');
    expect(vcard).toContain('ORG:TechCorp');
    expect(vcard).toContain('TEL;TYPE=WORK:+33123456789');
    expect(vcard).toContain('EMAIL:john@techcorp.com');
    expect(vcard).toContain('URL:https://techcorp.com');
    expect(vcard).toContain('END:VCARD');
  });

  it('should generate valid Wi-Fi authentication string with character escaping', () => {
    const wifi = buildWifiString({
      ssid: 'My;Network:Name',
      password: 'Pass;word,123',
      encryption: 'WPA',
      hidden: false,
    });

    expect(wifi).toBe('WIFI:T:WPA;S:My\\;Network\\:Name;P:Pass\\;word\\,123;H:false;;');
  });

  it('should generate formatted mailto URI with query params', () => {
    const email = buildEmailString({
      to: 'sales@company.com',
      subject: 'Inquiry',
      body: 'Hello Team',
    });

    expect(email).toBe('mailto:sales@company.com?subject=Inquiry&body=Hello+Team');
  });

  it('should format SMS URI properly', () => {
    const sms = buildSmsString({
      phone: '+33 6 12 34 56 78',
      message: 'Hello QR',
    });

    expect(sms).toBe('smsto:+33612345678:Hello QR');
  });

  it('should generate crypto payment URI', () => {
    const btc = buildCryptoString({
      currency: 'bitcoin',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      amount: 0.5,
    });

    expect(btc).toBe('bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.5');
  });
});
