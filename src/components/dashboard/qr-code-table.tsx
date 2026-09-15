'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ReactQRCode } from '@lglab/react-qr-code';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  MoreHorizontal,
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  Edit,
  Trash2,
  ScanLine,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

export interface QRCodeItem {
  id: string;
  title: string;
  shortSlug: string;
  destinationUrl: string;
  isDynamic: boolean;
  design: string | Record<string, any>;
  scanCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface QRCodeTableProps {
  items: QRCodeItem[];
  onSelectAnalytics: (qr: QRCodeItem) => void;
  onDelete: (id: string) => Promise<void>;
  appUrl?: string;
}

export function QRCodeTable({
  items,
  onSelectAnalytics,
  onDelete,
  appUrl = 'http://localhost:3000',
}: QRCodeTableProps) {
  const t = useTranslations('dashboard.table');
  const locale = useLocale();
  const numLocale = locale === 'en' ? 'en-US' : 'fr-FR';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopy = (slug: string, id: string) => {
    const fullUrl = `${window.location.origin}/s/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success(t('copySuccess'));
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await onDelete(deletingId);
      toast.success(t('deleteSuccess'));
    } catch (err: any) {
      toast.error(t('deleteError'));
    } finally {
      setDeletingId(null);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 p-12 text-center bg-card/40 backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
          <ScanLine className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{t('emptyTitle')}</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          {t('emptyDesc')}
        </p>
        <Link href="/dashboard/studio">
          <Button size="sm" className="mt-5 gap-2">
            <Plus className="w-4 h-4" />
            {t('createFirst')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead className="w-[80px]">{t('preview')}</TableHead>
              <TableHead>{t('details')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('shortLink')}</TableHead>
              <TableHead className="w-[110px]">{t('type')}</TableHead>
              <TableHead className="text-right w-[110px]">{t('scans')}</TableHead>
              <TableHead className="text-right w-[70px]">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((qr) => {
              const parsedDesign =
                typeof qr.design === 'string' ? JSON.parse(qr.design || '{}') : qr.design || {};
              const redirectUrl = `/s/${qr.shortSlug}`;

              return (
                <TableRow key={qr.id} className="hover:bg-muted/30 transition-colors">
                  {/* Miniature QR */}
                  <TableCell className="py-3">
                    <div className="w-11 h-11 rounded-lg border border-border/60 bg-white p-1 flex items-center justify-center overflow-hidden shadow-xs">
                      <ReactQRCode
                        value={`${appUrl}${redirectUrl}`}
                        size={36}
                        level={parsedDesign.level || 'M'}
                        background={parsedDesign.background || '#ffffff'}
                        gradient={parsedDesign.gradient}
                        dataModulesSettings={parsedDesign.dataModulesSettings}
                      />
                    </div>
                  </TableCell>

                  {/* Titre & URL de Destination */}
                  <TableCell className="py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm text-foreground hover:underline cursor-pointer">
                        {qr.title || t('noTitle')}
                      </span>
                      <a
                        href={qr.destinationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 truncate max-w-[260px] sm:max-w-md"
                      >
                        <span className="truncate">{qr.destinationUrl}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  </TableCell>

                  {/* Lien court & Bouton Copier */}
                  <TableCell className="hidden md:table-cell py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono bg-secondary/80 px-2 py-0.5 rounded border border-border/60">
                        /s/{qr.shortSlug}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleCopy(qr.shortSlug, qr.id)}
                        className="text-muted-foreground hover:text-foreground h-6 w-6 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden"
                        title={t('copyShortLink')}
                        aria-label={t('copyShortLink')}
                      >
                        {copiedId === qr.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </TableCell>

                  {/* Type (Dynamique / Statique) */}
                  <TableCell className="py-3">
                    {qr.isDynamic ? (
                      <Badge variant="default" className="text-[10px] font-medium bg-indigo-500/15 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/30">
                        {t('dynamic')}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground">
                        {t('static')}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Compteur de Scans */}
                  <TableCell className="text-right py-3 font-semibold text-sm tabular-nums">
                    <span className="inline-flex items-center gap-1.5 justify-end">
                      <ScanLine className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                      {qr.scanCount.toLocaleString(numLocale)}
                    </span>
                  </TableCell>

                  {/* Menu Contextuel */}
                  <TableCell className="text-right py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden"
                          aria-label={t('optionsFor', { title: qr.title || t('noTitle') })}
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 text-xs">
                        <DropdownMenuItem onClick={() => onSelectAnalytics(qr)} className="gap-2 cursor-pointer">
                          <BarChart2 className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                          <span>{t('analytics')}</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleCopy(qr.shortSlug, qr.id)} className="gap-2 cursor-pointer">
                          <Copy className="w-4 h-4" />
                          <span>{t('copyLink')}</span>
                        </DropdownMenuItem>

                        <Link href={`/dashboard/studio?edit=${qr.id}`}>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Edit className="w-4 h-4" />
                            <span>{t('editStyle')}</span>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => setDeletingId(qr.id)}
                          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>{t('delete')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation de suppression */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t('deleteConfirmButton')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
