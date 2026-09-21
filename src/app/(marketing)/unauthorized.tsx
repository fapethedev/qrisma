import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Lock, LogIn, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function MarketingUnauthorized() {
  const t = await getTranslations('common');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
        <div className="mx-auto size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
          <Lock className="size-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <div className="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
            401 Unauthorized
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t('unauthorizedTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('unauthorizedDesc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 text-xs font-semibold px-6 shadow-sm">
              <LogIn className="size-3.5" aria-hidden="true" />
              <span>{t('goToLogin')}</span>
            </Button>
          </Link>
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
