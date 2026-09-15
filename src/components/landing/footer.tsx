'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { QrCode, Heart } from 'lucide-react';

export function LandingFooter() {
  const t = useTranslations('landing');

  return (
    <footer className="border-t border-border/70 bg-card/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marque & Mission */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                <QrCode className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                QRCraft
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-muted-foreground">
              <span>{t('footerTechStack')}</span>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{t('footerNav')}</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard/studio" className="hover:text-primary transition-colors">
                  {t('footerNavStudio')}
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  {t('footerNavFeatures')}
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">
                  {t('footerNavGallery')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition-colors">
                  {t('footerNavPricing')}
                </a>
              </li>
            </ul>
          </div>

          {/* Formats & Légal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{t('footerLegal')}</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>{t('footerLegalSvg')}</li>
              <li>{t('footerLegalPng')}</li>
              <li>{t('footerLegalPdf')}</li>
              <li>{t('footerLegalPrivacy')}</li>
              <li>{t('footerLegalTerms')}</li>
            </ul>
          </div>
        </div>

        {/* Barre de pied de page */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} QRCraft Studio. {t('footerRights')}</p>
          <p className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>{t('footerMadeWith')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
