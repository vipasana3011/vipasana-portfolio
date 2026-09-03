'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { personalInfo, educationList } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Cinematic Stagger Entrance on Scroll
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Interactive Mouse Spotlight per Bento Card
    const cards = cardRefs.current;
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const listeners: Array<{ card: HTMLDivElement; fn: (e: MouseEvent) => void }> = [];

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e: MouseEvent) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      listeners.push({ card, fn: listener });
    });

    return () => {
      listeners.forEach(({ card, fn }) => {
        card.removeEventListener('mousemove', fn);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden border-t border-white/5"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-14">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold tracking-wider">ABOUT ME</span>
            <span className="text-white/40">|</span>
            <span className="tracking-wider">BACKGROUND & PASSION</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.06em] md:tracking-[0.08em] text-white font-display uppercase leading-tight">
            BACKGROUND & VISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              CREATIVE PHILOSOPHY.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Bio & Academic Background (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-red-500 font-bold">
                Background & Profile
              </h3>
              <p className="text-lg md:text-xl font-medium text-white/95 leading-relaxed tracking-normal">
                I am <span className="text-white font-bold drop-shadow">{personalInfo.name}</span>, a passionate{' '}
                <span className="text-red-400 font-semibold">{personalInfo.roleBadge}</span> dedicated to blending creativity with modern technology.
              </p>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {personalInfo.about.paragraphs[1]}
              </p>

              {/* Education Highlights */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono text-white/50 uppercase tracking-[0.14em] block">
                  // Academic Foundations
                </span>
                {educationList.map((edu) => (
                  <div key={edu.id} className="text-xs bg-white/5 p-3.5 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center font-semibold text-white tracking-wide">
                      <span>{edu.degree}</span>
                      <span className="text-red-400 font-mono text-[11px] tracking-wider">{edu.period}</span>
                    </div>
                    <p className="text-white/60 text-[11px] mt-1">{edu.institution} &bull; {edu.badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 tracking-wider">
                Digital Media
              </span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 tracking-wider">
                Web Development
              </span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 tracking-wider">
                Social Media Growth
              </span>
            </div>
          </div>

          {/* Card 2: Strategic Pillars & Stats (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-6 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-red-500 font-bold">
                Pillars of Execution
              </h3>
              <div className="space-y-4">
                {personalInfo.about.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/40 transition-colors flex items-start gap-3.5"
                  >
                    <span className="text-xl shrink-0 mt-0.5">{pillar.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{pillar.title}</h4>
                      <p className="text-xs text-white/60 font-light mt-0.5">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Creator Seal */}
              <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-mono text-[11px] tracking-wide">
                  Verified Digital Creator &bull; 10+ Delivered Works
                </span>
              </div>
            </div>

            <div className="pt-6 font-mono text-xs text-white/40 tracking-widest relative z-10">
              // CAREER HIGHLIGHTS &bull; 10+ DELIVERED PROJECTS
            </div>
          </div>

          {/* Card 3: Production Tech Stack & Tools (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-600/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="space-y-2 text-left relative z-10 max-w-md">
              <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-red-500 font-bold">
                Production Tech & Creative Suite
              </h3>
              <p className="text-base md:text-lg font-semibold text-white tracking-normal">
                Modern tools curated for dynamic websites and impactful digital campaigns.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 relative z-10 max-w-2xl">
              {[
                'Next.js',
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Supabase',
                'Canva Pro',
                'Meta Suite',
                'SEO',
                'Vercel',
                'Netlify',
                'Git & GitHub',
                'Shopify',
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.1em] text-white shadow-inner hover:bg-red-600/20 hover:border-red-600/40 hover:scale-105 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
