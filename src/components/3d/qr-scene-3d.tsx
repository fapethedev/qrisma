'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { Coffee, CreditCard, Frame, Loader2, RotateCcw, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QRDesignConfig } from '@/lib/qr/types';
import { CardMockup } from './models/card-mockup';
import { MugMockup } from './models/mug-mockup';
import { PhoneMockup } from './models/phone-mockup';
import { PosterMockup } from './models/poster-mockup';
import { useQRTexture } from './use-qr-texture';

export type MockupType = 'phone' | 'poster' | 'mug' | 'card';

interface QRScene3DProps {
  svgElement: SVGSVGElement | null;
  design: QRDesignConfig;
  className?: string;
}

const MOCKUP_OPTIONS: { id: MockupType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'phone', label: 'Smartphone', icon: Smartphone },
  { id: 'poster', label: 'Affiche', icon: Frame },
  { id: 'mug', label: 'Mug Café', icon: Coffee },
  { id: 'card', label: 'Carte Visite', icon: CreditCard },
];

export function QRScene3D({ svgElement, design, className = '' }: QRScene3DProps) {
  const [activeMockup, setActiveMockup] = useState<MockupType>('phone');
  const [resetKey, setResetKey] = useState(0);
  const texture = useQRTexture(svgElement, design);

  return (
    <div className={`flex flex-col items-center gap-4 w-full ${className}`}>
      {/* Sélecteur de mockups 3D */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/70">
          {MOCKUP_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeMockup === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveMockup(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-background text-foreground shadow-2xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setResetKey((k) => k + 1)}
          className="text-xs h-8 gap-1.5 border-border/70 cursor-pointer"
          title="Réinitialiser l’angle de vue"
        >
          <RotateCcw className="h-3 w-3" />
          <span className="hidden sm:inline">Recentrer</span>
        </Button>
      </div>

      {/* Scène 3D Interactive Canvas */}
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl border border-border/80 bg-radial from-slate-100/90 to-slate-200/50 dark:from-zinc-900/90 dark:to-zinc-950 shadow-xl overflow-hidden">
        <Canvas
          key={resetKey}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Éclairage Studio */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, -2, -3]} intensity={0.4} />

          <Suspense fallback={null}>
            {activeMockup === 'phone' && <PhoneMockup texture={texture} />}
            {activeMockup === 'poster' && <PosterMockup texture={texture} />}
            {activeMockup === 'mug' && <MugMockup texture={texture} />}
            {activeMockup === 'card' && <CardMockup texture={texture} />}

            {/* Ombre portée au sol */}
            <ContactShadows
              position={[0, -1.75, 0]}
              opacity={0.4}
              scale={8}
              blur={2.5}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={6.5}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Canvas>

        {/* Indication interactive */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/70 text-[10px] text-muted-foreground font-medium pointer-events-none shadow-xs">
          Maintenez et glissez pour inspecter à 360°
        </div>
      </div>
    </div>
  );
}
