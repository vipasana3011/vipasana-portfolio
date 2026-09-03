'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 769) return;
    const container = e.currentTarget;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    setActiveMobileIdx(activeIdx);

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          scale: i === activeIdx ? 1 : 0.92,
          opacity: i === activeIdx ? 1 : 0.6,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    });

    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: 3D Cylindrical Arc Carousel (100% UNTOUCHED)
      mm.add('(min-width: 769px)', () => {
        const updateCards = (p: number) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;

            const radius = 1800;
            const angleSpread = 18;

            const angle = offset * angleSpread;
            const rad = (angle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;
            const y = radius - Math.cos(rad) * radius;
            const z = -Math.abs(offset) * 50;

            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle;

            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity,
              zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
            gsap.set(bg, { opacity: itemOpacity });

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], { opacity: itemOpacity });
            }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          },
        });
      });

      // MOBILE: Fluid Natural Snapping Layout
      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.set(card, { clearProps: 'x,y,z,rotation,position' });
            gsap.set(card, { scale: i === 0 ? 1 : 0.92, opacity: i === 0 ? 1 : 0.6 });
          }
        });

        bgRefs.current.forEach((bg, i) => {
          if (bg) gsap.set(bg, { clearProps: 'all', opacity: i === 0 ? 1 : 0 });
        });

        textRefs.current.forEach((txt, i) => {
          if (txt) gsap.set(txt, { clearProps: 'all', opacity: i === 0 ? 1 : 0 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] md:h-screen bg-[#0b0b0b] text-white overflow-hidden flex flex-col items-center justify-center md:[perspective:1000px] select-none border-t border-white/5 py-20 md:py-0"
    >
      {/* Dynamic Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            bgRefs.current[i] = el;
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black transition-opacity duration-300"
        />
      ))}

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-[0.14em] mix-blend-overlay font-display select-none"
            style={{
              WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.35)' : 'rgba(255,255,255,0.15)'}`,
              opacity: 0,
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Mobile-Only Section Header */}
      <div className="md:hidden relative z-20 px-6 text-center mb-6 flex flex-col items-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[10px] font-mono uppercase tracking-widest text-white shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-red-500 font-bold tracking-wider">TECHNICAL CAPABILITIES</span>
          <span className="text-white/40">|</span>
          <span className="tracking-wider">6 DOMAINS</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-[0.06em] leading-tight font-display uppercase">
          SKILLS &bull;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700">
            EXPERTISE
          </span>
        </h2>
        <p className="text-white/60 text-xs font-light max-w-xs">
          Swipe horizontally to explore capabilities
        </p>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselContainerRef}
        className="relative w-full h-auto md:h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide items-center px-[8vw] md:px-0 gap-4 md:gap-0 touch-pan-x py-2"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div
            key={category.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="md:absolute relative shrink-0 snap-center w-[84vw] sm:w-[360px] md:w-[440px] h-[420px] md:h-[540px] rounded-[28px] md:rounded-[32px] p-6 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_25px_50px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >
            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20 flex items-center gap-1.5">
                <span>{category.icon}</span>
                <span>{category.tag}</span>
              </span>
              <span className="text-xs font-mono text-white/40 tracking-wider">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description with clean letter spacing */}
            <div className="space-y-3 md:space-y-4 relative z-10 my-auto">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-[0.06em] group-hover:text-red-500 transition-colors duration-300 font-display uppercase leading-tight">
                {category.title}
              </h3>
              <p className="text-xs md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 md:pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] md:text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 md:px-3 py-0.5 md:py-1 rounded group-hover:border-red-600/30 transition-colors tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>

      {/* Mobile-Only Pagination Indicator */}
      <div className="md:hidden relative z-20 flex items-center justify-center gap-1.5 mt-6">
        {skillCategories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (carouselContainerRef.current) {
                const cardWidth = carouselContainerRef.current.offsetWidth * 0.85;
                carouselContainerRef.current.scrollTo({
                  left: idx * cardWidth,
                  behavior: 'smooth',
                });
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeMobileIdx === idx
                ? 'w-6 bg-red-600 shadow-[0_0_10px_#E50914]'
                : 'w-1.5 bg-white/25 hover:bg-white/50'
            }`}
            aria-label={`Go to skill domain ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
