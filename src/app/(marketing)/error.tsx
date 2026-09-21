'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error('[Marketing Route Error]:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
        <div className="mx-auto size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {t('errorTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {error.message || t('errorDesc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={reset} className="w-full sm:w-auto gap-2 text-xs font-semibold">
            <RefreshCw className="size-3.5" aria-hidden="true" />
            <span>{t('tryAgain')}</span>
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 text-xs font-medium border-border/80">
              <Home className="size-3.5" aria-hidden="true" />
              <span>{t('backToHome')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
