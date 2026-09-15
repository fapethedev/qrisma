'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';

export function LandingNavbar() {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <QrCode className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-foreground">
              {t('appName')}
            </span>
            <span className="hidden sm:inline-block font-accent text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-2xs">
              SaaS
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            {t('features')}
          </a>
          <a href="#showcase" className="hover:text-foreground transition-colors">
            {t('showcase')}
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            {t('pricing')}
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            {t('faq')}
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />

          <Link href="/dashboard/studio">
            <Button size="sm" className="font-medium gap-1.5 shadow-sm hover:shadow cursor-pointer">
              <span>{t('studio')}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
