'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileDown, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl md:text-3xl font-black text-red-600 tracking-[0.08em] flex items-center gap-1.5 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)] hover:scale-105 transition-transform font-display shrink-0"
        >
          VIPASANA
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </Link>

        {/* Desktop Navigation Links with clean, comfortable gap spacing */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-xs font-mono uppercase tracking-[0.14em] text-white/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-red-500 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={personalInfo.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-[0.12em] transition-all duration-300 border border-white/20 flex items-center gap-2 hover:scale-105"
          >
            <FileDown className="w-3.5 h-3.5 text-red-500" />
            Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-red-500 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-[0.14em] text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-500 transition-colors py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col sm:hidden gap-3 pt-2">
            <a
              href={personalInfo.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded bg-white/10 text-white text-center font-bold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 border border-white/20"
            >
              <FileDown className="w-4 h-4 text-red-500" />
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded bg-red-600 text-white text-center font-bold text-xs uppercase tracking-[0.12em]"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
