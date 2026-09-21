'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AlertTriangle, LogIn, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error('[Auth Route Error]:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-5">
        <div className="mx-auto size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {t('errorTitle')}
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error.message || t('errorDesc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Button onClick={reset} className="w-full sm:w-auto gap-2 text-xs font-semibold">
            <RefreshCw className="size-3.5" aria-hidden="true" />
            <span>{t('tryAgain')}</span>
          </Button>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 text-xs font-medium border-border/80">
              <LogIn className="size-3.5" aria-hidden="true" />
              <span>{t('goToLogin')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
