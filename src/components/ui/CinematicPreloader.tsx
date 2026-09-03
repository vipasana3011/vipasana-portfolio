'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

const CinematicPreloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      )
      .to(contentRef.current, {
        scale: 1.05,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.6,
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-4">
        {/* Minimal Red Indicator Dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />

        {/* Minimal Typography */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.25em] text-white font-display">
          VIPASANA
        </h1>

        <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">
          DIGITAL MEDIA SPECIALIST & DEVELOPER
        </span>
      </div>
    </div>
  );
};

export default CinematicPreloader;
