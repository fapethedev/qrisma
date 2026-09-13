'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  Box,
  CheckCircle2,
  FileCode2,
  Layers,
  Link2,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export function BentoFeatures() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/20 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fonctionnalités Clés du Micro-SaaS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            L’arsenal complet pour des QR codes professionnels
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Conçu pour les créateurs, agences, restaurateurs et marketeurs exigeants qui refusent le standard médiocre.
          </p>
        </div>

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte 1 : Formats Vectoriels & Print (2 colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="h-full p-8 rounded-3xl border-border/80 bg-gradient-to-br from-card to-card/60 shadow-md flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-3 max-w-md z-10">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileCode2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Exports Vectoriels SVG & Haute Définition 4K
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Téléchargez vos QR codes en SVG vectoriel pur pour une netteté mathématique infinie, en PNG ultra haute définition (jusqu’à 4096 px à 300 DPI pour l’imprimerie) ou en PDF A4 prêt à l’emploi.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 z-10">
                <div className="p-3 rounded-xl border border-border/80 bg-background/80 text-center">
                  <span className="text-xs font-bold text-primary block">SVG</span>
                  <span className="text-[11px] text-muted-foreground">Vectoriel infini</span>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-background/80 text-center">
                  <span className="text-xs font-bold text-primary block">PNG 4K</span>
                  <span className="text-[11px] text-muted-foreground">300 DPI Print</span>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-background/80 text-center">
                  <span className="text-xs font-bold text-primary block">PDF A4</span>
                  <span className="text-[11px] text-muted-foreground">Prêt à découper</span>
                </div>
              </div>

              {/* Éléments visuels d'arrière-plan */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            </Card>
          </motion.div>

          {/* Carte 2 : QR Dynamiques (1 colonne) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="h-full p-8 rounded-3xl border-border/80 bg-gradient-to-br from-card to-card/60 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Link2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Liens Dynamiques & Redirection 302
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Votre QR code a déjà été imprimé sur 5 000 flyers ? Aucun problème. Modifiez sa destination à tout moment sans réimpression.
                </p>
              </div>

              <div className="pt-6">
                <div className="p-3 rounded-xl border border-border bg-background/80 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate">qrcraft.dev/s/menu-ete</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Carte 3 : Mockups 3D R3F (1 colonne) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Card className="h-full p-8 rounded-3xl border-border/80 bg-gradient-to-br from-card to-card/60 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Box className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Prévisualisation 3D Interactive
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Grâce à React Three Fiber, projetez votre QR code sur un smartphone, une affiche dans un cadre, une tasse ou une carte de visite avec éclairage studio.
                </p>
              </div>

              <div className="pt-6 flex items-center gap-2 text-xs font-medium text-purple-600 dark:text-purple-400">
                <Smartphone className="h-4 w-4" />
                <span>3D Canvas Three.js intégré</span>
              </div>
            </Card>
          </motion.div>

          {/* Carte 4 : Analytics Précis (2 colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="h-full p-8 rounded-3xl border-border/80 bg-gradient-to-br from-card to-card/60 shadow-md flex flex-col justify-between">
              <div className="space-y-3 max-w-md">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Télémétrie & Statistiques de Scan
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mesurez l’efficacité de vos campagnes en direct. Suivez le volume horaire des scans, les systèmes d’exploitation (iOS vs Android), les navigateurs et la géolocalisation.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                <div className="p-3 rounded-xl border border-border/80 bg-background/80">
                  <span className="text-xs text-muted-foreground block">Scans totaux</span>
                  <span className="text-lg font-extrabold text-foreground">12 450</span>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-background/80">
                  <span className="text-xs text-muted-foreground block">Mobile</span>
                  <span className="text-lg font-extrabold text-foreground">94.2%</span>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-background/80">
                  <span className="text-xs text-muted-foreground block">Top Pays</span>
                  <span className="text-lg font-extrabold text-foreground">France</span>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-background/80">
                  <span className="text-xs text-muted-foreground block">Taux de clic</span>
                  <span className="text-lg font-extrabold text-foreground">99.8%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
