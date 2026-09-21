'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ReactQRCode } from '@lglab/react-qr-code';
import { QRCodeItem } from './qr-code-table';
import { ScanTimelineChart } from './scan-timeline-chart';
import { DeviceBreakdownChart } from './device-breakdown-chart';
import { ExternalLink, ScanLine, Smartphone, Globe, Laptop } from 'lucide-react';

interface QRAnalyticsDialogProps {
  qr: QRCodeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeAnalyticsDialog({
  qr,
  open,
  onOpenChange,
}: QRAnalyticsDialogProps) {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const numLocale = locale === 'en' ? 'en-US' : 'fr-FR';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    totalScans: number;
    devices: any[];
    os: any[];
    browsers: any[];
    countries: any[];
    timeline: any[];
  } | null>(null);

  useEffect(() => {
    if (qr && open) {
      setLoading(true);
      fetch(`/api/qr/${qr.id}/analytics`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data) {
            setData(json.data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [qr, open]);

  if (!qr) return null;

  const parsedDesign =
    typeof qr.design === 'string' ? JSON.parse(qr.design || '{}') : qr.design || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-border/60 bg-white p-1 flex items-center justify-center shadow-xs">
              <ReactQRCode
                value={qr.destinationUrl}
                size={32}
                level={parsedDesign.level || 'M'}
                background={parsedDesign.background || '#ffffff'}
                gradient={parsedDesign.gradient}
                dataModulesSettings={parsedDesign.dataModulesSettings}
              />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <span>{qr.title || t('table.noTitle')}</span>
                {qr.isDynamic && (
                  <Badge variant="default" className="text-[10px] bg-indigo-500/15 text-indigo-500">
                    {t('table.dynamic')}
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span>{t('dialog.redirectsTo')}</span>
                <a
                  href={qr.destinationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-foreground flex items-center gap-1 truncate max-w-sm"
                >
                  <span className="truncate">{qr.destinationUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-16 text-center text-sm text-muted-foreground animate-pulse">
            {t('dialog.loadingMetrics')}
          </div>
        ) : (
          <div className="flex flex-col gap-5 pt-3">
            {/* Statistiques Rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="text-[11px] text-muted-foreground uppercase font-medium flex items-center gap-1">
                  <ScanLine className="w-3 h-3" /> {t('dialog.totalScans')}
                </span>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {(data?.totalScans ?? qr.scanCount).toLocaleString(numLocale)}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="text-[11px] text-muted-foreground uppercase font-medium flex items-center gap-1">
                  <Smartphone className="w-3 h-3" /> {t('dialog.topDevice')}
                </span>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {data?.devices?.[0]?.deviceType || 'Mobile'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="text-[11px] text-muted-foreground uppercase font-medium flex items-center gap-1">
                  <Laptop className="w-3 h-3" /> {t('dialog.topOs')}
                </span>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {data?.os?.[0]?.os || 'iOS / Android'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                <span className="text-[11px] text-muted-foreground uppercase font-medium flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {t('dialog.topCountry')}
                </span>
                <p className="text-xl font-bold mt-1 text-foreground">
                  {data?.countries?.[0]?.country || 'France'}
                </p>
              </div>
            </div>

            {/* Graphique temporel */}
            <ScanTimelineChart
              data={data?.timeline || []}
              title={t('dialog.timeline30d')}
              description={t('dialog.timelineDesc')}
            />

            {/* Répartition par terminal */}
            <DeviceBreakdownChart
              devices={data?.devices || []}
              title={t('dialog.deviceBreakdown')}
              description={t('dialog.deviceDesc')}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
