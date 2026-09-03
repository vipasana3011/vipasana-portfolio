'use client';

import { useState } from 'react';
import { Award, Eye, FileCheck } from 'lucide-react';
import { certificationsList } from '@/data/portfolioData';
import CertificateModal from '@/components/ui/CertificateModal';
import { Certification } from '@/types';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section
      id="certifications"
      className="relative w-full bg-[#050505] text-white py-28 px-6 md:px-12 select-none overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Crimson Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold tracking-wider">CREDENTIALS</span>
            <span className="text-white/40">|</span>
            <span className="tracking-wider">CERTIFICATIONS & AWARDS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-[0.06em] md:tracking-[0.08em] leading-tight font-display uppercase">
            HONORS & CREDENTIALS &bull;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              VERIFIED RECOGNITION
            </span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm font-light max-w-lg">
            Certified technical competencies, security training, and design challenge recognitions. Click any card to inspect the full certificate.
          </p>
        </div>

        {/* Certifications Grid - Preview Images Removed from Card Face (Only on click modal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsList.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl hover:border-red-600/60 transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(229,9,20,0.2)] overflow-hidden"
            >
              {/* Subtle Top Crimson Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/40 group-hover:via-red-600 to-transparent transition-all duration-500" />

              <div className="space-y-4">
                {/* Top Badge & Issuer Row */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-red-600/10 border border-red-600/30 text-red-500 font-mono text-[10px] font-bold tracking-[0.16em] uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-red-500" />
                    {cert.badge}
                  </span>
                  <span className="text-xs font-mono text-white/50 tracking-wider font-semibold">
                    {cert.year}
                  </span>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors tracking-wide leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-red-400 font-semibold tracking-wider flex items-center gap-1.5 pt-0.5">
                    <FileCheck className="w-3.5 h-3.5 text-red-400" />
                    {cert.issuer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Action: Click to view certificate in modal */}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 tracking-wider">// VERIFIED CREDENTIAL</span>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 group-hover:bg-red-600 text-white font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Resolution Certificate Modal (Displays on click) */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

export default Certifications;
