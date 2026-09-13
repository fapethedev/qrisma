'use client';

import React, { useRef, useState } from 'react';
import type { ReactQRCodeRef } from '@lglab/react-qr-code';
import { Download, QrCode, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQRStudioStore } from '@/stores/qr-studio-store';
import { QRCustomizerForm } from './qr-customizer-form';
import { QRExportDialog } from './qr-export-dialog';
import { QRCodePreview2D } from './qr-preview-2d';

export function QRStudioView() {
  const { encodedValue, design, resetStudio, isDynamic } = useQRStudioStore();
  const [exportOpen, setExportOpen] = useState(false);
  const qrRef = useRef<ReactQRCodeRef>(null);

  const getSvgElement = (): SVGSVGElement | null => {
    return qrRef.current?.svg || document.querySelector('.group svg') as SVGSVGElement | null;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-foreground transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight flex items-center gap-1.5">
                QRCraft <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Studio</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={resetStudio}
              className="text-xs h-9 gap-1.5 border-border/80 hover:bg-muted cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setExportOpen(true)}
              className="text-xs h-9 gap-1.5 shadow-sm hover:shadow cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Générateur de QR Codes Personnalisés
          </h1>
          <p className="text-sm text-muted-foreground">
            Personnalisez les modules, les dégradés, les coins et le logo avec prévisualisation vectorielle instantanée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panneau de configuration (Gauche - 7 colonnes) */}
          <div className="lg:col-span-7">
            <QRCustomizerForm />
          </div>

          {/* Prévisualisation en direct (Droite - 5 colonnes - Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-card rounded-2xl border border-border/80 shadow-md p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Aperçu Vectoriel Temps Réel
                </span>
                {isDynamic && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Mode Dynamique Actif
                  </span>
                )}
              </div>

              <QRCodePreview2D
                ref={qrRef}
                encodedValue={encodedValue}
                design={design}
                onOpenExport={() => setExportOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Boîte de dialogue d'exportation */}
      <QRExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        getSvgElement={getSvgElement}
        defaultFilename="qrcraft-code"
      />
    </div>
  );
}
