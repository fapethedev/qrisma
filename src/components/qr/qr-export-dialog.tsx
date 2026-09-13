'use client';

import React, { useState } from 'react';
import { Download, FileCode2, FileImage, FileText, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { exportQRCode } from '@/lib/qr/export-service';
import type { QRExportFormat, QRExportResolution } from '@/lib/qr/types';

interface QRExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getSvgElement: () => SVGSVGElement | null;
  defaultFilename?: string;
}

const FORMAT_OPTIONS: {
  id: QRExportFormat;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'svg',
    title: 'SVG Vectoriel',
    badge: 'Recommandé',
    description: 'Netteté infinie sans perte, parfait pour le web, l’impression et les graphistes.',
    icon: FileCode2,
  },
  {
    id: 'png',
    title: 'PNG Haute Définition',
    badge: 'Universel',
    description: 'Format matriciel idéal avec transparence, prêt pour tous supports numériques.',
    icon: FileImage,
  },
  {
    id: 'jpeg',
    title: 'JPEG Compact',
    badge: 'Standard',
    description: 'Format standard opaque avec fond blanc, léger et compatible partout.',
    icon: FileImage,
  },
  {
    id: 'pdf',
    title: 'PDF Document A4',
    badge: 'Print Ready',
    description: 'Document prêt à être imprimé directement avec repères et cadrage soigné.',
    icon: FileText,
  },
];

const RESOLUTION_OPTIONS: { id: QRExportResolution; label: string; detail: string }[] = [
  { id: 512, label: '512 px (1x)', detail: 'Réseaux sociaux & Web' },
  { id: 1024, label: '1024 px (2x)', detail: 'Écrans Retina & Docs' },
  { id: 2048, label: '2048 px (4x)', detail: 'Flyers & Packaging' },
  { id: 4096, label: '4096 px (Print)', detail: 'Impression Haute Résolution 300 DPI' },
];

export function QRExportDialog({
  open,
  onOpenChange,
  getSvgElement,
  defaultFilename = 'mon-code-qr',
}: QRExportDialogProps) {
  const [format, setFormat] = useState<QRExportFormat>('svg');
  const [resolution, setResolution] = useState<QRExportResolution>(2048);
  const [filename, setFilename] = useState(defaultFilename);
  const [transparent, setTransparent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const svgEl = getSvgElement();
    if (!svgEl) {
      toast.error('Erreur : QR Code introuvable dans le studio.');
      return;
    }

    setIsExporting(true);
    try {
      await exportQRCode(svgEl, {
        filename: filename.trim() || 'qrcraft-code',
        format,
        resolution,
        includeMargin: true,
        transparentBackground: transparent,
      });

      toast.success('QR Code exporté avec succès !', {
        description: `Téléchargé au format ${format.toUpperCase()}`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Échec de l’exportation', {
        description: 'Une erreur est survenue lors de la génération du fichier.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Exporter le QR Code</span>
          </DialogTitle>
          <DialogDescription>
            Sélectionnez votre format de fichier et votre niveau de qualité préféré.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Sélection du Format */}
          <div className="space-y-2.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Format de fichier
            </Label>
            <div className="grid grid-cols-2 gap-2.5">
              {FORMAT_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = format === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormat(opt.id)}
                    aria-label={`Format ${opt.title} : ${opt.description}`}
                    aria-pressed={isSelected}
                    className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary/30 shadow-2xs'
                        : 'border-border/60 hover:bg-accent/40 text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold">{opt.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2 mt-0.5">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sélection de la Résolution si format matriciel ou PDF */}
          {format !== 'svg' && (
            <div className="space-y-2.5 pt-2 border-t border-border/50">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Résolution & Qualité
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {RESOLUTION_OPTIONS.map((res) => {
                  const isSelected = resolution === res.id;
                  return (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => setResolution(res.id)}
                      aria-label={`Résolution ${res.label}, ${res.detail}`}
                      aria-pressed={isSelected}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary/30'
                          : 'border-border/60 hover:bg-accent/40 text-foreground'
                      }`}
                    >
                      <p className="text-xs font-semibold">{res.label}</p>
                      <p className="text-[10px] text-muted-foreground">{res.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nom du fichier */}
          <div className="space-y-1.5 pt-2 border-t border-border/50">
            <Label htmlFor="filename-input" className="text-xs font-medium text-muted-foreground">
              Nom du fichier
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="filename-input"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="mon-code-qr"
                className="h-9 text-xs font-mono"
              />
              <span className="text-xs font-mono text-muted-foreground shrink-0">.{format}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
            className="cursor-pointer"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="gap-2 cursor-pointer"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Télécharger maintenant</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
