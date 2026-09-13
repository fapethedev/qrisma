import type {
  BackgroundSettings,
  DataModulesSettings,
  DataModulesStyle,
  ErrorCorrectionLevel,
  FinderPatternInnerSettings,
  FinderPatternInnerStyle,
  FinderPatternOuterSettings,
  FinderPatternOuterStyle,
  GradientSettings,
  GradientSettingsStop,
  ImageSettings,
  ReactQRCodeProps,
  ReactQRCodeRef,
} from '@lglab/react-qr-code';

export type {
  BackgroundSettings,
  DataModulesSettings,
  DataModulesStyle,
  ErrorCorrectionLevel,
  FinderPatternInnerSettings,
  FinderPatternInnerStyle,
  FinderPatternOuterSettings,
  FinderPatternOuterStyle,
  GradientSettings,
  GradientSettingsStop,
  ImageSettings,
  ReactQRCodeProps,
  ReactQRCodeRef,
};

/**
 * Types de contenus / payloads pris en charge pour l'encodage QR
 */
export type QRPayloadType =
  | 'url'
  | 'text'
  | 'vcard'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'sms'
  | 'crypto';

export interface VCardPayload {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phone?: string;
  cellPhone?: string;
  email?: string;
  url?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface WifiPayload {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface EmailPayload {
  to: string;
  subject?: string;
  body?: string;
}

export interface SmsPayload {
  phone: string;
  message?: string;
}

export interface CryptoPayload {
  currency: 'bitcoin' | 'ethereum' | 'solana';
  address: string;
  amount?: number;
}

export interface QRPayloadData {
  type: QRPayloadType;
  url: string;
  text: string;
  vcard: VCardPayload;
  wifi: WifiPayload;
  email: EmailPayload;
  phone: string;
  sms: SmsPayload;
  crypto: CryptoPayload;
}

/**
 * Configuration complète de style pour le QR Code
 */
export interface QRDesignConfig {
  size: number;
  level: ErrorCorrectionLevel;
  marginSize: number;
  minVersion: number;
  boostLevel: boolean;
  background: BackgroundSettings;
  gradient?: GradientSettings;
  dataModulesSettings: DataModulesSettings;
  finderPatternOuterSettings: FinderPatternOuterSettings;
  finderPatternInnerSettings: FinderPatternInnerSettings;
  imageSettings?: ImageSettings;
}

/**
 * Thèmes et presets visuels préconçus
 */
export interface QRVisualPreset {
  id: string;
  name: string;
  description: string;
  category: 'minimal' | 'modern' | 'cyberpunk' | 'luxury' | 'nature' | 'corporate';
  config: Partial<QRDesignConfig>;
}

/**
 * Options d'exportation
 */
export type QRExportFormat = 'svg' | 'png' | 'jpeg' | 'pdf';

export type QRExportResolution = 512 | 1024 | 2048 | 4096;

export interface QRExportOptions {
  filename: string;
  format: QRExportFormat;
  resolution: QRExportResolution;
  includeMargin: boolean;
  transparentBackground?: boolean;
}

/**
 * Métadonnées d'un QR code pour le stockage et le mode dynamique
 */
export interface QRCodeRecord {
  id: string;
  userId?: string;
  title: string;
  isDynamic: boolean;
  shortSlug?: string;
  destinationUrl?: string;
  payloadType: QRPayloadType;
  encodedValue: string;
  design: QRDesignConfig;
  createdAt: string;
  updatedAt: string;
  scanCount: number;
}
