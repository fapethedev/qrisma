export interface ParsedUserAgent {
  deviceType: 'Mobile' | 'Tablet' | 'Desktop' | 'Bot' | 'Other';
  os: string;
  browser: string;
}

export function parseUserAgent(ua: string | null | undefined): ParsedUserAgent {
  if (!ua) {
    return { deviceType: 'Other', os: 'Inconnu', browser: 'Inconnu' };
  }

  // 1. Détection Bot / Crawler
  if (/bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot/i.test(ua)) {
    return { deviceType: 'Bot', os: 'Bot', browser: 'Bot' };
  }

  // 2. Détection Système d'exploitation (OS)
  let os = 'Autre';
  if (/iPad|iPhone|iPod/.test(ua)) {
    os = 'iOS';
  } else if (/Android/i.test(ua)) {
    os = 'Android';
  } else if (/Windows/i.test(ua)) {
    os = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  } else if (/CrOS/i.test(ua)) {
    os = 'Chrome OS';
  }

  // 3. Détection Type d'appareil (Device)
  let deviceType: ParsedUserAgent['deviceType'] = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua) || (/android/i.test(ua) && !/mobi/i.test(ua))) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|kindle/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // 4. Détection Navigateur (Browser)
  let browser = 'Autre';
  if (/edg/i.test(ua)) {
    browser = 'Edge';
  } else if (/opr|opera/i.test(ua)) {
    browser = 'Opera';
  } else if (/chrome|crios/i.test(ua) && !/edg/i.test(ua) && !/opr/i.test(ua)) {
    browser = 'Chrome';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox';
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua) && !/crios/i.test(ua)) {
    browser = 'Safari';
  }

  return { deviceType, os, browser };
}
