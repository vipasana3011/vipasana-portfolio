'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle, FileText } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
          <div className="space-y-2">
            <Link
              href="#home"
              className="text-2xl md:text-3xl font-black text-red-600 tracking-[0.08em] flex items-center gap-1.5 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)] font-display"
            >
              VIPASANA<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </Link>
            <p className="text-xs font-mono text-white/50 tracking-[0.16em] uppercase">
              DIGITAL MEDIA SPECIALIST &bull; WEB DEVELOPER &bull; 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-[0.14em] text-white/70">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#experience" className="hover:text-red-500 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-red-500 transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Social Icon Buttons & Location */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Social Icons instead of text */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/15 text-white/80 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/15 text-white/80 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/15 text-white/80 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm"
              title="Send Email"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/15 text-white/80 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm"
              title="WhatsApp Message"
              aria-label="WhatsApp Message"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/15 text-white/80 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm flex items-center gap-2"
              title="Download Resume PDF"
              aria-label="Download Resume PDF"
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">CV</span>
            </a>
          </div>

          <div className="text-white/50 tracking-[0.16em] uppercase font-mono text-[11px]">
            LOCATION: INDIA &bull; OPEN TO REMOTE WORK
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-[0.16em]">
          <p>&copy; {new Date().getFullYear()} Vipasana. All Rights Reserved.</p>
          <p className="text-red-500/80">DESIGNED &bull; DEVELOPED &bull; DELIVERED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
