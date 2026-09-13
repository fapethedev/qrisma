'use client';

import React, { useRef } from 'react';
import { Image as ImageIcon, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import type { ImageSettings } from '@/lib/qr/types';

interface QRLogoUploaderProps {
  imageSettings?: ImageSettings;
  onSetLogo: (src: string, width?: number, height?: number, excavate?: boolean) => void;
  onRemoveLogo: () => void;
}

// Logos prédéfinis SVG courants encodés en Data URI
const PRESET_LOGOS = [
  {
    name: 'GitHub',
    src: 'https://cdn.simpleicons.org/github/000000',
  },
  {
    name: 'Google',
    src: 'https://cdn.simpleicons.org/google',
  },
  {
    name: 'X / Twitter',
    src: 'https://cdn.simpleicons.org/x/000000',
  },
  {
    name: 'LinkedIn',
    src: 'https://cdn.simpleicons.org/linkedin/0A66C2',
  },
  {
    name: 'Instagram',
    src: 'https://cdn.simpleicons.org/instagram/E4405F',
  },
  {
    name: 'YouTube',
    src: 'https://cdn.simpleicons.org/youtube/FF0000',
  },
];

export function QRLogoUploader({
  imageSettings,
  onSetLogo,
  onRemoveLogo,
}: QRLogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLogo = Boolean(imageSettings?.src);
  const logoSize = imageSettings?.width ?? 48;
  const isExcavate = imageSettings?.excavate ?? true;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convertir l'image locale en Data URL pour un rendu immédiat et sans CORS
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (src) {
        onSetLogo(src, 48, 48, true);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      {/* Zone de téléversement */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Logo central
        </Label>

        {hasLogo ? (
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-border bg-background p-1.5 flex items-center justify-center overflow-hidden shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSettings?.src}
                  alt="Aperçu du logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-xs">
                <p className="font-medium text-foreground">Logo actif</p>
                <p className="text-muted-foreground text-[11px]">{logoSize}x{logoSize} px</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveLogo}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 h-8 gap-1.5 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Retirer</span>
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border/80 hover:border-primary/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-muted/10 hover:bg-primary/5 flex flex-col items-center justify-center gap-2"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-primary">Cliquez pour importer</span> ou glissez votre logo
              <p className="text-[11px] text-muted-foreground mt-0.5">PNG, SVG, JPG (Recommandé: fond transparent)</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Logothèque rapide de marques */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Ou choisissez un logo officiel</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_LOGOS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSetLogo(preset.src, 48, 48, true)}
              className="px-2.5 py-1.5 rounded-lg border border-border/60 hover:border-border hover:bg-accent/40 text-xs font-medium flex items-center gap-2 cursor-pointer transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preset.src} alt={preset.name} className="h-4 w-4 object-contain" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Paramètres avancés si logo présent */}
      {hasLogo && (
        <div className="space-y-4 pt-3 border-t border-border/50">
          {/* Slider de taille */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <Label className="text-muted-foreground">Taille du logo</Label>
              <span className="font-mono font-medium">{logoSize} px</span>
            </div>
            <Slider
              min={24}
              max={68}
              step={2}
              value={[logoSize]}
              onValueChange={([size]) => onSetLogo(imageSettings!.src, size, size, isExcavate)}
            />
          </div>

          {/* Switch Excavate */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
            <div className="space-y-0.5">
              <Label htmlFor="excavate-switch" className="text-xs font-medium cursor-pointer">
                Excavation automatique
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Dégage les modules QR situés directement sous le logo pour maximiser la lisibilité.
              </p>
            </div>
            <Switch
              id="excavate-switch"
              checked={isExcavate}
              onCheckedChange={(excavate) =>
                onSetLogo(imageSettings!.src, logoSize, logoSize, excavate)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
