'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { projectsList } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const folderBackRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'smm'>('all');
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const filteredProjects = projectsList.filter((project) => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.offsetWidth * 0.85;
    const scrollPos = el.scrollLeft;
    const newIdx = Math.round(scrollPos / cardWidth);
    if (newIdx >= 0 && newIdx < filteredProjects.length && newIdx !== activeMobileIdx) {
      setActiveMobileIdx(newIdx);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial origins centered in viewport for desktop
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      });
      if (folderFrontRef.current) {
        gsap.set(folderFrontRef.current, { transformOrigin: 'bottom center' });
      }

      const getGridPos = (index: number) => {
        // 3-column layout
        const row = Math.floor(index / 3);
        const col = index % 3;
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      const mm = gsap.matchMedia();

      // DESKTOP: Authentic Netflix Opening Vault & 3D Grid (100% UNTOUCHED)
      mm.add('(min-width: 768px)', () => {
        let floatTween: gsap.core.Tween | undefined;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => floatTween?.kill(),
            onEnterBack: () => floatTween?.kill(),
            onLeave: () => floatTween?.kill(),
            onLeaveBack: () => floatTween?.kill(),
          },
          onComplete: () => {
            const validCards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
            floatTween = gsap.to(validCards, {
              y: '+=12',
              rotation: '+=1',
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              stagger: { amount: 1.5, from: 'random' },
            });
          },
        });

        // 1. Folder flap opens
        tl.to(folderFrontRef.current, {
          rotationX: -130,
          duration: 1.2,
          ease: 'power3.inOut',
        });

        // 2. Cards rise up collectively
        const validCards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
        tl.to(
          validCards,
          {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: 'back.out(1.2)',
          },
          '-=0.6'
        );

        // 3. Cards fan out into a clean grid
        tl.to(
          validCards,
          {
            x: (i) => {
              const w = 360;
              const gap = 36;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = 250;
              const gap = 36;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-2.5, 2.5),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: 'center' },
            ease: 'expo.out',
          },
          '-=0.2'
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[220vh] relative font-sans overflow-x-clip text-white w-full flex flex-col items-center justify-start py-20 md:py-36 select-none border-t border-white/5"
    >
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-[0.14em] leading-none whitespace-nowrap uppercase font-display">
          PROJECTS
        </h1>
      </div>

      {/* Ambient Crimson Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Section Header & Filter Controls - Normal Natural Flow */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center space-y-3 md:space-y-4 mb-4 md:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-red-500 font-bold tracking-wider">FEATURED WORKS</span>
          <span className="text-white/40">|</span>
          <span className="tracking-wider">SELECTED PROJECTS</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-[0.06em] md:tracking-[0.08em] leading-tight font-display uppercase">
          FEATURED RELEASES &bull;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
            PROJECT VAULT
          </span>
        </h2>

        <p className="text-white/60 text-xs md:text-sm font-light max-w-xl px-2">
          Explore real-world web applications and social media growth campaigns.
        </p>

        {/* Filter Pills - Horizontal Scroll on Mobile if needed */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto max-w-full scrollbar-hide py-1">
          {(
            [
              { id: 'all', label: 'All Releases (10)' },
              { id: 'web', label: 'Web Development (8)' },
              { id: 'smm', label: 'Social Media (2)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveMobileIdx(0);
                if (mobileCarouselRef.current) {
                  mobileCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-3.5 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.6)] scale-105'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW: 3D Animated Vault & Opening Folder Grid (HIDDEN ON MOBILE) */}
      {/* ========================================================================= */}
      <div className="hidden md:flex mt-16 md:mt-24 relative w-full max-w-7xl h-full items-center justify-center perspective-[2000px] z-10 flex-1">
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          {/* Projects Cover Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.3)] flex items-center justify-center overflow-hidden"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />

            {/* Folder Cover Image Montage Preview */}
            <div className="absolute inset-1.5 rounded-[20px] overflow-hidden bg-black/90 p-4 flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-red-500 font-black bg-red-600/15 px-2.5 py-0.5 rounded border border-red-600/30">
                  FEATURED RELEASES
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
                  10 PROJECTS
                </span>
              </div>

              {/* Cover Preview Screenshots Row */}
              <div className="grid grid-cols-3 gap-2 my-auto z-10">
                {projectsList.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="relative aspect-video rounded-lg overflow-hidden border border-white/20 shadow-md group"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="120px"
                      className="object-cover object-top filter brightness-90 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1 left-1 text-[8px] font-mono font-bold text-white tracking-wider line-clamp-1">
                      {p.title.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cover Page Footer */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-[0.14em] z-10 border-t border-white/10 pt-2">
                <span>// PROJECT VAULT</span>
                <span className="text-red-400 font-bold flex items-center gap-1">
                  SCROLL TO EXPLORE &#8250;
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Project Cards with Cover Images and Clean Tags */}
          {projectsList.map((project, i) => {
            const isMatchFilter = activeTab === 'all' || project.category === activeTab;
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`hidden md:block absolute w-[80vw] md:w-[32vw] max-w-[360px] aspect-[16/10] will-change-transform transition-opacity duration-300 ${
                  isMatchFilter ? 'opacity-100' : 'opacity-20 pointer-events-none'
                }`}
                style={{ zIndex: 10 + i }}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden border border-white/20 bg-[#121214] shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-500 group hover:scale-[1.05] hover:border-red-600 hover:shadow-[0_25px_60px_rgba(229,9,20,0.45)] hover:-translate-y-2 relative z-10 flex flex-col justify-between">
                  {/* Vibrant Cover Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="360px"
                      className="object-cover object-top filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 via-45% to-black/20" />
                  </div>

                  {/* Top Badges */}
                  <div className="flex items-center justify-between relative z-10 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-black tracking-[0.16em] uppercase text-white bg-red-600 px-2.5 py-0.5 rounded shadow-lg">
                        {project.indexNum || `#0${i + 1}`}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                      <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">
                        {project.match || '99%'} Match
                      </span>
                      <span className="text-[9px] font-mono border border-white/40 px-1 text-white/80 rounded">
                        HD
                      </span>
                    </div>
                  </div>

                  {/* Center Hover Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Title & Information */}
                  <div className="relative z-10 p-4 pt-0 space-y-1.5">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-red-400 font-bold drop-shadow">
                        {project.tag}
                      </div>
                      <h3 className="text-lg font-black text-white tracking-wide group-hover:text-red-400 transition-colors line-clamp-1 drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-white/80 font-light leading-snug line-clamp-2 mt-0.5 drop-shadow">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Pills & Launch Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/15">
                      <div className="flex flex-wrap gap-1 max-w-[210px]">
                        {project.technologies.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-mono text-white/85 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/15"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1 rounded bg-white hover:bg-red-600 text-black hover:text-white font-mono text-[10px] font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
                        title="View Live Project"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Launch
                      </a>
                    </div>
                  </div>

                  {/* Crimson Corner Accent */}
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-red-600 group-hover:shadow-[0_0_12px_#E50914] transition-all" />
                </div>
              </div>
            );
          })}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-gradient-to-t from-[#141414] to-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-10px_30px_rgba(0,0,0,0.9)] flex flex-col justify-between p-5 border-t border-red-600/50">
              <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-[0.16em] text-white uppercase">
                    PROJECT VAULT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-red-500 tracking-widest font-bold">VIPASANA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW: Dedicated, Fluid, Responsive Touch Carousel (MOBILE-ONLY)   */}
      {/* ========================================================================= */}
      <div className="md:hidden relative z-20 w-full mt-4 px-4 flex flex-col items-center">
        {/* Mobile Swipe Status Bar */}
        <div className="flex items-center justify-between w-full max-w-[340px] px-1 mb-2 text-[10px] font-mono text-white/50">
          <span className="text-red-500 font-bold uppercase tracking-wider">
            {filteredProjects.length} RELEASES
          </span>
          <span className="text-white/40 tracking-wider">
            [ 0{activeMobileIdx + 1} / 0{filteredProjects.length} ] &bull; SWIPE &rarr;
          </span>
        </div>

        {/* Swipeable Cards Row with Snap Alignment */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="w-full flex items-center gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-[6vw] touch-pan-x"
        >
          {filteredProjects.map((project, i) => (
            <div
              key={`mob-${project.id}`}
              className="shrink-0 w-[84vw] max-w-[340px] aspect-[16/11] snap-center relative rounded-2xl overflow-hidden border border-white/20 bg-[#121214] shadow-[0_15px_35px_rgba(0,0,0,0.95)] flex flex-col justify-between p-4"
            >
              {/* Full-bleed Cover Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="340px"
                  priority={i < 2}
                  className="object-cover object-top filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/85 via-50% to-black/20" />
              </div>

              {/* Mobile Card Top Row */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black tracking-[0.16em] text-white bg-red-600 px-2 py-0.5 rounded shadow">
                    {project.indexNum || `#0${i + 1}`}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-white/20">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {project.match || '99%'} Match
                  </span>
                  <span className="text-[9px] font-mono text-white/70 border border-white/30 px-1 rounded">
                    HD
                  </span>
                </div>
              </div>

              {/* Mobile Card Bottom Row */}
              <div className="relative z-10 space-y-1">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-red-400 font-bold drop-shadow">
                    {project.tag}
                  </div>
                  <h3 className="text-base font-black text-white line-clamp-1 tracking-wide drop-shadow">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-white/75 font-light line-clamp-2 leading-snug drop-shadow">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {project.technologies.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono text-white/85 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1 rounded bg-white text-black font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-md active:scale-95 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Launch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {filteredProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveMobileIdx(idx);
                if (mobileCarouselRef.current) {
                  const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85;
                  mobileCarouselRef.current.scrollTo({
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
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
