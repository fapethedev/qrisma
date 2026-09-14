'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
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

export function QRExportDialog({
  open,
  onOpenChange,
  getSvgElement,
  defaultFilename = 'mon-code-qr',
}: QRExportDialogProps) {
  const t = useTranslations('studio.exportDialog');
  const [format, setFormat] = useState<QRExportFormat>('svg');
  const [resolution, setResolution] = useState<QRExportResolution>(2048);
  const [filename, setFilename] = useState(defaultFilename);
  const [transparent, setTransparent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    {
      id: 'svg' as const,
      title: t('svgTitle'),
      badge: t('svgBadge'),
      description: t('svgDesc'),
      icon: FileCode2,
    },
    {
      id: 'png' as const,
      title: t('pngTitle'),
      badge: t('pngBadge'),
      description: t('pngDesc'),
      icon: FileImage,
    },
    {
      id: 'jpeg' as const,
      title: t('jpegTitle'),
      badge: t('jpegBadge'),
      description: t('jpegDesc'),
      icon: FileImage,
    },
    {
      id: 'pdf' as const,
      title: t('pdfTitle'),
      badge: t('pdfBadge'),
      description: t('pdfDesc'),
      icon: FileText,
    },
  ];

  const resolutionOptions = [
    { id: 512 as const, label: t('res512'), detail: t('res512Detail') },
    { id: 1024 as const, label: t('res1024'), detail: t('res1024Detail') },
    { id: 2048 as const, label: t('res2048'), detail: t('res2048Detail') },
    { id: 4096 as const, label: t('res4096'), detail: t('res4096Detail') },
  ];

  const handleExport = async () => {
    const svgEl = getSvgElement();
    if (!svgEl) {
      toast.error(t('errorNotFound'));
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

      toast.success(t('successToast'), {
        description: t('successDesc', { format: format.toUpperCase() }),
      });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(t('errorToast'), {
        description: t('errorDesc'),
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
            <span>{t('title')}</span>
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Sélection du Format */}
          <div className="space-y-2.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('formatLabel')}
            </Label>
            <div className="grid grid-cols-2 gap-2.5">
              {formatOptions.map((opt) => {
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
                {t('resolutionLabel')}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {resolutionOptions.map((res) => {
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
              {t('filenameLabel')}
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
            {t('cancel')}
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
                <span>{t('generating')}</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>{t('downloadNow')}</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
