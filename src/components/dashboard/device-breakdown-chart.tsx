'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface BreakdownItem {
  deviceType?: string;
  os?: string;
  browser?: string;
  country?: string;
  count: string | number;
}

interface DeviceBreakdownChartProps {
  devices?: BreakdownItem[];
  countries?: BreakdownItem[];
  title?: string;
  description?: string;
}

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];

export function DeviceBreakdownChart({
  devices = [],
  countries = [],
  title,
  description,
}: DeviceBreakdownChartProps) {
  const t = useTranslations('dashboard.charts');

  const chartTitle = title || t('deviceTitle');
  const chartDesc = description || t('deviceDesc');

  // Préparer les données pour les terminaux
  const deviceData =
    devices.length > 0
      ? devices.map((d) => ({
          name: d.deviceType || t('unknown'),
          value: typeof d.count === 'string' ? parseInt(d.count, 10) : d.count,
        }))
      : [
          { name: t('mobile'), value: 0 },
          { name: t('desktop'), value: 0 },
          { name: t('tablet'), value: 0 },
        ];

  return (
    <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur-sm col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{chartTitle}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {chartDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deviceData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="#888888"
              width={70}
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
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {deviceData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
