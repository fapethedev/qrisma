'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ErrorCorrectionLevel, ImageSettings } from '@/lib/qr/types';

interface QRScanCheckBadgeProps {
  level: ErrorCorrectionLevel;
  hasLogo: boolean;
  imageSettings?: ImageSettings;
  dataLength: number;
}

export function QRScanCheckBadge({
  level,
  hasLogo,
  imageSettings,
  dataLength,
}: QRScanCheckBadgeProps) {
  const t = useTranslations('studio.scanBadge');

  // Évaluation de la robustesse de scannabilité
  const getScannabilityReport = () => {
    // Si logo présent mais correction d'erreur faible ('L' ou 'M')
    if (hasLogo && (level === 'L' || level === 'M')) {
      return {
        variant: 'warning' as const,
        label: t('warningLabel'),
        description: t('warningDesc'),
        icon: AlertTriangle,
      };
    }

    // Si payload très lourd (> 500 caractères) avec niveau H
    if (dataLength > 500) {
      return {
        variant: 'info' as const,
        label: t('densityLabel'),
        description: t('densityDesc'),
        icon: ShieldCheck,
      };
    }

    if (level === 'H') {
      return {
        variant: 'success' as const,
        label: t('optimalLabel'),
        description: t('optimalDesc'),
        icon: CheckCircle2,
      };
    }

    if (level === 'Q') {
      return {
        variant: 'success' as const,
        label: t('highLabel'),
        description: t('highDesc'),
        icon: CheckCircle2,
      };
    }

    return {
      variant: 'default' as const,
      label: t('standardLabel'),
      description: t('standardDesc'),
      icon: CheckCircle2,
    };
  };

  const report = getScannabilityReport();
  const Icon = report.icon;

  const badgeStyles = {
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    default: 'bg-secondary text-secondary-foreground border-border',
  }[report.variant];

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Badge variant="outline" className={`px-2.5 py-1 text-xs font-medium ${badgeStyles} flex items-center gap-1.5 shadow-xs`}>
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span>{report.label}</span>
      </Badge>
      <p className="text-[11px] text-muted-foreground">{report.description}</p>
    </div>
  );
}
