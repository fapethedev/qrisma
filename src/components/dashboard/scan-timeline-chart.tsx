'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ScanTimelineChartProps {
  data: Array<{ date: string; scans: number }>;
  title?: string;
  description?: string;
}

export function ScanTimelineChart({
  data,
  title = 'Évolution des Scans',
  description = 'Nombre de scans enregistrés par jour',
}: ScanTimelineChartProps) {
  // Remplir les jours vides si peu ou pas de données pour un affichage propre
  const formattedData =
    data && data.length > 0
      ? data.map((d) => ({
          ...d,
          formattedDate: new Date(d.date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
          }),
        }))
      : [
          { date: new Date().toISOString().split('T')[0], formattedDate: "Aujourd'hui", scans: 0 },
        ];

  return (
    <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur-sm col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
              stroke="#888888"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              fontSize={11}
              stroke="#888888"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-popover/95 p-2 shadow-md backdrop-blur-sm text-xs">
                      <p className="font-medium text-foreground">{label}</p>
                      <p className="text-indigo-400 font-semibold mt-0.5">
                        {payload[0].value} {Number(payload[0].value) > 1 ? 'scans' : 'scan'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="scans"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#scansGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
