import React from 'react';
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
  const cards = [
    {
      title: 'Total des Scans',
      value: totalScans.toLocaleString('fr-FR'),
      description: 'Scans cumulés sur tous vos QR codes',
      icon: ScanLine,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'QR Codes Actifs',
      value: totalQRCodes.toLocaleString('fr-FR'),
      description: 'Codes prêts à être scannés',
      icon: QrCode,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    },
    {
      title: 'Scans cette semaine',
      value: recentScans7d.toLocaleString('fr-FR'),
      description: 'Activité sur les 7 derniers jours',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Top Performance',
      value: topQRCodeTitle || 'Aucun scan',
      description: topQRCodeScans !== undefined ? `${topQRCodeScans} scans enregistrés` : 'En attente de scans',
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
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight truncate">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
