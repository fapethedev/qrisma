import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShieldAlert, LogIn, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AuthForbidden() {
  const t = await getTranslations('common');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-5">
        <div className="mx-auto size-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
          <ShieldAlert className="size-7" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            403 Forbidden
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {t('forbiddenTitle')}
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('forbiddenDesc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 text-xs font-semibold">
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
