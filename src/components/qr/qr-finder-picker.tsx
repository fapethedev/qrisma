'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import type {
  FinderPatternInnerSettings,
  FinderPatternInnerStyle,
  FinderPatternOuterSettings,
  FinderPatternOuterStyle,
} from '@/lib/qr/types';

interface QRFinderPickerProps {
  outerSettings: FinderPatternOuterSettings;
  innerSettings: FinderPatternInnerSettings;
  onOuterChange: (settings: Partial<FinderPatternOuterSettings>) => void;
  onInnerChange: (settings: Partial<FinderPatternInnerSettings>) => void;
}

interface EyeStyleConfig<T> {
  id: T;
  key: string;
}

const OUTER_CONFIGS: EyeStyleConfig<FinderPatternOuterStyle>[] = [
  { id: 'square', key: 'square' },
  { id: 'rounded', key: 'rounded' },
  { id: 'rounded-lg', key: 'roundedLg' },
  { id: 'circle', key: 'circle' },
  { id: 'pinched-square', key: 'pinchedSquare' },
  { id: 'inpoint', key: 'inpoint' },
  { id: 'outpoint', key: 'outpoint' },
  { id: 'leaf', key: 'leaf' },
];

const INNER_CONFIGS: EyeStyleConfig<FinderPatternInnerStyle>[] = [
  { id: 'square', key: 'square' },
  { id: 'rounded', key: 'rounded' },
  { id: 'circle', key: 'circle' },
  { id: 'pinched-square', key: 'pinchedSquare' },
  { id: 'diamond', key: 'diamond' },
  { id: 'leaf', key: 'leaf' },
  { id: 'microchip', key: 'microchip' },
  { id: 'star', key: 'star' },
  { id: 'heart', key: 'heart' },
  { id: 'hashtag', key: 'hashtag' },
];

export function QRFinderPicker({
  outerSettings,
  innerSettings,
  onOuterChange,
  onInnerChange,
}: QRFinderPickerProps) {
  const t = useTranslations('studio.finder');
  const currentOuter = outerSettings.style || 'rounded';
  const currentInner = innerSettings.style || 'rounded';

  return (
    <div className="space-y-6">
      {/* Bordure Extérieure des Yeux */}
      <div className="space-y-2.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('outerTitle')}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {OUTER_CONFIGS.map((item) => {
            const isSelected = currentOuter === item.id;
            const label = t(`outerOptions.${item.key}` as any);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOuterChange({ style: item.id })}
                aria-label={t('outerAria', { style: label })}
                aria-pressed={isSelected}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                    : 'border-border/60 hover:bg-accent/40 text-foreground'
                }`}
              >
                <span className="truncate">{label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Intérieur des Yeux */}
      <div className="space-y-2.5 pt-3 border-t border-border/50">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('innerTitle')}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {INNER_CONFIGS.map((item) => {
            const isSelected = currentInner === item.id;
            const label = t(`innerOptions.${item.key}` as any);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onInnerChange({ style: item.id })}
                aria-label={t('innerAria', { style: label })}
                aria-pressed={isSelected}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                    : 'border-border/60 hover:bg-accent/40 text-foreground'
                }`}
              >
                <span className="truncate">{label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
