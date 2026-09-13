'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import type { BackgroundSettings, GradientSettings } from '@/lib/qr/types';

interface QRGradientEditorProps {
  background: BackgroundSettings;
  gradient?: GradientSettings;
  solidColor?: string;
  onBackgroundChange: (bg: BackgroundSettings) => void;
  onGradientChange: (gradient?: GradientSettings) => void;
  onSolidColorChange: (color: string) => void;
}

const GRADIENT_PRESETS: { label: string; from: string; to: string }[] = [
  { label: 'Indigo / Violet', from: '#4F46E5', to: '#7C3AED' },
  { label: 'Sunset Rose', from: '#F43F5E', to: '#FB923C' },
  { label: 'Ocean Cyan', from: '#06B6D4', to: '#3B82F6' },
  { label: 'Emerald Mint', from: '#059669', to: '#10B981' },
  { label: 'Obsidian Gold', from: '#F59E0B', to: '#D97706' },
  { label: 'Dark Monochrome', from: '#18181B', to: '#3F3F46' },
];

const BACKGROUND_PRESETS = [
  { label: 'Blanc', value: '#FFFFFF' },
  { label: 'Transparent', value: 'transparent' },
  { label: 'Obsidienne Sombre', value: '#090D16' },
  { label: 'Gris Perle', value: '#F8FAFC' },
  { label: 'Ivoire Crème', value: '#FFFBEB' },
];

export function QRGradientEditor({
  background,
  gradient,
  solidColor = '#000000',
  onBackgroundChange,
  onGradientChange,
  onSolidColorChange,
}: QRGradientEditorProps) {
  const isGradientEnabled = Boolean(gradient);
  const stops = gradient?.stops || [
    { offset: '0%', color: '#4F46E5' },
    { offset: '100%', color: '#7C3AED' },
  ];
  const rotation = gradient?.rotation ?? 45;
  const gradientType = gradient?.type || 'linear';

  const handleToggleGradient = (enabled: boolean) => {
    if (enabled) {
      onGradientChange({
        type: 'linear',
        rotation: 45,
        stops: [
          { offset: '0%', color: '#4F46E5' },
          { offset: '100%', color: '#7C3AED' },
        ],
      });
    } else {
      onGradientChange(undefined);
    }
  };

  const handleStopColorChange = (index: number, color: string) => {
    const updatedStops = [...stops];
    updatedStops[index] = { ...updatedStops[index], color };
    onGradientChange({
      type: gradientType,
      rotation,
      stops: updatedStops,
    });
  };

  const currentBgValue = typeof background === 'string' ? background : '#FFFFFF';

  return (
    <div className="space-y-6">
      {/* Mode Dégradé vs Couleur Unie */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30">
        <div className="space-y-0.5">
          <Label htmlFor="gradient-toggle" className="text-xs font-semibold cursor-pointer">
            Dégradé de couleurs dynamique
          </Label>
          <p className="text-[11px] text-muted-foreground">
            Applique un dégradé vectoriel sur les données et les yeux du QR Code.
          </p>
        </div>
        <Switch
          id="gradient-toggle"
          checked={isGradientEnabled}
          onCheckedChange={handleToggleGradient}
        />
      </div>

      {isGradientEnabled ? (
        <div className="space-y-5 p-4 rounded-xl border border-border/50 bg-background/50">
          {/* Palettes prédéfinies de dégradés */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Combinaisons populaires</Label>
            <div className="grid grid-cols-3 gap-2">
              {GRADIENT_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() =>
                    onGradientChange({
                      type: 'linear',
                      rotation: 45,
                      stops: [
                        { offset: '0%', color: p.from },
                        { offset: '100%', color: p.to },
                      ],
                    })
                  }
                  className="h-9 rounded-lg border border-border/60 p-1 flex items-center justify-between text-xs font-medium transition-all hover:scale-[1.02] cursor-pointer shadow-2xs"
                  style={{
                    background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                  }}
                  title={p.label}
                />
              ))}
            </div>
          </div>

          {/* Éditeurs de couleurs des stops */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Couleur de départ (0%)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stops[0]?.color || '#4F46E5'}
                  onChange={(e) => handleStopColorChange(0, e.target.value)}
                  className="h-8 w-8 rounded border border-border/60 cursor-pointer p-0"
                />
                <Input
                  value={stops[0]?.color || '#4F46E5'}
                  onChange={(e) => handleStopColorChange(0, e.target.value)}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Couleur de fin (100%)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stops[1]?.color || '#7C3AED'}
                  onChange={(e) => handleStopColorChange(1, e.target.value)}
                  className="h-8 w-8 rounded border border-border/60 cursor-pointer p-0"
                />
                <Input
                  value={stops[1]?.color || '#7C3AED'}
                  onChange={(e) => handleStopColorChange(1, e.target.value)}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Rotation du dégradé */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <Label className="text-muted-foreground">Angle d’orientation</Label>
              <span className="font-mono font-medium">{rotation}°</span>
            </div>
            <Slider
              min={0}
              max={360}
              step={5}
              value={[rotation]}
              onValueChange={([rot]) =>
                onGradientChange({
                  type: gradientType,
                  rotation: rot,
                  stops,
                })
              }
            />
          </div>
        </div>
      ) : (
        /* Couleur Unie */
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">Couleur principale des modules</Label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={solidColor}
              onChange={(e) => onSolidColorChange(e.target.value)}
              className="h-9 w-9 rounded-md border border-border/60 cursor-pointer p-0"
            />
            <Input
              value={solidColor}
              onChange={(e) => onSolidColorChange(e.target.value)}
              className="h-9 text-xs font-mono max-w-[140px]"
            />
          </div>
        </div>
      )}

      {/* Arrière-plan du QR Code */}
      <div className="space-y-2.5 pt-3 border-t border-border/50">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Couleur de fond
        </Label>
        <div className="flex flex-wrap gap-2">
          {BACKGROUND_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onBackgroundChange(preset.value)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentBgValue === preset.value
                  ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                  : 'border-border/60 hover:bg-accent/40 text-foreground'
              }`}
            >
              <span
                className="h-3 w-3 rounded-full border border-border/80"
                style={{
                  backgroundColor: preset.value === 'transparent' ? '#FFFFFF' : preset.value,
                  backgroundImage:
                    preset.value === 'transparent'
                      ? 'repeating-conic-gradient(#808080 0% 25%, #FFF 0% 50%) 50% / 4px 4px'
                      : 'none',
                }}
              />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
