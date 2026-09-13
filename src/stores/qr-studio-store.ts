import { create } from 'zustand';
import { buildQRPayload } from '@/lib/qr/payloads';
import { QR_VISUAL_PRESETS } from '@/lib/qr/presets';
import type {
  QRDesignConfig,
  QRPayloadData,
  QRPayloadType,
} from '@/lib/qr/types';

export const DEFAULT_DESIGN_CONFIG: QRDesignConfig = {
  size: 280,
  level: 'M',
  marginSize: 1,
  minVersion: 1,
  boostLevel: true,
  background: '#FFFFFF',
  gradient: {
    type: 'linear',
    rotation: 45,
    stops: [
      { offset: '0%', color: '#4F46E5' },
      { offset: '100%', color: '#7C3AED' },
    ],
  },
  dataModulesSettings: {
    style: 'rounded',
    size: 1,
    lineWidth: 1,
  },
  finderPatternOuterSettings: {
    style: 'rounded',
  },
  finderPatternInnerSettings: {
    style: 'rounded',
  },
};

export const DEFAULT_PAYLOAD_DATA: QRPayloadData = {
  type: 'url',
  url: 'https://qrcraft.dev',
  text: 'Bienvenue sur QRCraft, le générateur de QR codes nouvelle génération !',
  vcard: {
    firstName: 'Alexandre',
    lastName: 'Durand',
    organization: 'QRCraft Studio',
    title: 'Lead Designer',
    phone: '+33 1 23 45 67 89',
    cellPhone: '+33 6 12 34 56 78',
    email: 'alexandre@qrcraft.dev',
    url: 'https://qrcraft.dev',
  },
  wifi: {
    ssid: 'Studio_Guest',
    password: 'SuperSecretPassword',
    encryption: 'WPA',
    hidden: false,
  },
  email: {
    to: 'hello@qrcraft.dev',
    subject: 'Demande d’information',
    body: 'Bonjour, je souhaiterais en savoir plus sur votre solution.',
  },
  phone: '+33 1 23 45 67 89',
  sms: {
    phone: '+33 6 12 34 56 78',
    message: 'Salut ! Je t’envoie ce message depuis un QR code QRCraft.',
  },
  crypto: {
    currency: 'bitcoin',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: 0.05,
  },
};

interface QRStudioState {
  // Payload & Source
  payloadType: QRPayloadType;
  payloadData: QRPayloadData;
  encodedValue: string;

  // Dynamic QR
  isDynamic: boolean;
  shortSlug: string;

  // Design Settings
  design: QRDesignConfig;

  // Active preset
  activePresetId: string | null;

  // Actions
  setPayloadType: (type: QRPayloadType) => void;
  updatePayloadData: <K extends keyof QRPayloadData>(key: K, data: QRPayloadData[K]) => void;
  toggleDynamic: (isDynamic: boolean) => void;
  setShortSlug: (slug: string) => void;
  updateDesign: (partial: Partial<QRDesignConfig>) => void;
  updateDataModules: (settings: Partial<QRDesignConfig['dataModulesSettings']>) => void;
  updateFinderOuter: (settings: Partial<QRDesignConfig['finderPatternOuterSettings']>) => void;
  updateFinderInner: (settings: Partial<QRDesignConfig['finderPatternInnerSettings']>) => void;
  setLogo: (src: string, width?: number, height?: number, excavate?: boolean) => void;
  removeLogo: () => void;
  applyPreset: (presetId: string) => void;
  resetStudio: () => void;
}

