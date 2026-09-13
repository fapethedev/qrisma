'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, QrCode, Sparkles, Building2, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth/auth-client';
import { ThemeToggle } from '@/components/shared/theme-toggle';

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userEmail?: string;
  userName?: string;
  activeOrgName?: string;
}

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  userEmail,
  userName,
  activeOrgName,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              QRCraft
            </span>
          </Link>

          {activeOrgName && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 text-xs font-medium text-muted-foreground border border-border">
              <Building2 className="w-3.5 h-3.5" />
              <span>{activeOrgName}</span>
            </div>
          )}
        </div>

        {/* Barre de Recherche */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par titre, destination, slug..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-secondary/40 border-border/60 focus:bg-background h-9 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Actions & Profil */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link href="/studio">
            <Button size="sm" className="gap-2 shadow-sm font-medium">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Créer un QR</span>
            </Button>
          </Link>

          <div className="h-5 w-px bg-border/60 hidden sm:block" />

          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs font-medium leading-none truncate max-w-[140px]">
              {userName || userEmail?.split('@')[0]}
            </span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
              {userEmail}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = '/';
                  },
                },
              })
            }
            title="Se déconnecter"
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
