'use client';

import { useEffect } from 'react';
import { trackSectionView, trackScrollMilestone } from '@/lib/analytics';

const SECTIONS = [
  { id: 'hero', name: 'home' },
  { id: 'about', name: 'about' },
  { id: 'education', name: 'education' },
  { id: 'work', name: 'work' },
  { id: 'experience', name: 'experience' },
  { id: 'skills', name: 'skills' },
  { id: 'certifications', name: 'certificates' },
  { id: 'contact', name: 'contact' },
];

export function SectionTracker() {
  useEffect(() => {
    // 1. Setup IntersectionObserver for Section View Tracking
    const observedElements: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionConfig = SECTIONS.find((s) => s.id === entry.target.id);
            if (sectionConfig) {
              trackSectionView(sectionConfig.name);
            }
          }
        });
      },
      {
        threshold: 0.25, // When 25% of section is visible
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedElements.push(el);
      }
    });

    // 2. Setup Scroll Depth Milestones (25%, 50%, 75%, 90%)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = (scrollY / docHeight) * 100;
      if (percent >= 90) {
        trackScrollMilestone(90);
      } else if (percent >= 75) {
        trackScrollMilestone(75);
      } else if (percent >= 50) {
        trackScrollMilestone(50);
      } else if (percent >= 25) {
        trackScrollMilestone(25);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
