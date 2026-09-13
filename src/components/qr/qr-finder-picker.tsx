'use client';

import React from 'react';
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

interface EyeStyleOption<T> {
  id: T;
  label: string;
}

const OUTER_STYLES: EyeStyleOption<FinderPatternOuterStyle>[] = [
  { id: 'square', label: 'Carré' },
  { id: 'rounded', label: 'Arrondi' },
  { id: 'rounded-lg', label: 'Grand Arrondi' },
  { id: 'circle', label: 'Cercle' },
  { id: 'pinched-square', label: 'Pincé' },
  { id: 'inpoint', label: 'Pointe Intérieure' },
  { id: 'outpoint', label: 'Pointe Extérieure' },
  { id: 'leaf', label: 'Feuille' },
];

const INNER_STYLES: EyeStyleOption<FinderPatternInnerStyle>[] = [
  { id: 'square', label: 'Carré' },
  { id: 'rounded', label: 'Arrondi' },
  { id: 'circle', label: 'Cercle' },
  { id: 'pinched-square', label: 'Pincé' },
  { id: 'diamond', label: 'Diamant' },
  { id: 'leaf', label: 'Feuille' },
  { id: 'microchip', label: 'Microchip' },
  { id: 'star', label: 'Étoile' },
  { id: 'heart', label: 'Cœur' },
  { id: 'hashtag', label: 'Hashtag' },
];

export function QRFinderPicker({
  outerSettings,
  innerSettings,
  onOuterChange,
  onInnerChange,
}: QRFinderPickerProps) {
  const currentOuter = outerSettings.style || 'rounded';
  const currentInner = innerSettings.style || 'rounded';

  return (
    <div className="space-y-6">
      {/* Bordure Extérieure des Yeux */}
      <div className="space-y-2.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bordure extérieure des coins (Finder Outer)
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {OUTER_STYLES.map((style) => {
            const isSelected = currentOuter === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onOuterChange({ style: style.id })}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                    : 'border-border/60 hover:bg-accent/40 text-foreground'
                }`}
              >
                <span className="truncate">{style.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Intérieur des Yeux */}
      <div className="space-y-2.5 pt-3 border-t border-border/50">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Centre intérieur des coins (Finder Inner)
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {INNER_STYLES.map((style) => {
            const isSelected = currentInner === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onInnerChange({ style: style.id })}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                    : 'border-border/60 hover:bg-accent/40 text-foreground'
                }`}
              >
                <span className="truncate">{style.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
