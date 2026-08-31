'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingCard3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatOffset?: number;
  floatDuration?: number;
  onClick?: () => void;
}

export function FloatingCard3D({
  children,
  className = '',
  delay = 0,
  floatOffset = 7,
  floatDuration = 5,
  onClick,
}: FloatingCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setRotateX(-normY * 9);
    setRotateY(normX * 9);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      {/* Continuous Gentle Floating Levitation */}
      <motion.div
        animate={{
          y: isHovered ? -4 : [0, -floatOffset, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: floatDuration,
            ease: 'easeInOut',
            delay: delay * 0.4,
          },
        }}
        className="w-full h-full"
      >
        {/* Subtle Glowing Gradient Border Container (1.5px fine light edge) */}
        <motion.div
          ref={cardRef}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX,
            rotateY,
            scale: isHovered ? 1.025 : 1,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          style={{ transformStyle: 'preserve-3d' }}
          className={`relative rounded-3xl p-[1.5px] bg-gradient-to-br from-rose-400/45 via-gold-rosegold/35 to-rose-400/15 dark:from-rose-500/40 dark:via-gold-rosegold-dark/30 dark:to-rose-900/20 hover:from-rose-500/80 hover:via-gold-rosegold/70 hover:to-rose-400/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-rose-500/20 cursor-default ${
            onClick ? 'cursor-pointer' : ''
          }`}
        >
          {/* Inner Frosted Glass Body */}
          <div
            className={`relative rounded-[calc(1.5rem-1.5px)] bg-white/80 dark:bg-noir-850/85 backdrop-blur-xl p-7 sm:p-8 overflow-hidden h-full flex flex-col justify-between ${className}`}
          >
            {/* Dynamic Specular Glare Sheen following cursor */}
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[calc(1.5rem-1.5px)]"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), transparent 75%)`,
              }}
            />

            {/* 3D Extruded Content Layer */}
            <div style={{ transform: 'translateZ(24px)' }} className="relative z-10 w-full">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
