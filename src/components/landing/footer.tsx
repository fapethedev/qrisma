'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, Heart, Sparkles } from 'lucide-react';

export function LandingFooter() {
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
              Le Micro-SaaS nouvelle génération pour générer, styliser, imprimer en haute résolution et traquer vos QR codes personnalisés.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-muted-foreground">
              <span>Stack moderne : Next.js 16, React 19, @lglab/react-qr-code, shadcn/ui.</span>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/studio" className="hover:text-primary transition-colors">
                  Studio de création
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">
                  Galerie de styles
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition-colors">
                  Grille des tarifs
                </a>
              </li>
            </ul>
          </div>

          {/* Formats & Légal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Formats & Légal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Export SVG Vectoriel</li>
              <li>Export PNG 4K (300 DPI)</li>
              <li>Export PDF A4 Print-ready</li>
              <li>Politique de confidentialité</li>
              <li>Conditions d’utilisation</li>
            </ul>
          </div>
        </div>

        {/* Barre de pied de page */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} QRCraft Studio. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            <span>Conçu avec</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>pour une expérience Micro-SaaS d'exception.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
