import type { QRVisualPreset } from './types';

export const QR_VISUAL_PRESETS: QRVisualPreset[] = [
  {
    id: 'modern-indigo',
    name: 'Modern SaaS Indigo',
    description: 'Design épuré et professionnel avec dégradé indigo et modules adoucis.',
    category: 'modern',
    config: {
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
      },
      finderPatternOuterSettings: {
        style: 'rounded',
      },
      finderPatternInnerSettings: {
        style: 'rounded',
      },
    },
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Atmosphère futuriste avec pistes de circuit imprimé et yeux microchip.',
    category: 'cyberpunk',
    config: {
      background: '#090D16',
      gradient: {
        type: 'linear',
        rotation: 135,
        stops: [
          { offset: '0%', color: '#06B6D4' },
          { offset: '50%', color: '#3B82F6' },
          { offset: '100%', color: '#EC4899' },
        ],
      },
      dataModulesSettings: {
        style: 'circuit-board',
        lineWidth: 0.5,
      },
      finderPatternOuterSettings: {
        style: 'pinched-square',
      },
      finderPatternInnerSettings: {
        style: 'microchip',
      },
    },
  },
  {
    id: 'minimal-mono',
    name: 'Minimalist Monochrome',
    description: 'Sobriété absolue, lisibilité maximale pour l’impression haut de gamme.',
    category: 'minimal',
    config: {
      background: '#FFFFFF',
      dataModulesSettings: {
        color: '#111827',
        style: 'circle',
        size: 0.9,
      },
      finderPatternOuterSettings: {
        color: '#111827',
        style: 'circle',
      },
      finderPatternInnerSettings: {
        color: '#111827',
        style: 'circle',
      },
    },
  },
  {
    id: 'elegant-gold',
    name: 'Obsidian & Gold',
    description: 'Contraste luxueux or étincelant sur fond sombre profond.',
    category: 'luxury',
    config: {
      background: '#121214',
      gradient: {
        type: 'linear',
        rotation: 90,
        stops: [
          { offset: '0%', color: '#F59E0B' },
          { offset: '100%', color: '#D97706' },
        ],
      },
      dataModulesSettings: {
        style: 'diamond',
        size: 0.95,
      },
      finderPatternOuterSettings: {
        style: 'inpoint',
      },
      finderPatternInnerSettings: {
        style: 'diamond',
      },
    },
  },
  {
    id: 'emerald-leaf',
    name: 'Emerald Botanic',
    description: 'Thématique végétale et bio avec formes de feuilles organiques.',
    category: 'nature',
    config: {
      background: '#F0FDF4',
      gradient: {
        type: 'linear',
        rotation: 60,
        stops: [
          { offset: '0%', color: '#059669' },
          { offset: '100%', color: '#10B981' },
        ],
      },
      dataModulesSettings: {
        style: 'leaf',
        size: 1,
      },
      finderPatternOuterSettings: {
        style: 'leaf',
      },
      finderPatternInnerSettings: {
        style: 'leaf',
      },
    },
  },
  {
    id: 'crimson-heart',
    name: 'Crimson Romance',
    description: 'Motifs cœurs chaleureux et passionnés pour invitations et événements.',
    category: 'modern',
    config: {
      background: '#FFF1F2',
      gradient: {
        type: 'linear',
        rotation: 45,
        stops: [
          { offset: '0%', color: '#E11D48' },
          { offset: '100%', color: '#BE123C' },
        ],
      },
      dataModulesSettings: {
        style: 'heart',
        size: 1,
      },
      finderPatternOuterSettings: {
        style: 'rounded-lg',
      },
      finderPatternInnerSettings: {
        style: 'heart',
      },
    },
  },
];
