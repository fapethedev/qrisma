'use client';

import React from 'react';
import * as THREE from 'three';
import { Float, RoundedBox } from '@react-three/drei';

interface PosterMockupProps {
  texture: THREE.CanvasTexture | null;
}

export function PosterMockup({ texture }: PosterMockupProps) {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group position={[0, 0, 0]} rotation={[0.02, 0.1, 0]}>
        {/* Cadre Noir Mat */}
        <RoundedBox args={[2.5, 3.2, 0.08]} radius={0.03} smoothness={3} castShadow>
          <meshStandardMaterial
            color="#111215"
            roughness={0.6}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Passe-partout Blanc */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[2.32, 3.02]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
        </mesh>

        {/* Surface QR Code d'art */}
        <mesh position={[0, 0.2, 0.044]}>
          <planeGeometry args={[1.8, 1.8]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          )}
        </mesh>

        {/* Titre minimaliste sous le poster */}
        <mesh position={[0, -1.05, 0.044]}>
          <planeGeometry args={[1.4, 0.15]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
