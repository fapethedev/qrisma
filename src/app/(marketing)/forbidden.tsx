import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShieldAlert, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function MarketingForbidden() {
  const t = await getTranslations('common');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
        <div className="mx-auto size-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
          <ShieldAlert className="size-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <div className="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            403 Forbidden
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t('forbiddenTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('forbiddenDesc')}
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="outline" className="gap-2 text-xs font-medium border-border/80">
              <Home className="size-3.5" aria-hidden="true" />
              <span>{t('backToHome')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
