'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Soft floating particle field - like golden dust
function FloatingDust({ count = 150, isDark = false }: { count?: number; isDark?: boolean }) {
  const points = useRef<THREE.Points>(null);
  const color = isDark ? '#D4AF37' : '#D4AF37';

  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      // Very gentle rotation
      points.current.rotation.y = state.clock.elapsedTime * 0.02;

      // Subtle floating motion
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlesData.positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particlesData.sizes, 1));
    return geo;
  }, [particlesData]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={isDark ? 0.6 : 0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Elegant floating ring - like a subtle halo
function ElegantRing({
  position,
  size = 1,
  color,
  speed = 1,
  rotationAxis = 'y',
}: {
  position: [number, number, number];
  size?: number;
  color: string;
  speed?: number;
  rotationAxis?: 'x' | 'y' | 'z';
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed * 0.3;
      if (rotationAxis === 'x') {
        meshRef.current.rotation.x = t;
        meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      } else if (rotationAxis === 'z') {
        meshRef.current.rotation.z = t;
        meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      } else {
        meshRef.current.rotation.y = t;
        meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.008, 32, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Soft glowing orb
function SoftOrb({
  position,
  size = 1,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  size?: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.y = initialY + Math.sin(t * 0.5) * 0.5;
      // Gentle pulse
      const scale = size * (1 + Math.sin(t) * 0.05);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Main Scene - Clean and elegant
function Scene({ isDark = false }: { isDark?: boolean }) {
  const goldColor = isDark ? '#D4AF37' : '#C5A028';
  const accentColor = isDark ? '#FFD700' : '#B8860B';
  const subtleColor = isDark ? '#8B7355' : '#D4AF37';

  return (
    <>
      {/* Soft ambient light only */}
      <ambientLight intensity={0.3} />

      {/* Elegant floating rings - very subtle */}
      <ElegantRing position={[-8, 5, -10]} size={6} color={goldColor} speed={0.3} rotationAxis="y" />
      <ElegantRing position={[10, -3, -12]} size={5} color={accentColor} speed={0.4} rotationAxis="x" />
      <ElegantRing position={[0, 8, -15]} size={7} color={subtleColor} speed={0.25} rotationAxis="z" />
      <ElegantRing position={[-12, -8, -8]} size={4} color={goldColor} speed={0.35} rotationAxis="y" />
      <ElegantRing position={[15, 10, -14]} size={5.5} color={accentColor} speed={0.3} rotationAxis="x" />

      {/* Soft glowing orbs in background */}
      <SoftOrb position={[-15, 0, -18]} size={3} color={goldColor} speed={0.4} />
      <SoftOrb position={[12, 8, -20]} size={2.5} color={accentColor} speed={0.5} />
      <SoftOrb position={[0, -12, -16]} size={2} color={subtleColor} speed={0.35} />
      <SoftOrb position={[-10, 12, -22]} size={2.8} color={goldColor} speed={0.45} />
      <SoftOrb position={[18, -5, -19]} size={2.2} color={accentColor} speed={0.4} />

      {/* Floating golden dust particles */}
      <FloatingDust count={120} isDark={isDark} />
    </>
  );
}

// Main component
export default function Background3D({ isDark = false }: { isDark?: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
