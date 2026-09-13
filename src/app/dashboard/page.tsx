'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth/auth-client';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { OverviewStatsCards } from '@/components/dashboard/overview-stats-cards';
import { ScanTimelineChart } from '@/components/dashboard/scan-timeline-chart';
import { DeviceBreakdownChart } from '@/components/dashboard/device-breakdown-chart';
import { QRCodeTable, QRCodeItem } from '@/components/dashboard/qr-code-table';
import { QRCodeAnalyticsDialog } from '@/components/dashboard/qr-analytics-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { QrCode, BarChart3, History, Globe } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>([]);
  const [overview, setOverview] = useState<{
    totalQRCodes: number;
    totalScans: number;
    recentScans7d: number;
    topQRCode: QRCodeItem | null;
    timeline: any[];
    countries: any[];
  }>({
    totalQRCodes: 0,
    totalScans: 0,
    recentScans7d: 0,
    topQRCode: null,
    timeline: [],
    countries: [],
  });

  const [selectedQRForAnalytics, setSelectedQRForAnalytics] = useState<QRCodeItem | null>(null);

  // Redirection si non connecté
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/dashboard');
    }
  }, [session, isPending, router]);

  // Chargement des données du dashboard
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [qrRes, overviewRes] = await Promise.all([
        fetch('/api/qr'),
        fetch('/api/analytics/overview'),
      ]);

      const [qrData, overviewData] = await Promise.all([
        qrRes.json(),
        overviewRes.json(),
      ]);

      if (qrData.data) {
        setQrCodes(qrData.data);
      }
      if (overviewData.data) {
        setOverview(overviewData.data);
      }
    } catch (err) {
      console.error('[Dashboard Load Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      loadDashboardData();
    }
  }, [session?.user]);

  // Suppression d'un QR code
  const handleDeleteQRCode = async (id: string) => {
    const res = await fetch(`/api/qr/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Suppression échouée');
    setQrCodes((prev) => prev.filter((item) => item.id !== id));
    // Recharger l'aperçu
    fetch('/api/analytics/overview')
      .then((r) => r.json())
      .then((j) => j.data && setOverview(j.data));
  };

  if (isPending || (!session?.user && loading)) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-5xl flex flex-col gap-6">
          <Skeleton className="h-16 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // Filtrer les QR codes par la recherche
  const filteredQRCodes = qrCodes.filter((qr) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      qr.title.toLowerCase().includes(query) ||
      qr.shortSlug.toLowerCase().includes(query) ||
      qr.destinationUrl.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-indigo-500/20">
      {/* En-tête du Dashboard */}
      <DashboardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Vue d'ensemble KPI */}
        <OverviewStatsCards
          totalQRCodes={overview.totalQRCodes}
          totalScans={overview.totalScans}
          recentScans7d={overview.recentScans7d}
          topQRCodeTitle={overview.topQRCode?.title}
          topQRCodeScans={overview.topQRCode?.scanCount}
        />

        {/* Graphiques Analytiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScanTimelineChart
            data={overview.timeline || []}
            title="Activité Globale des Scans (30 derniers jours)"
            description="Trafic total redirigé via vos liens courts"
          />

          <DeviceBreakdownChart
            countries={overview.countries || []}
            title="Top Pays d'Origine"
            description="Répartition géographique des scans"
          />
        </div>

        {/* Onglets de Gestion */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Mes QR Codes</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Gérez vos liens dynamiques, modifiez les destinations et inspectez vos performances.
              </p>
            </div>
          </div>

          <QRCodeTable
            items={filteredQRCodes}
            onSelectAnalytics={(qr) => setSelectedQRForAnalytics(qr)}
            onDelete={handleDeleteQRCode}
          />
        </div>
      </main>

      {/* Modal d'analytique détaillée */}
      <QRCodeAnalyticsDialog
        qr={selectedQRForAnalytics}
        open={!!selectedQRForAnalytics}
        onOpenChange={(open) => !open && setSelectedQRForAnalytics(null)}
      />
    </div>
  );
}
