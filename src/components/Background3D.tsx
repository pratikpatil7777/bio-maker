'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Ethereal glowing orb with pulsing effect
function GlowingOrb({
  position,
  color,
  size = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
      meshRef.current.scale.setScalar(size * (1 + Math.sin(t * 2) * 0.1));
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

// Floating geometric shape with distortion and trail
function FloatingShape({
  position,
  color,
  speed = 1,
  distort = 0.3,
  size = 1,
  shape = 'sphere',
  enableTrail = false,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
  shape?: 'sphere' | 'torus' | 'box';
  enableTrail?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  const ShapeComponent = shape === 'torus' ? Torus : shape === 'box' ? Box : Sphere;
  const args = shape === 'torus' ? [size * 0.5, size * 0.2, 16, 32] : shape === 'box' ? [size, size, size] : [size, 32, 32];

  const mesh = (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <ShapeComponent ref={meshRef} args={args as [number, number, number]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </ShapeComponent>
    </Float>
  );

  if (enableTrail) {
    return (
      <Trail
        width={1}
        length={6}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
      >
        {mesh}
      </Trail>
    );
  }

  return mesh;
}

// Particle system
function Particles({ count = 100, isDark = false }: { count?: number; isDark?: boolean }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
    return geo;
  }, [particlesPosition]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color={isDark ? '#D4AF37' : '#800020'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Animated ring
function AnimatedRing({ position, color, size = 2 }: { position: [number, number, number]; color: string; size?: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[size, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

// Floating lotus petal for spiritual theme
function FloatingPetal({
  position,
  color,
  rotation = 0,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  rotation?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = rotation + Math.sin(t) * 0.3;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={[0, rotation, 0]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Orbiting energy ring
function OrbitingRing({
  radius = 3,
  color,
  speed = 1,
  tilt = 0,
}: {
  radius?: number;
  color: string;
  speed?: number;
  tilt?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function Scene({ isDark = false }: { isDark?: boolean }) {
  const primaryColor = isDark ? '#D4AF37' : '#800020';
  const secondaryColor = isDark ? '#800020' : '#D4AF37';
  const accentColor = isDark ? '#FFD700' : '#B8860B';
  const sparkleColor = isDark ? '#FFD700' : '#D4AF37';

  return (
    <>
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#fff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={primaryColor} distance={20} />
      <pointLight position={[10, 5, 5]} intensity={0.3} color={accentColor} distance={15} />

      {/* Magical sparkles effect */}
      <Sparkles
        count={100}
        scale={[20, 20, 10]}
        size={2}
        speed={0.3}
        color={sparkleColor}
        opacity={0.5}
      />

      {/* Glowing orbs - ethereal energy */}
      <GlowingOrb position={[-3, 2, -4]} color={primaryColor} size={0.4} speed={0.6} />
      <GlowingOrb position={[3, -1, -3]} color={secondaryColor} size={0.3} speed={0.8} />
      <GlowingOrb position={[0, 3, -5]} color={accentColor} size={0.25} speed={1} />

      {/* Floating shapes with enhanced effects */}
      <FloatingShape position={[-4, 2, -3]} color={primaryColor} size={0.8} speed={0.8} distort={0.4} shape="sphere" enableTrail />
      <FloatingShape position={[4, -1, -2]} color={secondaryColor} size={0.6} speed={1.2} distort={0.3} shape="sphere" />
      <FloatingShape position={[-3, -2, -4]} color={accentColor} size={0.5} speed={1} distort={0.5} shape="torus" />
      <FloatingShape position={[3, 3, -5]} color={primaryColor} size={0.4} speed={0.6} distort={0.2} shape="box" />
      <FloatingShape position={[0, -3, -3]} color={secondaryColor} size={0.7} speed={0.9} distort={0.35} shape="sphere" />
      <FloatingShape position={[-5, 0, -6]} color={accentColor} size={0.5} speed={1.1} distort={0.25} shape="torus" enableTrail />
      <FloatingShape position={[5, 1, -4]} color={primaryColor} size={0.45} speed={0.7} distort={0.3} shape="box" />

      {/* Floating lotus petals for spiritual touch */}
      {[...Array(6)].map((_, i) => (
        <FloatingPetal
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 4,
            -2 + Math.sin((i / 6) * Math.PI * 2) * 0.5,
            -6
          ]}
          color={i % 2 === 0 ? primaryColor : accentColor}
          rotation={(i / 6) * Math.PI * 2}
          speed={0.5 + i * 0.1}
        />
      ))}

      {/* Orbiting energy rings */}
      <OrbitingRing radius={5} color={primaryColor} speed={0.3} tilt={Math.PI / 6} />
      <OrbitingRing radius={4} color={secondaryColor} speed={-0.4} tilt={-Math.PI / 8} />
      <OrbitingRing radius={6} color={accentColor} speed={0.2} tilt={Math.PI / 4} />

      {/* Animated rings */}
      <AnimatedRing position={[0, 0, -8]} color={primaryColor} size={4} />
      <AnimatedRing position={[2, -1, -10]} color={secondaryColor} size={3} />

      {/* Particle system */}
      <Particles count={200} isDark={isDark} />
    </>
  );
}

// Camera rig for subtle mouse-follow effect
function CameraRig() {
  const { camera, mouse } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    camera.position.lerp(
      vec.set(mouse.x * 0.5, mouse.y * 0.3, 5),
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main component
export default function Background3D({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <CameraRig />
        <fog attach="fog" args={[isDark ? '#0f172a' : '#FFFEF0', 5, 20]} />
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
