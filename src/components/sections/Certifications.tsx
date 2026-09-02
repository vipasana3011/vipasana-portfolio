'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, CheckCircle, Sparkles } from 'lucide-react';
import { certificationsList, personalInfo } from '@/data/portfolioData';
import { Certification } from '@/types';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { FloatingCard3D } from '@/components/ui/FloatingCard3D';
import { trackCertificateClick } from '@/lib/analytics';

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            Certifications
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 mb-3"
          >
            Credentials &{' '}
            <span className="gradient-text-rose italic font-serif">
              milestones
            </span>
          </motion.h2>
          <p className="text-neutral-600 dark:text-rose-200/70 text-sm sm:text-base max-w-md">
            Click any certificate card below to view the official verified document.
          </p>
        </div>

        {/* 3D Glowing Gradient Border Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {certificationsList.map((cert, idx) => (
            <FloatingCard3D
              key={cert.id}
              delay={idx * 0.1}
              floatOffset={5 + (idx % 3) * 3}
              floatDuration={5 + (idx % 2)}
              onClick={() => {
                setSelectedCert(cert);
                trackCertificateClick(cert.title, cert.issuer, cert.year, 'certifications_grid');
              }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100/90 dark:bg-noir-750/90 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-rose-500" />
                    {cert.issuer} · {cert.year}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-rose-50 mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-rose-200/75 leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Click to View Action Prompt */}
              <div className="pt-4 border-t border-rose-100/70 dark:border-noir-750 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  View Certificate
                </span>
                <span className="transform transition-transform group-hover:translate-x-1">↗</span>
              </div>
            </FloatingCard3D>
          ))}
        </div>

        {/* Impact Counters & Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {personalInfo.stats.map((stat, idx) => (
            <FloatingCard3D
              key={stat.label}
              delay={idx * 0.12}
              floatOffset={4}
              floatDuration={6}
              className="text-center flex flex-col items-center justify-center py-8"
            >
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-rose-600 dark:text-rose-400 mb-2 font-mono">
                {stat.value}
                <span className="text-rose-400 dark:text-rose-300">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-rose-200/80">
                {stat.label}
              </p>
            </FloatingCard3D>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Certificate Document */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
