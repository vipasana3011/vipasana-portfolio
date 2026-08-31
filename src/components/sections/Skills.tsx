'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Code, Megaphone, Wrench, Sparkles } from 'lucide-react';
import { skillCategories } from '@/data/portfolioData';

// Dynamically import Three.js interactive 3D skill orbit
const Skills3DOrbit = dynamic(
  () => import('@/components/3d/Skills3DOrbit').then((mod) => mod.Skills3DOrbit),
  { ssr: false }
);

export function Skills() {
  const iconMap: Record<string, React.ReactNode> = {
    '💻': <Code className="w-5 h-5 text-rose-500" />,
    '📈': <Megaphone className="w-5 h-5 text-rose-500" />,
    '✨': <Wrench className="w-5 h-5 text-rose-500" />,
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 mb-3"
          >
            Toolbox &{' '}
            <span className="gradient-text-rose italic font-serif">
              craft
            </span>
          </motion.h2>
          <p className="text-neutral-600 dark:text-rose-200/70 text-sm sm:text-base max-w-md">
            Interactive 3D constellation & categorized mastery.
          </p>
        </div>

        {/* 3D Interactive Tag Orbit Canvas */}
        <div className="mb-14 p-4 rounded-3xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/40 dark:bg-noir-900/40 shadow-xl overflow-hidden relative">
          <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Interactive 3D Sphere · Drag to rotate</span>
          </div>
          <Skills3DOrbit />
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-7 sm:p-8 rounded-3xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/70 dark:bg-noir-850/70 shadow-lg hover:shadow-xl hover:border-rose-400/60 transition-all flex flex-col"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-100/80 dark:bg-noir-750/80 border border-rose-200/60 dark:border-rose-800/60 flex-shrink-0">
                  {iconMap[category.icon] || <Sparkles className="w-5 h-5 text-rose-500" />}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-rose-50">
                  {category.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50/90 dark:bg-noir-800/90 text-rose-800 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/60 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500 transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
