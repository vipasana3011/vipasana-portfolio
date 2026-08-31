'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Building2, Sparkles } from 'lucide-react';
import { educationList } from '@/data/portfolioData';
import { FloatingCard3D } from '@/components/ui/FloatingCard3D';

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            Education
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 mb-3"
          >
            Where it all{' '}
            <span className="gradient-text-rose italic font-serif">
              began
            </span>
          </motion.h2>
          <p className="text-neutral-600 dark:text-rose-200/70 text-sm sm:text-base max-w-md">
            Interactive 3D timeline & academic milestones.
          </p>
        </div>

        {/* 3D Timeline Grid */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Central Luminous Connector Line */}
          <div className="absolute top-6 bottom-6 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-rose-400 via-gold-rosegold to-rose-400/20" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {educationList.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={edu.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 pl-12 sm:pl-0`}
                >
                  {/* Glowing 3D Timeline Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20 w-9 h-9 rounded-full bg-white dark:bg-noir-900 border-2 border-rose-500 flex items-center justify-center shadow-rose-glow group cursor-pointer hover:scale-125 transition-transform">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping opacity-75" />
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-rose-500" />
                  </div>

                  {/* 3D Interactive Floating & Tilting Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <FloatingCard3D
                      delay={idx * 0.15}
                      floatOffset={6 + idx * 3}
                      floatDuration={5 + idx}
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100/90 dark:bg-noir-750/90 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60">
                          <Calendar className="w-3 h-3 text-rose-500" />
                          {edu.period}
                        </span>

                        <span className="text-xs font-semibold text-neutral-500 dark:text-rose-300/70">
                          {edu.badge}
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-rose-50 mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <div className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-300/90 mb-4">
                        <Building2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span>{edu.institution}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-neutral-600 dark:text-rose-200/75 leading-relaxed">
                        {edu.description}
                      </p>
                    </FloatingCard3D>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
