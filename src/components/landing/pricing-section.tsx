'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/20 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tarifs Transparents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Choisissez le plan adapté à votre ambition
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Commencez gratuitement pour vos projets personnels ou libérez la puissance des QR dynamiques et de l’export 4K avec le plan Pro.
          </p>

          {/* Toggle Facturation Mensuel / Annuel */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <Label
              htmlFor="billing-switch"
              className={`text-xs font-medium cursor-pointer ${
                !isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}
            >
              Mensuel
            </Label>
            <Switch
              id="billing-switch"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label
              htmlFor="billing-switch"
              className={`text-xs font-medium cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}
            >
              <span>Annuel</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                -25% de remise
              </span>
            </Label>
          </div>
        </div>

        {/* Grille des 3 Cartes de Prix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan Gratuit */}
          <Card className="p-8 rounded-3xl border-border/80 bg-card shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Découverte Free</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Parfait pour tester le studio et générer vos premiers QR codes statiques.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">0 €</span>
                <span className="text-xs text-muted-foreground">/ pour toujours</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Jusqu’à 5 QR codes statiques</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Export PNG standard (1024 px)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Sélecteur de formes classiques</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Téléversement de logo basique</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/studio" className="block">
                <Button variant="outline" className="w-full text-xs font-semibold h-11 cursor-pointer">
                  Lancer le studio gratuit
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan Pro Creator (Mise en avant) */}
          <Card className="p-8 rounded-3xl border-primary bg-gradient-to-b from-card to-primary/5 shadow-xl flex flex-col justify-between relative ring-2 ring-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
              Le Plus Populaire
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                  <span>Pro Creator</span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Pour les professionnels, restaurateurs et créateurs qui exigent le meilleur.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  {isAnnual ? '9 €' : '12 €'}
                </span>
                <span className="text-xs text-muted-foreground">/ mois (facturé {isAnnual ? 'annuellement' : 'au mois'})</span>
              </div>

              <ul className="space-y-3 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>QR codes dynamiques illimités</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Redirection modifiable après impression</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Exports vectoriels SVG & PDF A4</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Export PNG 4K Ultra-HD (300 DPI)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Mockups 3D interactifs (iPhone, Poster, Mug)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Statistiques de scans détaillées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Aucun filigrane ou watermark</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/studio" className="block">
                <Button className="w-full text-xs font-bold h-11 gap-1.5 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 cursor-pointer">
                  <span>Essayer 7 jours gratuitement</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan Enterprise */}
          <Card className="p-8 rounded-3xl border-border/80 bg-card shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Agence & Business</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Pour les équipes gérant de gros volumes de campagnes et des clients multiples.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  {isAnnual ? '39 €' : '49 €'}
                </span>
                <span className="text-xs text-muted-foreground">/ mois</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Toutes les fonctionnalités du plan Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Domaine personnalisé (qr.votremarque.com)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Génération par lot (Import CSV)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Accès API REST développeur</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Support prioritaire par email & SLA 99.9%</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a href="mailto:contact@qrcraft.dev" className="block">
                <Button variant="outline" className="w-full text-xs font-semibold h-11 cursor-pointer">
                  Contacter l’équipe
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
