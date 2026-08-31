'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshTransmissionMaterial,
  Sphere,
  Torus,
  Icosahedron,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

function LuxuryGlassSculpture() {
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const orbitalRing1Ref = useRef<THREE.Mesh>(null);
  const orbitalRing2Ref = useRef<THREE.Mesh>(null);
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Responsive smooth mouse parallax with damping
    const mouseX = state.mouse.x * 0.7;
    const mouseY = state.mouse.y * 0.7;

    targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, mouseX, 0.045);
    targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, mouseY, 0.045);

    // Subtle gentle movement of outer glass
    if (outerGlassRef.current) {
      outerGlassRef.current.position.x = targetPos.current.x * 0.35;
      outerGlassRef.current.position.y = targetPos.current.y * 0.35;
      outerGlassRef.current.rotation.x = time * 0.12 + targetPos.current.y * 0.25;
      outerGlassRef.current.rotation.y = time * 0.15 + targetPos.current.x * 0.25;
    }

    // Inner glowing rose-gold core pulsing rotation
    if (innerCoreRef.current) {
      innerCoreRef.current.position.x = targetPos.current.x * 0.2;
      innerCoreRef.current.position.y = targetPos.current.y * 0.2;
      innerCoreRef.current.rotation.x = -time * 0.2;
      innerCoreRef.current.rotation.y = time * 0.25;
      const scale = 0.85 + Math.sin(time * 1.5) * 0.04;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    // Polished 18k Rose Gold Orbital Rings
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.x = 1.1 + time * 0.18;
      orbitalRing1Ref.current.rotation.y = time * 0.22 + targetPos.current.x * 0.3;
      orbitalRing1Ref.current.rotation.z = time * 0.08;
    }

    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.x = -0.8 + time * 0.14;
      orbitalRing2Ref.current.rotation.y = -time * 0.19 + targetPos.current.y * 0.3;
      orbitalRing2Ref.current.rotation.z = time * 0.12;
    }
  });

  return (
    <group>
      {/* Floating High-Class Frosted Glass Orb with Refraction */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <Sphere ref={outerGlassRef} args={[1.4, 64, 64]} scale={1.15}>
          <MeshTransmissionMaterial
            backside={false}
            samples={10}
            resolution={512}
            transmission={0.94}
            roughness={0.12} // Satin frosted glass finish
            ior={1.48} // Real optical glass refraction index
            thickness={1.6}
            chromaticAberration={0.05} // Subtle luxury dispersion of light at the rim
            anisotropy={0.2}
            distortion={0.3}
            distortionScale={0.25}
            temporalDistortion={0.08}
            color="#fff0f6" // Ethereal crystal tint
            attenuationColor="#ff4d88" // Internal glowing rose absorption
            attenuationDistance={1.4}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </Sphere>
      </Float>

      {/* Internal Luminous Rose-Gold Caustic Core */}
      <Icosahedron ref={innerCoreRef} args={[0.75, 2]}>
        <meshStandardMaterial
          color="#ff85a2"
          emissive="#ff2e83"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.6}
          wireframe={false}
          transparent
          opacity={0.7}
        />
      </Icosahedron>

      {/* Polished 18k Rose Gold Luxury Orbital Ring 1 */}
      <Torus ref={orbitalRing1Ref} args={[1.95, 0.018, 24, 128]}>
        <meshStandardMaterial
          color="#f6d0ba"
          emissive="#e8a598"
          emissiveIntensity={0.3}
          metalness={0.95} // High-polished liquid gold reflection
          roughness={0.08}
          envMapIntensity={1.5}
        />
      </Torus>

      {/* Polished 18k Rose Gold Luxury Orbital Ring 2 */}
      <Torus ref={orbitalRing2Ref} args={[2.2, 0.014, 24, 128]}>
        <meshStandardMaterial
          color="#ffd6e7"
          emissive="#ff85a2"
          emissiveIntensity={0.25}
          metalness={0.92}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </Torus>

      {/* Floating Shimmer & Champagne Stardust Particles */}
      <Sparkles
        count={55}
        scale={6}
        size={2.2}
        speed={0.3}
        color="#f6d0ba"
        opacity={0.85}
      />
      <Sparkles
        count={45}
        scale={7}
        size={2.8}
        speed={0.35}
        color="#ff94be"
        opacity={0.75}
      />
    </group>
  );
}

export function HeroFluidBlob() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] flex items-center justify-center pointer-events-auto select-none">
      {/* Soft Luminous Backlight Diffusion (Very Light & Ethereal) */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-300/25 via-gold-rosegold/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* Studio Lighting Setup for High-End Glass & Metal */}
        <ambientLight intensity={1.4} color="#fff8fa" />
        
        {/* Key Overhead Light */}
        <directionalLight position={[5, 6, 4]} intensity={2.8} color="#ffffff" />
        
        {/* Soft Rose Fill Light */}
        <directionalLight position={[-5, -4, -2]} intensity={1.6} color="#ffe0eb" />
        
        {/* Rim Specular Lights for Glass Edge Sparkle */}
        <pointLight position={[-3, 3, 2.5]} intensity={3.2} color="#ff4d88" distance={10} />
        <pointLight position={[3, -2.5, 3]} intensity={2.6} color="#f6d0ba" distance={10} />
        <pointLight position={[0, 4, -2]} intensity={2.0} color="#ffd6e7" distance={8} />

        <LuxuryGlassSculpture />
      </Canvas>
    </div>
  );
}
