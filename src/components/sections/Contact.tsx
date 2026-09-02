'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Github, Linkedin, MessageCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { VisitorCounter } from '@/components/ui/VisitorCounter';
import confetti from 'canvas-confetti';
import {
  trackContactAction,
  trackContactFormStart,
  trackGenerateLead,
  trackContactFormError,
} from '@/lib/analytics';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you! Your message has been received ✨');
        setForm({ name: '', email: '', message: '' });

        // Track successful lead generation in GA4
        trackGenerateLead('contact_section_form', true);

        // Trigger celebratory confetti
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ff4d88', '#e8a598', '#ffd6e7', '#f6d0ba'],
        });

        setTimeout(() => {
          setStatus('idle');
        }, 6000);
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again or reach out directly.');
        trackContactFormError('contact_section_form', 'submission_failure');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send. Please email me directly at ' + personalInfo.contact.email);
      trackContactFormError('contact_section_form', 'network_error');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold mb-3"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-rose-50 mb-3"
          >
            Let&apos;s create{' '}
            <span className="gradient-text-rose italic font-serif">
              together
            </span>
          </motion.h2>
          <p className="text-neutral-600 dark:text-rose-200/70 text-sm sm:text-base max-w-md">
            I&apos;m always open to creative collaborations, internships and meaningful conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Reach-out Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between gap-8"
          >
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <a
                href={`mailto:${personalInfo.contact.email}`}
                onClick={() => trackContactAction('email', 'contact_card', 'mailto')}
                className="p-5 sm:p-6 rounded-2xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/70 dark:bg-noir-850/70 shadow-md hover:shadow-lg hover:border-rose-400/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-100/80 dark:bg-noir-750/80 text-rose-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                    EMAIL
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-rose-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {personalInfo.contact.email}
                  </p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={personalInfo.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactAction('whatsapp', 'contact_card', 'whatsapp_link')}
                className="p-5 sm:p-6 rounded-2xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/70 dark:bg-noir-850/70 shadow-md hover:shadow-lg hover:border-rose-400/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-100/80 dark:bg-noir-750/80 text-rose-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                    WHATSAPP & PHONE
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-rose-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {personalInfo.contact.phone}
                  </p>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/70 dark:bg-noir-850/70 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-100/80 dark:bg-noir-750/80 text-rose-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                    LOCATION
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-rose-100">
                    {personalInfo.contact.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons & Visitor Counter */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  onClick={() => trackContactAction('github', 'contact_socials', 'external_profile')}
                  className="w-11 h-11 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 flex items-center justify-center text-neutral-700 dark:text-rose-200 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500 transition-all hover:scale-110 shadow-sm"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  onClick={() => trackContactAction('linkedin', 'contact_socials', 'external_profile')}
                  className="w-11 h-11 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 flex items-center justify-center text-neutral-700 dark:text-rose-200 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500 transition-all hover:scale-110 shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href={personalInfo.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Chat"
                  onClick={() => trackContactAction('whatsapp', 'contact_socials', 'direct_chat')}
                  className="w-11 h-11 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 flex items-center justify-center text-neutral-700 dark:text-rose-200 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500 transition-all hover:scale-110 shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              <div>
                <VisitorCounter />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Supabase Powered Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl glass-panel border border-rose-200/50 dark:border-rose-900/40 bg-white/80 dark:bg-noir-850/80 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-rose-50 mb-1">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-rose-200/70">
                  Fill out the details below and I will get back to you promptly.
                </p>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-rose-200/80"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onFocus={() => trackContactFormStart('contact_section_form')}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-3.5 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 bg-white/50 dark:bg-noir-900/50 text-neutral-900 dark:text-rose-100 placeholder:text-neutral-400 dark:placeholder:text-rose-300/30 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-rose-200/80"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onFocus={() => trackContactFormStart('contact_section_form')}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 bg-white/50 dark:bg-noir-900/50 text-neutral-900 dark:text-rose-100 placeholder:text-neutral-400 dark:placeholder:text-rose-300/30 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-rose-200/80"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onFocus={() => trackContactFormStart('contact_section_form')}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or collaboration..."
                  className="w-full px-4 py-3.5 rounded-xl glass-panel border border-rose-200/60 dark:border-rose-800/60 bg-white/50 dark:bg-noir-900/50 text-neutral-900 dark:text-rose-100 placeholder:text-neutral-400 dark:placeholder:text-rose-300/30 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
                />
              </div>

              {/* Status Notice */}
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    status === 'success'
                      ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-400/40'
                      : 'bg-red-500/15 text-red-700 dark:text-red-300 border border-red-400/40'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  ) : null}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 via-rose-600 to-gold-rosegold hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message ✨</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
