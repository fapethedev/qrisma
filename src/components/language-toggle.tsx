'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

export function LanguageToggle() {
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Mise à jour du cookie NEXT_LOCALE (durée 1 an)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-9 w-9 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          title="Changer de langue / Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 text-xs font-medium">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('fr')}
          className={`flex items-center justify-between cursor-pointer ${
            currentLocale === 'fr' ? 'font-bold text-primary bg-primary/5' : ''
          }`}
        >
          <span className="flex items-center gap-2">
            <span>🇫🇷</span>
            <span>Français</span>
          </span>
          {currentLocale === 'fr' && <Check className="w-3.5 h-3.5 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={`flex items-center justify-between cursor-pointer ${
            currentLocale === 'en' ? 'font-bold text-primary bg-primary/5' : ''
          }`}
        >
          <span className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span>English</span>
          </span>
          {currentLocale === 'en' && <Check className="w-3.5 h-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
