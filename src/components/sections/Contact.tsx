'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Globe } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Contact = () => {
  const ref = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.permission) {
      alert('Please check the permission box to proceed.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        permission: false,
      });
    }, 4000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none"
    >
      {/* Background Cinematic Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Huge Background Parallax Watermark Text with generous letter spacing */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-[0.14em] select-none scale-y-[1.6] origin-top font-display">
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-[#141414]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[92%] lg:w-[86%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Internal Top Crimson Highlight Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-[0.16em] text-red-500 w-fit font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span>CONTACT ME // GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-white/40 tracking-[0.14em]">
              // READY TO BUILD YOUR NEXT BIG DIGITAL PROJECT
            </span>
          </div>

          {/* Direct Communication Channels Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 pb-8 border-b border-white/10">
            <a
              href={personalInfo.contact.website || 'https://vipasana.me/'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-red-600/30 hover:border-red-600 hover:bg-white/[0.06] transition-all flex items-center gap-3 group/link shadow-[0_0_15px_rgba(229,9,20,0.1)] hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]"
            >
              <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-600/40 group-hover/link:bg-red-600 group-hover/link:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                  <span>Website</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-xs font-black text-white truncate group-hover/link:text-red-400 transition-colors">
                  vipasana.me
                </div>
              </div>
            </a>

            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.06] transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Email</div>
                <div className="text-xs font-bold text-white truncate">{personalInfo.contact.email}</div>
              </div>
            </a>

            <a
              href={`tel:${personalInfo.contact.phone}`}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.06] transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Phone</div>
                <div className="text-xs font-bold text-white">{personalInfo.contact.phone}</div>
              </div>
            </a>

            <a
              href={personalInfo.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.06] transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">WhatsApp</div>
                <div className="text-xs font-bold text-white">Direct Message</div>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Location</div>
                <div className="text-xs font-bold text-white">India &bull; Remote</div>
              </div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-12 rounded-2xl bg-red-600/10 border border-red-600/40 text-center space-y-3 animate-fadeIn my-6">
              <CheckCircle2 className="w-10 h-10 text-red-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-white font-display tracking-[0.08em]">MESSAGE TRANSMITTED</h3>
              <p className="text-sm text-white/70 max-w-md mx-auto">
                Thank you, {formData.firstName}! Your message has been received. Vipasana will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-14 w-full">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-8">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-base md:text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-base md:text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-base md:text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col">
                  <div className="relative h-full flex flex-col">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message, project idea, or collaboration proposal here..."
                      required
                      className="w-full h-full min-h-[160px] bg-transparent border-b border-white/20 pb-3 text-base md:text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium resize-none rounded-none text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-white/10 items-start md:items-center justify-between">
                {/* Checkbox */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-light text-white/70">
                  <input
                    type="checkbox"
                    id="permission"
                    checked={formData.permission}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-white/30 bg-transparent text-red-600 focus:ring-0 cursor-pointer"
                    style={{ accentColor: '#E50914' }}
                  />
                  <label htmlFor="permission" className="cursor-pointer leading-snug">
                    I agree to be contacted at this email address for project inquiries.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-[0.14em] text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <span>Transmit Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
