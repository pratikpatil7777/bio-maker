'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// DARK MODE: Starfield with shooting stars
// ============================================

function DarkModeStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, phases };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      const twinkle = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      material.opacity = 0.7 + twinkle;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.004;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#D4AF37"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function ShootingStar({ delay = 0 }: { delay?: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const delayRef = useRef(delay + Math.random() * 12 + 8);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!lineRef.current) return;

    delayRef.current -= delta;

    if (delayRef.current <= 0 && !activeRef.current) {
      activeRef.current = true;
      progressRef.current = 0;

      // Random start position anywhere on screen
      startPosRef.current = {
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 40
      };
    }

    if (activeRef.current) {
      progressRef.current += delta * 2.5;

      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      const length = 4;
      const progress = progressRef.current;

      // Classic shooting star direction: top-left to bottom-right diagonal
      positions[0] = startPosRef.current.x + progress * 18;
      positions[1] = startPosRef.current.y - progress * 10;
      positions[2] = -15;
      positions[3] = positions[0] - length;
      positions[4] = positions[1] + length * 0.55;
      positions[5] = -15;

      lineRef.current.geometry.attributes.position.needsUpdate = true;

      const material = lineRef.current.material as THREE.LineBasicMaterial;
      if (progress < 0.2) {
        material.opacity = 0.6 * (progress / 0.2);
      } else {
        material.opacity = Math.max(0, 0.6 * (1 - (progress - 0.2) / 1.0));
      }

      if (progress > 1.3) {
        activeRef.current = false;
        delayRef.current = Math.random() * 15 + 10;
        material.opacity = 0;
      }
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#FFD700" transparent opacity={0} linewidth={2} />
    </line>
  );
}

function DarkModeGoldenDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      velocities[i] = Math.random() * 0.006 + 0.003;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        pos[i * 3] += Math.sin(time * 0.5 + phases[i]) * 0.002;
        pos[i * 3 + 1] += velocities[i];

        if (pos[i * 3 + 1] > 30) {
          pos[i * 3 + 1] = -30;
          pos[i * 3] = (Math.random() - 0.5) * 60;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.07}
        color="#B8860B"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================
// LIGHT MODE: Subtle dust motes (like sunlight on parchment)
// ============================================

// Floating dust motes - like particles caught in sunlight on parchment
function LightModeDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      velocities[i] = Math.random() * 0.004 + 0.002;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        // Gentle floating motion
        pos[i * 3] += Math.sin(time * 0.3 + phases[i]) * 0.003;
        pos[i * 3 + 1] += velocities[i];

        if (pos[i * 3 + 1] > 30) {
          pos[i * 3 + 1] = -30;
          pos[i * 3] = (Math.random() - 0.5) * 70;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      // Shimmer effect
      const material = pointsRef.current.material as THREE.PointsMaterial;
      const shimmer = Math.sin(time * 0.5) * 0.08;
      material.opacity = 0.5 + shimmer;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#996633"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================
// SCENES
// ============================================

function DarkScene() {
  return (
    <>
      <DarkModeStars />
      <ShootingStar delay={0} />
      <ShootingStar delay={8} />
      <ShootingStar delay={16} />
      <DarkModeGoldenDust />
    </>
  );
}

function LightScene() {
  return (
    <>
      <LightModeDust />
    </>
  );
}

// Main component
export default function Background3D({ isDark = false }: { isDark?: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {isDark ? <DarkScene /> : <LightScene />}
      </Canvas>
    </div>
  );
}
