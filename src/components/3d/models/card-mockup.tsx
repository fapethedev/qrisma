'use client';

import React from 'react';
import * as THREE from 'three';
import { Float, RoundedBox } from '@react-three/drei';

interface CardMockupProps {
  texture: THREE.CanvasTexture | null;
}

export function CardMockup({ texture }: CardMockupProps) {
  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.25}>
      <group position={[0, 0, 0]} rotation={[0.15, -0.2, 0.05]}>
        {/* Corps de la carte de visite de luxe */}
        <RoundedBox args={[3.2, 1.9, 0.04]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#0F1117"
            roughness={0.4}
            metalness={0.2}
          />
        </RoundedBox>

        {/* QR Code incrusté sur la partie droite */}
        <mesh position={[0.75, 0, 0.022]}>
          <planeGeometry args={[1.35, 1.35]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          )}
        </mesh>

        {/* Lignes de contact typographiques fictives sur la gauche */}
        <mesh position={[-0.75, 0.4, 0.022]}>
          <planeGeometry args={[1.1, 0.14]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
        <mesh position={[-0.75, 0.15, 0.022]}>
          <planeGeometry args={[0.9, 0.08]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.5} />
        </mesh>
        <mesh position={[-0.75, -0.1, 0.022]}>
          <planeGeometry args={[0.8, 0.08]} />
          <meshStandardMaterial color="#64748B" roughness={0.5} />
        </mesh>
        <mesh position={[-0.75, -0.35, 0.022]}>
          <planeGeometry args={[1.0, 0.08]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
