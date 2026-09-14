'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
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

const BG_CONFIGS: { key: 'white' | 'transparent' | 'dark' | 'gray' | 'cream'; value: string }[] = [
  { key: 'white', value: '#FFFFFF' },
  { key: 'transparent', value: 'transparent' },
  { key: 'dark', value: '#090D16' },
  { key: 'gray', value: '#F8FAFC' },
  { key: 'cream', value: '#FFFBEB' },
];

export function QRGradientEditor({
  background,
  gradient,
  solidColor = '#000000',
  onBackgroundChange,
  onGradientChange,
  onSolidColorChange,
}: QRGradientEditorProps) {
  const t = useTranslations('studio.colors');
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
            {t('gradientToggle')}
          </Label>
          <p className="text-[11px] text-muted-foreground">
            {t('gradientDesc')}
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
            <Label className="text-xs font-medium text-muted-foreground">{t('popular')}</Label>
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
              <Label className="text-xs text-muted-foreground">{t('startColor')}</Label>
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
              <Label className="text-xs text-muted-foreground">{t('endColor')}</Label>
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
              <Label className="text-muted-foreground">{t('angle')}</Label>
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
          <Label className="text-xs font-medium text-muted-foreground">{t('solidColor')}</Label>
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
          {t('bgColor')}
        </Label>
        <div className="flex flex-wrap gap-2">
          {BG_CONFIGS.map((preset) => {
            const label = t(`bgPresets.${preset.key}`);
            return (
              <button
                key={preset.key}
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
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
