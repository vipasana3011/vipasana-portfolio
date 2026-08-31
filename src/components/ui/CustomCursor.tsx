'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(0, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 30 });
  const glowX = useSpring(0, { stiffness: 200, damping: 25 });
  const glowY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.closest('.glass-card') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', handleHoverStart);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleHoverStart);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, glowX, glowY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Soft Ambient Cursor Halo Glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none opacity-40 blur-xl transition-colors duration-300"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 120 : 70,
          height: isHovered ? 120 : 70,
          background: 'radial-gradient(circle, rgba(255, 77, 136, 0.4) 0%, rgba(232, 165, 152, 0.2) 60%, transparent 80%)',
        }}
      />

      {/* Outer Magnetic Ring */}
      <motion.div
        className="absolute rounded-full border border-rose-400/60 dark:border-rose-400/80 pointer-events-none transition-[width,height,background-color] duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : isClicking ? 20 : 32,
          height: isHovered ? 48 : isClicking ? 20 : 32,
          backgroundColor: isHovered ? 'rgba(255, 77, 136, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(255, 77, 136, 0.3)' : 'none',
        }}
      />

      {/* Center Core Pip */}
      <motion.div
        className="absolute rounded-full pointer-events-none bg-rose-500"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          boxShadow: '0 0 8px #ff2e83',
        }}
      />
    </div>
  );
}
