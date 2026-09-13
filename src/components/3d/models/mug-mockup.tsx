'use client';

import React from 'react';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface MugMockupProps {
  texture: THREE.CanvasTexture | null;
}

export function MugMockup({ texture }: MugMockupProps) {
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.25}>
      <group position={[0, -0.2, 0]} rotation={[0.1, -0.3, 0]}>
        {/* Corps du Mug Céramique */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.95, 2.3, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>

        {/* Anse du Mug */}
        <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.65, 0.12, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>

        {/* Intérieur creux du Mug (Café noir) */}
        <mesh position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 32]} />
          <meshStandardMaterial color="#2B1D14" roughness={0.1} />
        </mesh>

        {/* Texture QR code sur le flanc avant du mug */}
        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[1.2, 1.2]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          )}
        </mesh>
      </group>
    </Float>
  );
}
