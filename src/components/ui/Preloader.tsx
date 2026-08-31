'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#fff8fa] dark:bg-[#0b0609] overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient Orbs */}
          <div className="absolute w-96 h-96 rounded-full bg-rose-400/15 dark:bg-rose-500/10 blur-3xl animate-pulse-slow" />

          {/* Central Luxury Monogram & Ring */}
          <div className="relative flex items-center justify-center">
            {/* Spinning Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-rose-300/60 dark:border-rose-700/60"
            />
            {/* Inner Glowing Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-t-rose-500 border-r-gold-rosegold border-b-transparent border-l-transparent"
            />

            {/* Monogram 'V' */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
              }}
              className="absolute font-serif italic text-6xl sm:text-7xl font-bold bg-gradient-to-r from-rose-500 via-gold-rosegold to-rose-400 bg-clip-text text-transparent select-none drop-shadow-sm"
            >
              V
            </motion.span>
          </div>

          {/* Brand Name & Loading Bar */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <h2 className="font-serif tracking-[0.3em] uppercase text-xs sm:text-sm text-neutral-800 dark:text-rose-100 font-medium">
              Vipasana · Luxury Portfolio
            </h2>

            {/* Progress line */}
            <div className="w-48 sm:w-60 h-[2px] bg-rose-200/40 dark:bg-noir-700/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-gold-rosegold"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percent */}
            <span className="font-mono text-xs text-rose-500/80 dark:text-rose-400/80 tracking-wider">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
