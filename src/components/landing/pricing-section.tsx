'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function PricingSection() {
  const t = useTranslations('landing');
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/20 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-accent font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t('pricingBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground">
            {t('pricingTitle')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {t('pricingSubtitle')}
          </p>

          {/* Toggle Facturation Mensuel / Annuel */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <Label
              htmlFor="billing-switch"
              className={`text-xs font-medium cursor-pointer ${
                !isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}
            >
              {t('billingMonthly')}
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
              <span>{t('billingYearly')}</span>
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {t('billingDiscount')}
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
                <h3 className="text-lg font-heading font-bold text-foreground">{t('planFreeTitle')}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('planFreeDesc')}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-extrabold text-foreground tabular-nums">{t('planFreePrice')}</span>
                <span className="text-xs text-muted-foreground">{t('planFreePeriod')}</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planFreeFeat1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planFreeFeat2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planFreeFeat3')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planFreeFeat4')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/dashboard/studio" className="block">
                <Button variant="outline" className="w-full text-xs font-semibold h-11 cursor-pointer">
                  {t('planFreeCta')}
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan Pro Creator (Mise en avant) */}
          <Card className="p-8 rounded-3xl border-primary bg-gradient-to-b from-card to-primary/5 shadow-xl flex flex-col justify-between relative ring-2 ring-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-accent font-bold uppercase tracking-wide shadow-sm">
              {t('planProPopular')}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-1.5">
                  <span>{t('planProTitle')}</span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('planProDesc')}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-extrabold text-foreground tabular-nums">
                  {isAnnual ? t('planProPriceYearly') : t('planProPriceMonthly')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isAnnual ? t('planProPeriodYearly') : t('planProPeriodMonthly')}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat3')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat4')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat5')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat6')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{t('planProFeat7')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/dashboard/studio" className="block">
                <Button className="w-full text-xs font-heading font-bold h-11 gap-1.5 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 cursor-pointer">
                  <span>{t('planProCta')}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan Enterprise */}
          <Card className="p-8 rounded-3xl border-border/80 bg-card shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground">{t('planEnterpriseTitle')}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('planEnterpriseDesc')}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-extrabold text-foreground tabular-nums">
                  {isAnnual ? t('planEnterprisePriceYearly') : t('planEnterprisePriceMonthly')}
                </span>
                <span className="text-xs text-muted-foreground">{t('planEnterprisePeriod')}</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planEnterpriseFeat1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planEnterpriseFeat2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planEnterpriseFeat3')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planEnterpriseFeat4')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t('planEnterpriseFeat5')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a href="mailto:contact@qrcraft.dev" className="block">
                <Button variant="outline" className="w-full text-xs font-semibold h-11 cursor-pointer">
                  {t('planEnterpriseCta')}
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
