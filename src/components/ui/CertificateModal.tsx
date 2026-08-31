'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Sparkles } from 'lucide-react';
import { Certification } from '@/types';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Glass Backdrop with click-outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden glass-panel border border-rose-300/60 dark:border-rose-700/60 bg-white/95 dark:bg-noir-900/95 shadow-2xl"
          >
            {/* Glowing Accent Top Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-gold-rosegold to-rose-400" />

            {/* Header Bar */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-rose-100 dark:border-noir-750">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-100 dark:bg-noir-800 text-rose-500 border border-rose-200 dark:border-rose-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 dark:text-rose-50">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                    <span>{cert.issuer}</span>
                    <span>·</span>
                    <span>{cert.year}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close certificate preview"
                className="p-2.5 rounded-full hover:bg-rose-100 dark:hover:bg-noir-750 text-neutral-600 dark:text-rose-300 transition-all hover:scale-105 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Image Frame */}
            <div className="relative w-full aspect-[4/3] bg-neutral-950 flex items-center justify-center p-3 sm:p-5">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Description & Action Footer */}
            <div className="p-5 sm:p-6 bg-rose-50/60 dark:bg-noir-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-rose-200/80 leading-relaxed max-w-md">
                {cert.description}
              </p>

              <a
                href={cert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-md shadow-rose-500/25 transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                <span>Open Full Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
