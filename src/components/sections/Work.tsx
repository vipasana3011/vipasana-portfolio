'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsList } from '@/data/portfolioData';
import { ProjectCard3D } from '@/components/ui/ProjectCard3D';
import { trackProjectCategoryFilter } from '@/lib/analytics';

export function Work() {
  const [filter, setFilter] = useState<'all' | 'web' | 'smm'>('all');

  const filteredProjects =
    filter === 'all'
      ? projectsList
      : projectsList.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 mb-4"
          >
            Projects with{' '}
            <span className="gradient-text-rose italic font-serif">
              heart
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-rose-200/70 text-sm sm:text-base max-w-lg"
          >
            A curated showcase across social media and web development.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {[
            { label: 'All Projects', value: 'all' },
            { label: 'Web Development', value: 'web' },
            { label: 'Social Media', value: 'smm' },
          ].map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => {
                  setFilter(tab.value as any);
                  trackProjectCategoryFilter(tab.value);
                }}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-600 dark:text-rose-200/80 hover:text-rose-600 dark:hover:text-rose-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full -z-10 shadow-md shadow-rose-500/25"
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
