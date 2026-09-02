'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Mail, Sparkles, Code2, Palette } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { MagneticButton } from '@/components/ui/MagneticButton';
import confetti from 'canvas-confetti';
import { trackNavigationClick, trackCvDownload } from '@/lib/analytics';

// Dynamically import Three.js Hero Glass Sculpture with SSR disabled
const HeroFluidBlob = dynamic(
  () => import('@/components/3d/HeroFluidBlob').then((mod) => mod.HeroFluidBlob),
  { ssr: false }
);

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentRole.length) {
        timer = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const handleDownloadCV = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d88', '#e8a598', '#ffd6e7', '#f6d0ba', '#ff2e83'],
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-20">
            {/* Top Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full p-[1.5px] bg-gradient-to-r from-rose-400/50 via-gold-rosegold/40 to-rose-400/20 shadow-xs mb-6"
            >
              <div className="px-3 py-1 rounded-full bg-white/85 dark:bg-noir-850/85 backdrop-blur-md flex items-center gap-2 text-rose-600 dark:text-rose-300 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>{personalInfo.roleBadge}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 leading-[1.08] mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text-rose italic font-serif font-bold">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Dynamic Typewriter Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-700 dark:text-rose-200/90 mb-6 min-h-[42px]"
            >
              <span className="text-neutral-500 dark:text-rose-300/60 font-serif italic">
                I&apos;m a
              </span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                {text}
              </span>
              <span className="typing-caret" />
            </motion.div>

            {/* Hero Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-600 dark:text-rose-100/80 max-w-xl leading-relaxed mb-8"
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Explore Work Button */}
              <MagneticButton strength={0.25}>
                <a
                  href="#work"
                  onClick={() => trackNavigationClick('work', 'Explore My Work', 'hero')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/30 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>

              {/* Download CV Button */}
              <MagneticButton strength={0.25}>
                <a
                  href={personalInfo.contact.resumeUrl}
                  download="VIPASANA_RESUME.pdf"
                  onClick={() => {
                    handleDownloadCV();
                    trackCvDownload('VIPASANA_RESUME.pdf', 'hero', 'Download CV');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider p-[1.5px] bg-gradient-to-br from-rose-400/50 via-gold-rosegold/40 to-rose-400/20 hover:from-rose-500 hover:to-gold-rosegold transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <div className="px-5 py-3 rounded-full bg-white/80 dark:bg-noir-850/80 backdrop-blur-md flex items-center gap-2 text-rose-600 dark:text-rose-300 font-bold">
                    <FileDown className="w-4 h-4 text-rose-500" />
                    <span>Download CV</span>
                  </div>
                </a>
              </MagneticButton>

              {/* Contact Me Button */}
              <MagneticButton strength={0.25}>
                <a
                  href="#contact"
                  onClick={() => trackNavigationClick('contact', 'Contact Me', 'hero')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider glass-panel border border-neutral-300/70 dark:border-noir-700/70 text-neutral-700 dark:text-rose-200 hover:border-rose-400 dark:hover:border-rose-500 transition-all hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 text-neutral-500 dark:text-rose-300" />
                  <span>Contact Me</span>
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Signature 3D Frosted Glass Sculpture & Floating Portrait */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Signature 3D Frosted Glass Sculpture */}
            <div className="absolute -inset-10 lg:-inset-16 z-0 flex items-center justify-center opacity-95">
              <HeroFluidBlob />
            </div>

            {/* Foreground Floating Portrait 3D Beveled Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-[270px] sm:w-[320px] aspect-[4/5] rounded-3xl p-[1.5px] bg-gradient-to-br from-rose-400/50 via-gold-rosegold/40 to-rose-400/20 dark:from-rose-500/40 dark:via-gold-rosegold-dark/30 dark:to-rose-900/20 shadow-2xl backdrop-blur-xl animate-float-slow group"
            >
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-[calc(1.5rem-1.5px)] p-2.5 bg-white/50 dark:bg-noir-900/60 backdrop-blur-md">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={personalInfo.contact.portrait}
                    alt={personalInfo.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 270px, 320px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Specular Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/15 via-transparent to-white/25 opacity-50 pointer-events-none" />
                </div>
              </div>

              {/* Floating Mini Badge 1: Creative Designer */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 z-20 px-3.5 py-2 rounded-2xl glass-panel border border-rose-300/70 dark:border-rose-700/70 bg-white/90 dark:bg-noir-850/90 shadow-xl flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-300"
              >
                <Palette className="w-3.5 h-3.5 text-rose-500" />
                <span>✨ Creative Designer</span>
              </motion.div>

              {/* Floating Mini Badge 2: Developer */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-6 z-20 px-3.5 py-2 rounded-2xl glass-panel border border-rose-300/70 dark:border-rose-700/70 bg-white/90 dark:bg-noir-850/90 shadow-xl flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-300"
              >
                <Code2 className="w-3.5 h-3.5 text-rose-500" />
                <span>💻 Developer</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
