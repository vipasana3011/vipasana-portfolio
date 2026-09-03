'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Play, Info, FileDown, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const rolesTicker = [
    'DIGITAL MEDIA SPECIALIST',
    'WEB DEVELOPER',
    'SOCIAL MEDIA MANAGER',
    'CREATIVE DESIGNER',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 }
    ).fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: 'back.out(1.2)' },
      '-=0.9'
    );

    // Mouse Physics & 3D Tilt
    const xTilt = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });
    const yTilt = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
    const glareX = gsap.quickTo(glareRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
    const glareY = gsap.quickTo(glareRef.current, 'y', { duration: 0.3, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      if (glareRef.current) {
        glareX(x - cardRect.left - cardRect.width / 2);
        glareY(y - cardRect.top - cardRect.height / 2);
      }
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none pt-24 pb-8"
    >
      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...rolesTicker, ...rolesTicker].map((role, idx) => (
              <span
                key={idx}
                className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-[0.1em] font-display"
              >
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mouse Tracking Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)',
        }}
      />

      {/* 3. Main Content Layer */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between py-6"
      >
        {/* Top Creator Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold tracking-widest">DIGITAL MEDIA & DEVELOPMENT</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">PORTFOLIO &bull; 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2.5 py-1 border border-white/20 rounded bg-black/40 text-white/80">
              BCA GRADUATE
            </span>
            <span className="px-2.5 py-1 border border-red-600/30 rounded bg-red-950/20 text-red-400">
              OPEN TO REMOTE WORK
            </span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 my-auto py-4">
          {/* Left Side: Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">
                TOP 1%
              </span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                {personalInfo.roleBadge}
              </span>
            </div>

            {/* Clean, generously spaced heading: no letter cramming */}
            <h1 className="hero-anim-item text-6xl md:text-8xl font-black tracking-[0.06em] md:tracking-[0.08em] text-white leading-[0.9] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] font-display uppercase">
              {personalInfo.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                DEV & MEDIA
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2.5 text-xs font-mono text-red-400 font-bold tracking-wider">
              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                100% Curiosity
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/90">Next.js • React • Supabase</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">SEO & Social Growth</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-lg drop-shadow">
              {personalInfo.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-[0.14em] rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                View Projects
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-[0.14em] rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Info className="w-4 h-4 text-red-500" />
                Contact Me
              </a>
              <a
                href={personalInfo.contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 font-bold text-xs uppercase tracking-[0.14em] rounded transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <FileDown className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Card */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Crimson Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />

              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                {/* Dynamic Specular Glare Layer */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none transform-gpu z-40"
                />

                {/* Featured Specialist Badge */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-white" />
                  CREATIVE SPECIALIST
                </div>

                <div className="relative w-full h-[340px] md:h-[400px] overflow-hidden rounded-xl">
                  <Image
                    src={personalInfo.contact.portrait}
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                    className="object-cover object-center filter contrast-110 brightness-105 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stats */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-red-500 font-bold">
                Career Highlights
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                {personalInfo.about.paragraphs[0]}
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                {personalInfo.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono tracking-wider">
                    <span className="text-white/60">{stat.label}</span>
                    <span className="text-red-500 font-black">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-[0.18em] uppercase pt-4 border-t border-white/5">
          <span>ENGINEERED FOR CREATIVITY & SCALE</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
