import type {
  CryptoPayload,
  EmailPayload,
  QRPayloadData,
  QRPayloadType,
  SmsPayload,
  VCardPayload,
  WifiPayload,
} from './types';

/**
 * Génère la chaîne de caractères brute encodée dans le QR Code selon le type sélectionné.
 */
export function buildQRPayload(type: QRPayloadType, data: Partial<QRPayloadData>): string {
  switch (type) {
    case 'url': {
      const url = data.url?.trim() || 'https://qrcraft.dev';
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    }

    case 'text':
      return data.text?.trim() || 'Hello from QRCraft!';

    case 'vcard':
      return buildVCardString(data.vcard);

    case 'wifi':
      return buildWifiString(data.wifi);

    case 'email':
      return buildEmailString(data.email);

    case 'phone':
      return `tel:${(data.phone || '').trim().replace(/\s+/g, '')}`;

    case 'sms':
      return buildSmsString(data.sms);

    case 'crypto':
      return buildCryptoString(data.crypto);

    default:
      return 'https://qrcraft.dev';
  }
}

/**
 * Formate une chaîne vCard 3.0 standardisée et scannable par iOS et Android.
 */
export function buildVCardString(vcard?: Partial<VCardPayload>): string {
  if (!vcard) return 'BEGIN:VCARD\nVERSION:3.0\nFN:QRCraft User\nEND:VCARD';

  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  const firstName = vcard.firstName?.trim() || '';
  const lastName = vcard.lastName?.trim() || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Contact';

  lines.push(`N:${lastName};${firstName};;;`);
  lines.push(`FN:${fullName}`);

  if (vcard.organization?.trim()) {
    lines.push(`ORG:${vcard.organization.trim()}`);
  }
  if (vcard.title?.trim()) {
    lines.push(`TITLE:${vcard.title.trim()}`);
  }
  if (vcard.cellPhone?.trim()) {
    lines.push(`TEL;TYPE=CELL:${vcard.cellPhone.trim()}`);
  }
  if (vcard.phone?.trim()) {
    lines.push(`TEL;TYPE=WORK:${vcard.phone.trim()}`);
  }
  if (vcard.email?.trim()) {
    lines.push(`EMAIL:${vcard.email.trim()}`);
  }
  if (vcard.url?.trim()) {
    const url = vcard.url.trim();
    lines.push(`URL:${/^https?:\/\//i.test(url) ? url : `https://${url}`}`);
  }

  if (vcard.address) {
    const { street = '', city = '', postalCode = '', country = '' } = vcard.address;
    if (street || city || postalCode || country) {
      lines.push(`ADR;TYPE=HOME:;;${street};${city};;${postalCode};${country}`);
    }
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Formate la chaîne de connexion Wi-Fi standard (WIFI:T:WPA;S:ssid;P:password;H:false;;).
 */
export function buildWifiString(wifi?: Partial<WifiPayload>): string {
  if (!wifi || !wifi.ssid) {
    return 'WIFI:T:WPA;S:QRCraft_Wifi;P:password123;;';
  }

  const encryption = wifi.encryption || 'WPA';
  const ssid = escapeWifiSpecialChars(wifi.ssid);
  const password = wifi.password ? escapeWifiSpecialChars(wifi.password) : '';
  const hidden = wifi.hidden ? 'true' : 'false';

  return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
}

function escapeWifiSpecialChars(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

/**
 * Formate un URI mailto avec sujet et corps encodés.
 */
export function buildEmailString(email?: Partial<EmailPayload>): string {
  if (!email || !email.to) return 'mailto:contact@qrcraft.dev';

  const params = new URLSearchParams();
  if (email.subject?.trim()) params.append('subject', email.subject.trim());
  if (email.body?.trim()) params.append('body', email.body.trim());

  const queryString = params.toString();
  return `mailto:${email.to.trim()}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Formate un protocole SMS.
 */
export function buildSmsString(sms?: Partial<SmsPayload>): string {
  if (!sms || !sms.phone) return 'smsto:';
  const cleanPhone = sms.phone.replace(/\s+/g, '');
  const message = sms.message?.trim() || '';
  return `smsto:${cleanPhone}:${message}`;
}

/**
 * Formate une URI de transaction de cryptomonnaie (BIP-21 pour BTC, EIP-681 pour ETH, Solana Pay).
 */
export function buildCryptoString(crypto?: Partial<CryptoPayload>): string {
  if (!crypto || !crypto.address) return 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';

  const currency = crypto.currency || 'bitcoin';
  const address = crypto.address.trim();
  const amountParam = crypto.amount ? `?amount=${crypto.amount}` : '';

  return `${currency}:${address}${amountParam}`;
}
