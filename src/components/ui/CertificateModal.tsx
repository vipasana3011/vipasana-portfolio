'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Award, ExternalLink } from 'lucide-react';
import { Certification } from '@/types';

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

const CertificateModal = ({ certification, onClose }: CertificateModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certification) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certification, onClose]);

  if (!certification) return null;

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-2xl bg-[#141414] border border-red-600/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(229,9,20,0.3)] animate-scaleUp">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#1c1c1c]">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-[0.16em] font-bold">
            <Award className="w-4 h-4 text-red-500" />
            <span>{certification.badge || 'VERIFIED CREDENTIAL'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image Viewport */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black">
          <Image
            src={certification.image}
            alt={certification.title}
            fill
            className="object-contain p-2"
            priority
          />
        </div>

        {/* Footer Details */}
        <div className="p-6 space-y-2 bg-[#141414] border-t border-white/10">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-black text-white tracking-wide">{certification.title}</h3>
              <p className="text-sm text-red-400 font-mono font-medium tracking-wider">
                {certification.issuer} &bull; {certification.year}
              </p>
            </div>
            <a
              href={certification.image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-white/10 hover:bg-red-600 text-white text-xs font-mono font-bold tracking-[0.14em] flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Full View
            </a>
          </div>
          <p className="text-xs text-white/70 font-light leading-relaxed pt-1">
            {certification.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