export const useQRStudioStore = create<QRStudioState>((set, get) => ({
  payloadType: 'url',
  payloadData: DEFAULT_PAYLOAD_DATA,
  encodedValue: buildQRPayload('url', DEFAULT_PAYLOAD_DATA),

  isDynamic: false,
  shortSlug: 'demo-qr',

  design: DEFAULT_DESIGN_CONFIG,
  activePresetId: 'modern-indigo',

  setPayloadType: (type: QRPayloadType) => {
    const { payloadData, isDynamic, shortSlug } = get();
    const updatedData = { ...payloadData, type };
    const value = isDynamic
      ? `https://qrcraft.dev/s/${shortSlug}`
      : buildQRPayload(type, updatedData);

    set({
      payloadType: type,
      payloadData: updatedData,
      encodedValue: value,
    });
  },

  updatePayloadData: (key, data) => {
    const { payloadType, payloadData, isDynamic, shortSlug } = get();
    const updated = { ...payloadData, [key]: data };
    const value = isDynamic
      ? `https://qrcraft.dev/s/${shortSlug}`
      : buildQRPayload(payloadType, updated);

    set({
      payloadData: updated,
      encodedValue: value,
    });
  },

  toggleDynamic: (isDynamic: boolean) => {
    const { payloadType, payloadData, shortSlug } = get();
    const value = isDynamic
      ? `https://qrcraft.dev/s/${shortSlug}`
      : buildQRPayload(payloadType, payloadData);

    set({
      isDynamic,
      encodedValue: value,
    });
  },

  setShortSlug: (shortSlug: string) => {
    const { isDynamic } = get();
    set({
      shortSlug,
      ...(isDynamic ? { encodedValue: `https://qrcraft.dev/s/${shortSlug}` } : {}),
    });
  },

  updateDesign: (partial: Partial<QRDesignConfig>) => {
    set((state) => ({
      design: { ...state.design, ...partial },
      activePresetId: null,
    }));
  },

  updateDataModules: (settings) => {
    set((state) => ({
      design: {
        ...state.design,
        dataModulesSettings: {
          ...state.design.dataModulesSettings,
          ...settings,
        },
      },
      activePresetId: null,
    }));
  },

  updateFinderOuter: (settings) => {
    set((state) => ({
      design: {
        ...state.design,
        finderPatternOuterSettings: {
          ...state.design.finderPatternOuterSettings,
          ...settings,
        },
      },
      activePresetId: null,
    }));
  },

  updateFinderInner: (settings) => {
    set((state) => ({
      design: {
        ...state.design,
        finderPatternInnerSettings: {
          ...state.design.finderPatternInnerSettings,
          ...settings,
        },
      },
      activePresetId: null,
    }));
  },

  setLogo: (src: string, width = 48, height = 48, excavate = true) => {
    set((state) => ({
      design: {
        ...state.design,
        // Avec un logo, on s'assure d'avoir un niveau de correction d'erreur suffisant
        level: state.design.level === 'L' ? 'Q' : state.design.level,
        imageSettings: {
          src,
          width,
          height,
          excavate,
        },
      },
    }));
  },

  removeLogo: () => {
    set((state) => {
      const { imageSettings: _, ...rest } = state.design;
      return { design: rest as QRDesignConfig };
    });
  },

  applyPreset: (presetId: string) => {
    const preset = QR_VISUAL_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    set((state) => ({
      design: {
        ...state.design,
        ...preset.config,
        dataModulesSettings: {
          ...state.design.dataModulesSettings,
          ...(preset.config.dataModulesSettings || {}),
        },
        finderPatternOuterSettings: {
          ...state.design.finderPatternOuterSettings,
          ...(preset.config.finderPatternOuterSettings || {}),
        },
        finderPatternInnerSettings: {
          ...state.design.finderPatternInnerSettings,
          ...(preset.config.finderPatternInnerSettings || {}),
        },
      },
      activePresetId: presetId,
    }));
  },

  resetStudio: () => {
    set({
      payloadType: 'url',
      payloadData: DEFAULT_PAYLOAD_DATA,
      encodedValue: buildQRPayload('url', DEFAULT_PAYLOAD_DATA),
      isDynamic: false,
      shortSlug: 'demo-qr',
      design: DEFAULT_DESIGN_CONFIG,
      activePresetId: 'modern-indigo',
    });
  },
}));
