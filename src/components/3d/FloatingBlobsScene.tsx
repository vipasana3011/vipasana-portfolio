'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function FloatingBlobsScene() {
  const { scrollY } = useScroll();
  
  // Parallax translation factors for smooth continuous flowing background
  const blob1Y = useTransform(scrollY, [0, 3000], [0, 450]);
  const blob2Y = useTransform(scrollY, [0, 3000], [0, -380]);
  const blob3Y = useTransform(scrollY, [0, 4000], [0, 600]);
  const blob4Y = useTransform(scrollY, [0, 4000], [0, -500]);
  const blob5Y = useTransform(scrollY, [0, 5000], [0, 750]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top Right Hero / About Flowing Liquid Ribbon */}
      <motion.div
        style={{ y: blob1Y }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 45, 90, 0],
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '40% 60% 70% 30% / 50% 60% 30% 60%',
            '70% 30% 50% 50% / 30% 50% 60% 40%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 -right-24 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-br from-rose-400/20 via-gold-rosegold/15 to-transparent blur-[90px] dark:from-rose-600/15 dark:via-rose-900/20"
      />

      {/* Mid Left About / Education Flowing Molten Orb */}
      <motion.div
        style={{ y: blob2Y }}
        animate={{
          scale: [0.95, 1.1, 1, 0.95],
          rotate: [0, -60, -120, 0],
          borderRadius: [
            '50% 50% 70% 30% / 30% 40% 60% 70%',
            '70% 30% 50% 50% / 60% 30% 70% 40%',
            '40% 60% 30% 70% / 50% 60% 40% 50%',
            '50% 50% 70% 30% / 30% 40% 60% 70%',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 26,
          ease: 'easeInOut',
        }}
        className="absolute top-[35%] -left-36 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-gold-rosegold/20 via-rose-300/15 to-transparent blur-[100px] dark:from-rose-500/10 dark:via-gold-rosegold-dark/15"
      />

      {/* Mid Right Projects Flowing Liquid Accent */}
      <motion.div
        style={{ y: blob3Y }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 90, 180, 0],
          borderRadius: [
            '60% 40% 60% 40% / 40% 60% 40% 60%',
            '30% 70% 70% 30% / 50% 40% 60% 50%',
            '60% 40% 30% 70% / 40% 60% 50% 50%',
            '60% 40% 60% 40% / 40% 60% 40% 60%',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'easeInOut',
        }}
        className="absolute top-[60%] -right-32 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] bg-gradient-to-bl from-rose-500/15 via-gold-rosegold-light/20 to-transparent blur-[95px] dark:from-rose-600/10 dark:via-rose-950/20"
      />

      {/* Bottom Center Experience & Contact Warm Rose Glow */}
      <motion.div
        style={{ y: blob4Y }}
        animate={{
          scale: [0.9, 1.15, 1, 0.9],
          borderRadius: [
            '45% 55% 70% 30% / 35% 45% 55% 65%',
            '65% 35% 45% 55% / 55% 65% 35% 45%',
            '45% 55% 70% 30% / 35% 45% 55% 65%',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-[20%] w-[500px] sm:w-[700px] h-[350px] bg-gradient-to-r from-rose-400/15 via-gold-rosegold/15 to-transparent blur-[110px] dark:from-rose-500/10 dark:via-gold-rosegold/10"
      />

      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
