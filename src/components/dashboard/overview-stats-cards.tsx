'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScanLine, QrCode, TrendingUp, Sparkles } from 'lucide-react';

interface OverviewStatsCardsProps {
  totalQRCodes: number;
  totalScans: number;
  recentScans7d: number;
  topQRCodeTitle?: string;
  topQRCodeScans?: number;
}

export function OverviewStatsCards({
  totalQRCodes,
  totalScans,
  recentScans7d,
  topQRCodeTitle,
  topQRCodeScans,
}: OverviewStatsCardsProps) {
  const t = useTranslations('dashboard.kpi');
  const locale = useLocale();
  const numLocale = locale === 'en' ? 'en-US' : 'fr-FR';

  const cards = [
    {
      title: t('totalScans'),
      value: totalScans.toLocaleString(numLocale),
      description: t('totalScansDesc'),
      icon: ScanLine,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: t('activeQRCodes'),
      value: totalQRCodes.toLocaleString(numLocale),
      description: t('activeQRCodesDesc'),
      icon: QrCode,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    },
    {
      title: t('scans7d'),
      value: recentScans7d.toLocaleString(numLocale),
      description: t('scans7dDesc'),
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: t('topPerformer'),
      value: topQRCodeTitle || t('topPerformerEmpty'),
      description:
        topQRCodeScans !== undefined
          ? t('topPerformerDesc', { count: topQRCodeScans })
          : t('waitingScans'),
      icon: Sparkles,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card key={idx} className="border-border/60 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg border ${card.color}`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight truncate tabular-nums">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
