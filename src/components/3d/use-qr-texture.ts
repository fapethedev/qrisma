'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import type { QRDesignConfig } from '@/lib/qr/types';

/**
 * Hook qui génère et met à jour une CanvasTexture Three.js
 * à partir de l'élément SVG du QR Code en temps réel.
 */
export function useQRTexture(svgElement: SVGSVGElement | null, design: QRDesignConfig) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (!svgElement) return;

    let isMounted = true;
    const canvas = document.createElement('canvas');
    const size = 1024; // Haute résolution pour texture 3D nette
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Injection des namespaces XML si absents
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (!isMounted) {
        URL.revokeObjectURL(url);
        return;
      }

      // Fond blanc ou couleur de design
      ctx.fillStyle = typeof design.background === 'string' && design.background !== 'transparent'
        ? design.background
        : '#FFFFFF';
      ctx.fillRect(0, 0, size, size);

      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.colorSpace = THREE.SRGBColorSpace;
      canvasTexture.generateMipmaps = true;
      canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;
      canvasTexture.magFilter = THREE.LinearFilter;
      canvasTexture.needsUpdate = true;

      setTexture(canvasTexture);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
    };

    img.src = url;

    return () => {
      isMounted = false;
    };
  }, [svgElement, design]);

  return texture;
}
