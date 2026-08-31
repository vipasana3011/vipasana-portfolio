'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const techTags = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'TypeScript',
  'Tailwind CSS', 'Supabase', 'Git & GitHub', 'Content Strategy',
  'Social Media', 'Analytics', 'Canva Pro', 'Shopify', 'Meta Suite', 'Vercel'
];

interface TagSphereProps {
  radius?: number;
}

function TagCluster({ radius = 2.4 }: TagSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fibonacci sphere distribution for harmonious 3D placement
  const points = useMemo(() => {
    const items = [];
    const count = techTags.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      items.push({
        position: new THREE.Vector3(x * radius, y * radius, z * radius),
        label: techTags[i],
      });
    }
    return items;
  }, [radius]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Slow continuous orbit rotation if not hovering a specific tag
    const speed = hoveredIndex !== null ? 0.05 : 0.2;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x += delta * (speed * 0.3);
  });

  return (
    <group ref={groupRef}>
      {points.map((pt, i) => (
        <group key={pt.label} position={pt.position}>
          <Html center distanceFactor={7}>
            <div
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 select-none shadow-md backdrop-blur-md ${
                hoveredIndex === i
                  ? 'bg-rose-500 text-white scale-125 shadow-rose-glow border border-rose-300'
                  : 'bg-white/70 dark:bg-noir-850/80 text-rose-700 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/60 hover:scale-110'
              }`}
            >
              {pt.label}
            </div>
          </Html>
        </group>
      ))}

      {/* Central Ambient Core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#ff4d88"
          emissive="#e8a598"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Particle dust */}
      <Sparkles count={50} scale={5} size={2} color="#f6d0ba" opacity={0.6} />
    </group>
  );
}

export function Skills3DOrbit() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#ffd6e7" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#ff4d88" />
        
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
          <TagCluster />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
