'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ReactQRCode } from '@lglab/react-qr-code';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QR_VISUAL_PRESETS } from '@/lib/qr/presets';

export function HeroSection() {
  const t = useTranslations('landing');
  const [demoUrl, setDemoUrl] = useState('https://qrcraft.dev');
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const selectedPreset = QR_VISUAL_PRESETS[activePresetIndex] || QR_VISUAL_PRESETS[0];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Halo de fond lumineux */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Colonne Texte & Accroche (7 colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {t('heroTitlePart1')}{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {t('heroTitlePart2')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/dashboard/studio" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 cursor-pointer h-12 px-6">
                  <span>{t('ctaCreate')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium cursor-pointer h-12 px-6 border-border/80">
                  {t('ctaFeatures')}
                </Button>
              </a>
            </div>

            {/* Micro réassurance */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{t('proofVector')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{t('proofScannability')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{t('proofNoCard')}</span>
              </div>
            </div>
          </motion.div>

          {/* Colonne Widget Démo Interactive (5 colonnes) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Wand2 className="h-3.5 w-3.5 text-primary" />
                  {t('sandboxTitle')}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {t('sandboxLive')}
                </span>
              </div>

              {/* Champ URL réactif */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">{t('sandboxTargetUrl')}</span>
                </div>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder={t('sandboxUrlPlaceholder')}
                    className="pl-8 h-9 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Pills Sélecteurs de Styles */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-muted-foreground">{t('sandboxStyles')}</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {QR_VISUAL_PRESETS.slice(0, 3).map((preset, index) => {
                    const isSelected = activePresetIndex === index;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setActivePresetIndex(index)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer truncate ${
                          isSelected
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                        }`}
                      >
                        {preset.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rendu dynamique du QR Code */}
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/60 flex flex-col items-center justify-center">
                <div
                  className="p-4 rounded-xl shadow-md transition-all duration-300"
                  style={{
                    backgroundColor:
                      typeof selectedPreset.config.background === 'string'
                        ? selectedPreset.config.background
                        : '#FFFFFF',
                  }}
                >
                  <ReactQRCode
                    value={demoUrl || 'https://qrcraft.dev'}
                    size={190}
                    level="Q"
                    background={selectedPreset.config.background}
                    gradient={selectedPreset.config.gradient}
                    dataModulesSettings={selectedPreset.config.dataModulesSettings}
                    finderPatternOuterSettings={selectedPreset.config.finderPatternOuterSettings}
                    finderPatternInnerSettings={selectedPreset.config.finderPatternInnerSettings}
                  />
                </div>
              </div>

              <Link href="/dashboard/studio" className="block">
                <Button className="w-full text-xs font-semibold h-10 gap-1.5 shadow-sm cursor-pointer">
                  <span>{t('sandboxOpenStudio')}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
