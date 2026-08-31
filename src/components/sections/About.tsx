'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Code, Share2 } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export function About() {
  const iconMap: Record<string, React.ReactNode> = {
    '🎨': <Palette className="w-7 h-7 text-rose-500" />,
    '💻': <Code className="w-7 h-7 text-rose-500" />,
    '📱': <Share2 className="w-7 h-7 text-rose-500" />,
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            About
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 max-w-2xl"
          >
            The story{' '}
            <span className="gradient-text-rose italic font-serif">
              behind the work
            </span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Narrative Story (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="p-[1.5px] rounded-3xl bg-gradient-to-br from-rose-400/45 via-gold-rosegold/35 to-rose-400/15 dark:from-rose-500/40 dark:via-gold-rosegold-dark/30 dark:to-rose-900/20 shadow-xl">
              <div className="p-8 sm:p-10 rounded-[calc(1.5rem-1.5px)] bg-white/80 dark:bg-noir-850/85 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 dark:bg-rose-500/10 rounded-bl-full pointer-events-none" />
                
                <p className="text-base sm:text-lg text-neutral-700 dark:text-rose-100/90 leading-relaxed mb-6 font-normal">
                  {personalInfo.about.paragraphs[0]}
                </p>

                <p className="text-base sm:text-lg text-neutral-600 dark:text-rose-200/80 leading-relaxed">
                  {personalInfo.about.paragraphs[1]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3 Feature Glass Cards (Right Side) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {personalInfo.about.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.02, x: 6 }}
                className="p-[1.5px] rounded-2xl bg-gradient-to-br from-rose-400/40 via-gold-rosegold/30 to-rose-400/15 hover:from-rose-500/70 hover:via-gold-rosegold/60 hover:to-rose-400/40 transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <div className="p-6 sm:p-7 rounded-[calc(1rem-1.5px)] bg-white/80 dark:bg-noir-850/85 backdrop-blur-xl flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-100/80 dark:bg-noir-750/80 border border-rose-200/60 dark:border-rose-800/60 shadow-inner group-hover:scale-110 transition-transform flex-shrink-0">
                    {iconMap[pillar.icon] || <Sparkles className="w-7 h-7 text-rose-500" />}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-rose-50 mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-rose-200/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
