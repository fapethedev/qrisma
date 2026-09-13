'use client';

import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { ReactQRCode } from '@lglab/react-qr-code';
import { Sparkles, Layers } from 'lucide-react';
import { QR_VISUAL_PRESETS } from '@/lib/qr/presets';

export function ParallaxShowcase() {
  const cyberpunkPreset = QR_VISUAL_PRESETS.find((p) => p.id === 'cyberpunk-neon') || QR_VISUAL_PRESETS[1];
  const goldPreset = QR_VISUAL_PRESETS.find((p) => p.id === 'elegant-gold') || QR_VISUAL_PRESETS[3];
  const modernPreset = QR_VISUAL_PRESETS.find((p) => p.id === 'modern-indigo') || QR_VISUAL_PRESETS[0];

  return (
    <section id="showcase" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <Layers className="h-3.5 w-3.5" />
            <span>Galerie Stylistique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            L’art de la géométrie vectorielle
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Découvrez comment chaque marque peut concevoir un QR code en parfaite harmonie avec son identité visuelle.
          </p>
        </div>

        {/* Scène Parallaxe en 3 colonnes superposées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-8">
          {/* Carte Gauche : Cyberpunk */}
          <Parallax speed={-8}>
            <div className="p-6 rounded-3xl border border-cyan-500/30 bg-card/90 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 transition-transform hover:scale-105 duration-300">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-500">
                Style Cyberpunk
              </span>
              <div className="p-4 rounded-2xl bg-[#090D16] shadow-lg">
                <ReactQRCode
                  value="https://qrcraft.dev/cyberpunk"
                  size={180}
                  level="Q"
                  background={cyberpunkPreset.config.background}
                  gradient={cyberpunkPreset.config.gradient}
                  dataModulesSettings={cyberpunkPreset.config.dataModulesSettings}
                  finderPatternOuterSettings={cyberpunkPreset.config.finderPatternOuterSettings}
                  finderPatternInnerSettings={cyberpunkPreset.config.finderPatternInnerSettings}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center font-medium">
                Pistes de circuit & yeux microchip
              </p>
            </div>
          </Parallax>

          {/* Carte Centre : Modern Indigo (Plus haute avec vitesse différente) */}
          <Parallax speed={6}>
            <div className="p-7 rounded-3xl border border-primary/40 bg-card shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 transition-transform hover:scale-105 duration-300 ring-2 ring-primary/10">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" />
                <span>Modern SaaS</span>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-lg">
                <ReactQRCode
                  value="https://qrcraft.dev/saas"
                  size={200}
                  level="H"
                  background={modernPreset.config.background}
                  gradient={modernPreset.config.gradient}
                  dataModulesSettings={modernPreset.config.dataModulesSettings}
                  finderPatternOuterSettings={modernPreset.config.finderPatternOuterSettings}
                  finderPatternInnerSettings={modernPreset.config.finderPatternInnerSettings}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center font-medium">
                Dégradé indigo & modules adoucis
              </p>
            </div>
          </Parallax>

          {/* Carte Droite : Obsidian & Gold */}
          <Parallax speed={-5}>
            <div className="p-6 rounded-3xl border border-amber-500/30 bg-card/90 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 transition-transform hover:scale-105 duration-300">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">
                Luxe & Joaillerie
              </span>
              <div className="p-4 rounded-2xl bg-[#121214] shadow-lg">
                <ReactQRCode
                  value="https://qrcraft.dev/gold"
                  size={180}
                  level="Q"
                  background={goldPreset.config.background}
                  gradient={goldPreset.config.gradient}
                  dataModulesSettings={goldPreset.config.dataModulesSettings}
                  finderPatternOuterSettings={goldPreset.config.finderPatternOuterSettings}
                  finderPatternInnerSettings={goldPreset.config.finderPatternInnerSettings}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center font-medium">
                Diamant sculpté & éclat or chaud
              </p>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
