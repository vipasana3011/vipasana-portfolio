import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Work />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
