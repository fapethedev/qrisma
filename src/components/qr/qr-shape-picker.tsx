'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { DataModulesSettings, DataModulesStyle } from '@/lib/qr/types';

interface QRShapePickerProps {
  settings: DataModulesSettings;
  onChange: (settings: Partial<DataModulesSettings>) => void;
}

interface ShapeConfig {
  id: DataModulesStyle;
  key: string;
  iconPath: string;
}

const SHAPE_CONFIGS: ShapeConfig[] = [
  {
    id: 'square',
    key: 'square',
    iconPath: 'M3 3h18v18H3z',
  },
  {
    id: 'rounded',
    key: 'rounded',
    iconPath: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z',
  },
  {
    id: 'circle',
    key: 'circle',
    iconPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z',
  },
  {
    id: 'pinched-square',
    key: 'pinchedSquare',
    iconPath: 'M4 4c4 0 8 4 8 8 0-4 4-8 8-8v16c-4 0-8-4-8-8 0 4-4 8-8 8z',
  },
  {
    id: 'leaf',
    key: 'leaf',
    iconPath: 'M2 22C2 10 10 2 22 2c0 12-8 20-20 20z',
  },
  {
    id: 'circuit-board',
    key: 'circuitBoard',
    iconPath: 'M4 4h6v6H4zm10 0h6v6h-6zm-10 10h6v6H4zm10 0h6v6h-6z',
  },
  {
    id: 'vertical-line',
    key: 'verticalLine',
    iconPath: 'M6 2h3v20H6zm9 0h3v20h-3z',
  },
  {
    id: 'horizontal-line',
    key: 'horizontalLine',
    iconPath: 'M2 6h20v3H2zm0 9h20v3H2z',
  },
  {
    id: 'diamond',
    key: 'diamond',
    iconPath: 'M12 2l10 10-10 10L2 12z',
  },
  {
    id: 'star',
    key: 'star',
    iconPath: 'M12 2l2.8 6.6 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.2l7.2-.6z',
  },
  {
    id: 'heart',
    key: 'heart',
    iconPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  },
  {
    id: 'hashtag',
    key: 'hashtag',
    iconPath: 'M10 3v4H6v3h4v4H6v3h4v4h3v-4h4v4h3v-4h4v-3h-4v-4h4V7h-4V3h-3v4h-4V3h-3zm3 7h4v4h-4v-4z',
  },
];

export function QRShapePicker({ settings, onChange }: QRShapePickerProps) {
  const t = useTranslations('studio.shapes');
  const currentStyle = settings.style || 'square';
  const currentSize = settings.size ?? 1;
  const currentLineWidth = settings.lineWidth ?? 1;

  const showLineWidth = ['vertical-line', 'horizontal-line', 'rounded', 'circuit-board'].includes(currentStyle);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('title')}
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {SHAPE_CONFIGS.map((shape) => {
            const isSelected = currentStyle === shape.id;
            const label = t(`options.${shape.key}` as any);
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onChange({ style: shape.id })}
                aria-label={label}
                aria-pressed={isSelected}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20 shadow-xs'
                    : 'border-border/60 hover:border-border hover:bg-accent/40 text-foreground'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                )}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 mb-1.5 fill-current transition-transform group-hover:scale-110"
                >
                  <path d={shape.iconPath} />
                </svg>
                <span className="truncate w-full text-center">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ajustement de la taille du module */}
      <div className="space-y-2 pt-2 border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <Label htmlFor="module-size" className="text-muted-foreground">{t('size')}</Label>
          <span className="font-mono font-medium">{Math.round(currentSize * 100)}%</span>
        </div>
        <Slider
          id="module-size"
          min={0.75}
          max={1}
          step={0.05}
          value={[currentSize]}
          onValueChange={([val]) => onChange({ size: val })}
        />
      </div>

      {/* Épaisseur de trait si pertinent */}
      {showLineWidth && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <Label htmlFor="module-line-width" className="text-muted-foreground">{t('lineWidth')}</Label>
            <span className="font-mono font-medium">{Math.round(currentLineWidth * 100)}%</span>
          </div>
          <Slider
            id="module-line-width"
            min={0.25}
            max={1}
            step={0.05}
            value={[currentLineWidth]}
            onValueChange={([val]) => onChange({ lineWidth: val })}
          />
        </div>
      )}
    </div>
  );
}
