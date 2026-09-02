'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MagneticButton } from '@/components/ui/MagneticButton';
import confetti from 'canvas-confetti';
import { trackNavigationClick, trackCvDownload } from '@/lib/analytics';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }

      // Active section spy
      const sections = navItems.map((item) => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    // Trigger celebratory rose confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#ff4d88', '#e8a598', '#ffd6e7', '#f6d0ba'],
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-rose-500 via-gold-rosegold to-rose-400 z-[9995] transition-all duration-100 shadow-[0_0_10px_#ff4d88]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Navbar Container */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-[9990] px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto"
        >
          <Link
            href="#hero"
            onClick={() => trackNavigationClick('hero', 'Vipasana', 'navbar_logo')}
            className="flex items-center gap-2 group px-4 py-2 rounded-full glass-panel border border-rose-300/40 dark:border-rose-800/40 bg-white/70 dark:bg-noir-850/70 shadow-md backdrop-blur-xl"
          >
            <span className="font-serif font-bold text-2xl italic bg-gradient-to-r from-rose-500 to-gold-rosegold bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              V
            </span>
            <span className="font-serif text-lg font-bold tracking-tight text-neutral-900 dark:text-rose-50">
              ipasana
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav Links Island */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel border border-rose-200/50 dark:border-rose-800/40 bg-white/70 dark:bg-noir-850/70 shadow-lg backdrop-blur-xl pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => trackNavigationClick(item.name, item.name, 'navbar_desktop')}
                className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all rounded-full ${
                  isActive
                    ? 'text-rose-600 dark:text-rose-300'
                    : 'text-neutral-600 dark:text-rose-200/70 hover:text-rose-500 dark:hover:text-rose-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-rose-100/80 dark:bg-noir-750/90 rounded-full -z-10 border border-rose-300/40 dark:border-rose-700/50"
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </motion.nav>

        {/* Action Controls (Resume + Theme + Mobile Menu Button) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 pointer-events-auto"
        >
          {/* Quick Resume Download Button */}
          <MagneticButton strength={0.2}>
            <a
              href="/images/VIPA_RESUME.pdf"
              download="VIPASANA_RESUME.pdf"
              onClick={(e) => {
                handleResumeClick(e);
                trackCvDownload('VIPASANA_RESUME.pdf', 'navbar_desktop', 'Resume');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-md shadow-rose-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </MagneticButton>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2.5 rounded-full glass-panel border border-rose-300/40 dark:border-rose-700/40 text-neutral-800 dark:text-rose-200 hover:text-rose-500 transition-colors shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-[9985] p-6 rounded-3xl glass-panel border border-rose-300/50 dark:border-rose-800/50 bg-white/95 dark:bg-noir-900/95 shadow-2xl backdrop-blur-2xl lg:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    trackNavigationClick(item.name, item.name, 'navbar_mobile');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    activeSection === item.href.substring(1)
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 font-bold'
                      : 'text-neutral-700 dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-noir-800'
                  }`}
                >
                  <span>{item.name}</span>
                  {activeSection === item.href.substring(1) && (
                    <Sparkles className="w-4 h-4 text-rose-500" />
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-rose-200/50 dark:border-noir-700/50 flex flex-col gap-3">
              <a
                href="/images/VIPA_RESUME.pdf"
                download="VIPASANA_RESUME.pdf"
                onClick={(e) => {
                  handleResumeClick(e);
                  trackCvDownload('VIPASANA_RESUME.pdf', 'navbar_mobile', 'Download Resume CV');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-500 text-white shadow-md shadow-rose-500/20 text-center"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume CV</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
