'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '@/types';
import { trackProjectClick } from '@/lib/analytics';

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

export function ProjectCard3D({ project, index }: ProjectCard3DProps) {
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

    setRotateX(-normY * 10);
    setRotateY(normX * 10);
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      {/* 3D Glowing Gradient Border Container */}
      <motion.div
        ref={cardRef}
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
        className="group relative h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-rose-400/45 via-gold-rosegold/35 to-rose-400/15 dark:from-rose-500/40 dark:via-gold-rosegold-dark/30 dark:to-rose-900/20 hover:from-rose-500/80 hover:via-gold-rosegold/70 hover:to-rose-400/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-rose-500/20 flex flex-col"
      >
        {/* Inner Card Frame */}
        <div className="relative flex flex-col flex-1 h-full rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-white/80 dark:bg-noir-850/85 backdrop-blur-xl">
          {/* Specular Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[calc(1.5rem-1.5px)]"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 300px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), transparent 75%)`,
            }}
          />

          {/* Thumbnail Image */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-rose-100/30 dark:bg-noir-900/50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Tag Badge */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/85 dark:bg-noir-900/85 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 shadow-sm">
                <Sparkles className="w-3 h-3 text-rose-500" />
                {project.tag}
              </span>
            </div>

            {/* External Link Button */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              onClick={() =>
                trackProjectClick(
                  project.title,
                  project.category === 'web' ? 'Web Development' : 'Social Media',
                  project.link,
                  'project_card_button'
                )
              }
              className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md bg-white/90 dark:bg-noir-900/90 text-rose-600 dark:text-rose-300 border border-rose-300/60 dark:border-rose-700/60 shadow-md hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-all transform group-hover:scale-110"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card Content Body (Extruded 3D layer) */}
          <div className="flex flex-col flex-1 p-5 sm:p-6" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-sm text-neutral-600 dark:text-rose-100/70 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}

            {/* Technologies Chips */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-rose-100/60 dark:border-noir-700/60">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-rose-50/80 dark:bg-noir-800/80 text-rose-700/90 dark:text-rose-300/90 border border-rose-200/40 dark:border-rose-900/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackProjectClick(
                    project.title,
                    project.category === 'web' ? 'Web Development' : 'Social Media',
                    project.link,
                    'project_card_link'
                  )
                }
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors group/link"
              >
                <span>Explore Live Project</span>
                <span className="transform transition-transform group-hover/link:translate-x-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
