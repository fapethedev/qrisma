'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { ReactQRCodeRef } from '@lglab/react-qr-code';
import { Box, Download, Loader2, QrCode, RefreshCw, Save, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useQRStudioStore } from '@/stores/qr-studio-store';
import { useSession } from '@/lib/auth/auth-client';
import { toast } from 'sonner';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { QRCustomizerForm } from './qr-customizer-form';
import { QRExportDialog } from './qr-export-dialog';
import { QRCodePreview2D } from './qr-preview-2d';

// Chargement différé et dynamique de la scène 3D pour éviter tout conflit SSR / WebGL
const QRScene3D = dynamic(
  () => import('@/components/3d/qr-scene-3d').then((mod) => mod.QRScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[420px] rounded-3xl border border-border/80 bg-muted/20 flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Chargement du studio 3D...</span>
      </div>
    ),
  }
);

type StudioViewMode = '2d' | '3d';

export function QRStudioView() {
  const { encodedValue, design, resetStudio, isDynamic } = useQRStudioStore();
  const [viewMode, setViewMode] = useState<StudioViewMode>('2d');
  const [exportOpen, setExportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentSvg, setCurrentSvg] = useState<SVGSVGElement | null>(null);
  const qrRef = useRef<ReactQRCodeRef>(null);

  const { data: session } = useSession();
  const [saveOpen, setSaveOpen] = useState(false);
  const [qrTitle, setQrTitle] = useState('Mon QR Code');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getSvgElement = (): SVGSVGElement | null => {
    if (typeof document === 'undefined') return null;
    return qrRef.current?.svg || (document.querySelector('.group svg') as SVGSVGElement | null);
  };

  // Mise à jour de l'élément SVG pour la texture 3D
  useEffect(() => {
    if (mounted) {
      const el = getSvgElement();
      if (el) setCurrentSvg(el);
    }
  }, [mounted, encodedValue, design, viewMode]);

  const handleSaveToAccount = async () => {
    if (!session?.user) {
      toast.error('Veuillez vous connecter pour enregistrer vos QR codes.');
      window.location.href = '/login?callbackUrl=/studio';
      return;
    }
    try {
      setSaving(true);
      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: qrTitle,
          destinationUrl: encodedValue,
          isDynamic,
          design,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur de sauvegarde');
      toast.success('QR Code sauvegardé dans votre bibliothèque !', {
        action: {
          label: 'Voir Dashboard',
          onClick: () => (window.location.href = '/dashboard'),
        },
      });
      setSaveOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-foreground transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <QrCode className="h-5 w-5" />
              </div>
              <span className="font-bold text-base tracking-tight flex items-center gap-1.5">
                QRCraft{' '}
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Studio
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {session?.user && (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-xs h-9 gap-1.5">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!session?.user) {
                  window.location.href = '/login?callbackUrl=/studio';
                } else {
                  setSaveOpen(true);
                }
              }}
              className="text-xs h-9 gap-1.5 border-border/80 hover:bg-muted cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Sauvegarder</span>
            </Button>

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

            <div className="h-5 w-px bg-border/60 mx-1 hidden sm:block" />

            <LanguageToggle />
            <ThemeToggle />
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
            Personnalisez les modules, les dégradés, les coins et le logo avec prévisualisation vectorielle instantanée et projection 3D.
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
              {/* Sélecteur de mode d'aperçu 2D vs 3D */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
                <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/70">
                  <button
                    type="button"
                    onClick={() => setViewMode('2d')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      viewMode === '2d'
                        ? 'bg-background text-foreground shadow-2xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    <span>Aperçu 2D</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      viewMode === '3d'
                        ? 'bg-background text-foreground shadow-2xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Box className="h-3.5 w-3.5" />
                    <span>Mockup 3D</span>
                  </button>
                </div>

                {isDynamic && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Dynamique
                  </span>
                )}
              </div>

              {/* Vue 2D SVG (Toujours rendue dans le DOM pour alimenter la texture 3D et l'export) */}
              <div className={viewMode === '2d' ? 'block' : 'hidden'}>
                <QRCodePreview2D
                  ref={qrRef}
                  encodedValue={encodedValue}
                  design={design}
                  onOpenExport={() => setExportOpen(true)}
                />
              </div>

              {/* Vue 3D Interactive (R3F) */}
              {viewMode === '3d' && (
                <div className="space-y-4 animate-in fade-in-50">
                  <QRScene3D
                    svgElement={currentSvg || getSvgElement()}
                    design={design}
                  />

                  <Button
                    onClick={() => setExportOpen(true)}
                    size="lg"
                    className="w-full font-medium shadow-md transition-all hover:shadow-lg gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Télécharger le QR Code</span>
                  </Button>
                </div>
              )}
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

      {/* Boîte de dialogue de sauvegarde dans le compte */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-indigo-500" />
              <span>Enregistrer dans mon compte</span>
            </DialogTitle>
            <DialogDescription>
              Donnez un titre à votre QR code pour le retrouver facilement dans votre Dashboard et suivre ses scans en temps réel.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="qr-title" className="text-xs font-semibold">Titre du QR Code</Label>
              <Input
                id="qr-title"
                value={qrTitle}
                onChange={(e) => setQrTitle(e.target.value)}
                placeholder="Ex : Campagne Printemps 2026, Menu Restaurant..."
                className="h-10"
              />
            </div>

            <div className="p-3 rounded-lg bg-secondary/50 border border-border/60 text-xs text-muted-foreground flex flex-col gap-1">
              <span className="font-semibold text-foreground">Destination configurée :</span>
              <span className="truncate font-mono text-[11px]">{encodedValue}</span>
              {isDynamic && (
                <span className="text-emerald-500 text-[11px] mt-1 font-medium">
                  ✓ QR Code Dynamique : vous pourrez modifier cette URL à tout moment sans réimprimer le QR code !
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSaveOpen(false)} disabled={saving}>
              Annuler
            </Button>
            <Button onClick={handleSaveToAccount} disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Confirmer l'enregistrement</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
