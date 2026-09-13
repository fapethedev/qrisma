'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Download,
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopy = (slug: string, id: string) => {
    const fullUrl = `${window.location.origin}/s/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success('Lien court copié dans le presse-papier !');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await onDelete(deletingId);
      toast.success('QR Code supprimé avec succès.');
    } catch (err: any) {
      toast.error('Erreur lors de la suppression du QR Code.');
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
        <h3 className="text-base font-semibold text-foreground">Aucun QR code trouvé</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          Vous n'avez pas encore créé de QR code ou aucun résultat ne correspond à votre recherche.
        </p>
        <Link href="/studio">
          <Button size="sm" className="mt-5 gap-2">
            <Plus className="w-4 h-4" />
            Créer mon premier QR Code
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
              <TableHead className="w-[80px]">Aperçu</TableHead>
              <TableHead>Titre & Destination</TableHead>
              <TableHead className="hidden md:table-cell">Lien Court</TableHead>
              <TableHead className="w-[110px]">Type</TableHead>
              <TableHead className="text-right w-[110px]">Scans</TableHead>
              <TableHead className="text-right w-[70px]">Actions</TableHead>
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
                        {qr.title || 'Sans titre'}
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
                        title="Copier le lien court"
                        aria-label="Copier le lien court"
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
                        Dynamique
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground">
                        Statique
                      </Badge>
                    )}
                  </TableCell>

                  {/* Compteur de Scans */}
                  <TableCell className="text-right py-3 font-semibold text-sm tabular-nums">
                    <span className="inline-flex items-center gap-1.5 justify-end">
                      <ScanLine className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                      {qr.scanCount.toLocaleString('fr-FR')}
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
                          aria-label={`Options pour le QR code ${qr.title || 'sans titre'}`}
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 text-xs">
                        <DropdownMenuItem onClick={() => onSelectAnalytics(qr)} className="gap-2 cursor-pointer">
                          <BarChart2 className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                          <span>Analytiques</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleCopy(qr.shortSlug, qr.id)} className="gap-2 cursor-pointer">
                          <Copy className="w-4 h-4" />
                          <span>Copier le lien</span>
                        </DropdownMenuItem>

                        <Link href={`/studio?edit=${qr.id}`}>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Edit className="w-4 h-4" />
                            <span>Modifier le style</span>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => setDeletingId(qr.id)}
                          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Supprimer</span>
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
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le QR code ainsi que tous ses événements de scans et historiques analytiques associés seront définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
