import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FileQuestion, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminNotFound() {
  const t = await getTranslations('common');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
        <div className="mx-auto size-16 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center border border-border/60">
          <FileQuestion className="size-8 text-primary" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <div className="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
            404
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t('notFoundTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('notFoundDesc')}
          </p>
        </div>

        <div className="pt-2">
          <Link href="/dashboard">
            <Button className="gap-2 text-xs font-semibold px-6 shadow-sm">
              <LayoutDashboard className="size-3.5" aria-hidden="true" />
              <span>{t('dashboard')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
