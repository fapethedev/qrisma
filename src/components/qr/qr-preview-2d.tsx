'use client';

import React, { useRef } from 'react';
import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code';
import { motion } from 'motion/react';
import { Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QRScanCheckBadge } from './qr-scan-check-badge';
import type { QRDesignConfig } from '@/lib/qr/types';

interface QRCodePreview2DProps {
  encodedValue: string;
  design: QRDesignConfig;
  onOpenExport?: () => void;
  className?: string;
}

export const QRCodePreview2D = React.forwardRef<ReactQRCodeRef, QRCodePreview2DProps>(
  ({ encodedValue, design, onOpenExport, className = '' }, forwardedRef) => {
    const internalRef = useRef<ReactQRCodeRef>(null);
    const activeRef = (forwardedRef || internalRef) as React.RefObject<ReactQRCodeRef>;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col items-center gap-6 ${className}`}
      >
        {/* Conteneur du QR Code avec grille subtile */}
        <div className="relative group p-8 md:p-10 rounded-3xl bg-radial from-slate-100/80 to-slate-200/50 dark:from-zinc-900 dark:to-zinc-950 border border-border/80 shadow-xl flex items-center justify-center">
          <div
            className="p-5 rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
            style={{
              backgroundColor: typeof design.background === 'string' ? design.background : '#FFFFFF',
            }}
          >
            <ReactQRCode
              ref={activeRef}
              value={encodedValue || 'https://qrcraft.dev'}
              size={design.size || 260}
              level={design.level || 'M'}
              marginSize={design.marginSize ?? 0}
              minVersion={design.minVersion ?? 1}
              boostLevel={design.boostLevel ?? true}
              background={design.background}
              gradient={design.gradient}
              dataModulesSettings={design.dataModulesSettings}
              finderPatternOuterSettings={design.finderPatternOuterSettings}
              finderPatternInnerSettings={design.finderPatternInnerSettings}
              imageSettings={design.imageSettings}
            />
          </div>
        </div>

        {/* Badge de Scannabilité & Diagnostic */}
        <QRScanCheckBadge
          level={design.level}
          hasLogo={Boolean(design.imageSettings?.src)}
          imageSettings={design.imageSettings}
          dataLength={encodedValue.length}
        />

        {/* Bouton d'action d'exportation principale */}
        {onOpenExport && (
          <Button
            onClick={onOpenExport}
            size="lg"
            className="w-full max-w-xs font-medium shadow-md transition-all hover:shadow-lg gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Télécharger le QR Code</span>
          </Button>
        )}
      </motion.div>
    );
  }
);

QRCodePreview2D.displayName = 'QRCodePreview2D';
