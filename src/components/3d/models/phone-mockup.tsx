'use client';

import React from 'react';
import * as THREE from 'three';
import { Float, RoundedBox } from '@react-three/drei';

interface PhoneMockupProps {
  texture: THREE.CanvasTexture | null;
}

export function PhoneMockup({ texture }: PhoneMockupProps) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[0, 0, 0]} rotation={[0.05, -0.15, 0]}>
        {/* Châssis Titanium / Métallique du Smartphone */}
        <RoundedBox args={[1.55, 3.15, 0.12]} radius={0.14} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial
            color="#1E2024"
            roughness={0.25}
            metalness={0.85}
          />
        </RoundedBox>

        {/* Écran en verre avant */}
        <mesh position={[0, 0, 0.062]}>
          <planeGeometry args={[1.46, 3.05]} />
          <meshStandardMaterial
            color="#0A0B0E"
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Encoche Dynamic Island en haut */}
        <mesh position={[0, 1.35, 0.065]}>
          <planeGeometry args={[0.38, 0.09]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Carte QR Code affichée au centre de l'écran */}
        <mesh position={[0, 0.1, 0.064]}>
          <planeGeometry args={[1.25, 1.25]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
          )}
        </mesh>

        {/* Bouton d'action fictif sous le QR code */}
        <mesh position={[0, -0.9, 0.065]}>
          <planeGeometry args={[1.1, 0.22]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
