'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-rose-200/50 dark:border-noir-800 relative z-10 bg-white/40 dark:bg-noir-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Monogram Brand */}
        <div className="flex items-center gap-2">
          <span className="font-serif italic font-bold text-2xl bg-gradient-to-r from-rose-500 to-gold-rosegold bg-clip-text text-transparent">
            V
          </span>
          <span className="font-serif font-bold text-lg text-neutral-800 dark:text-rose-100">
            {personalInfo.name}
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs sm:text-sm text-neutral-600 dark:text-rose-200/70 flex items-center gap-1.5 text-center">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            {personalInfo.name}
          </span>
          <span>· Designed & Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
        </div>

        {/* Back to Top Magnetic Button */}
        <MagneticButton strength={0.3}>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-rose-300/50 dark:border-rose-800/50 text-xs font-semibold text-neutral-700 dark:text-rose-200 hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-400 transition-all shadow-sm group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-rose-500" />
          </button>
        </MagneticButton>

      </div>
    </footer>
  );
}
