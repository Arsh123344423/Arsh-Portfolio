'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

/* ── Social Links ──────────────────────────────────────────── */
const socials = [
  {
    label: 'GitHub',
    handle: '@Arsh123344423',
    href: 'https://github.com/Arsh123344423/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'Arsh Srivastava',
    href: 'https://www.linkedin.com/in/arshsrivastava72235a300/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    handle: '@ArshSri01642844',
    href: 'https://x.com/ArshSri01642844',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

/* ── Page Component ────────────────────────────────────────── */
export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Manage loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // show "Opening Contact me" for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.main
      className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden relative"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          /* ── Loading Screen ── */
          <motion.div
            key="loading"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-[100]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-5 h-5 border-2 h-full border-[#ff003c] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono uppercase tracking-[0.2em] text-sm text-white/80">
                Opening Contact Me
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Actual Contact Content ── */
          <motion.div 
            key="content"
            className="absolute inset-0 flex h-full flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Ambient background ── */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '80px 80px',
                }}
              />
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,0,60,0.07) 0%, transparent 70%)',
                  top: '-15%', left: '-10%', filter: 'blur(80px)',
                }}
                animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
                  bottom: '-10%', right: '-5%', filter: 'blur(80px)',
                }}
                animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* ── Back button ── */}
            <div
              className="fixed top-6 left-6 z-50 animate-fade-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <button
                onClick={() => router.push('/')}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#ff003c]/40 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#ff003c] transition-all duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-mono text-xs uppercase tracking-widest text-white/60 group-hover:text-white/90 transition-colors duration-300">
                  Back
                </span>
              </button>
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 h-screen overflow-y-auto">
              <div className="flex flex-col items-center justify-center min-h-screen w-full py-20">
                {/* Tagline */}
                <p
                  className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#ff003c]/70 mb-4 sm:mb-5 animate-slide-in-up"
                  style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
                >
                  Get in touch
                </p>

                {/* Big headline */}
                <h1
                  className="font-black uppercase text-center leading-[0.85] tracking-tight mb-6 sm:mb-8 animate-slide-in-up"
                  style={{ fontSize: 'clamp(2.8rem, 9vw, 110px)', animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  Let&apos;s build
                  <br />
                  <span className="bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
                    something great.
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className="text-white/40 font-light text-center max-w-lg mb-10 sm:mb-14 animate-slide-in-up"
                  style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', animationDelay: '0.35s', animationFillMode: 'both' }}
                >
                  Have an idea, a project, or just want to say hello?
                  <br className="hidden sm:block" />
                  Drop me a line — I&apos;d love to hear from you.
                </p>

                {/* Email CTA */}
                <a
                  href="mailto:arshsrivastava00@gmail.com"
                  className="group relative mb-14 sm:mb-16 animate-slide-in-up"
                  style={{ animationDelay: '0.45s', animationFillMode: 'both' }}
                >
                  <div className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-full border border-[#ff003c]/30 bg-[#ff003c]/[0.06] overflow-hidden transition-all duration-400 group-hover:border-[#ff003c]/60 group-hover:bg-[#ff003c]/[0.1] group-hover:shadow-[0_0_40px_rgba(255,0,60,0.15)]">
                    {/* Shimmer sweep */}
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,0,60,0.12), transparent)',
                      }}
                    />
                    <span className="relative flex items-center gap-3 font-mono text-sm sm:text-base tracking-wide">
                      <svg className="w-5 h-5 text-[#ff003c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                        arshsrivastava00@gmail.com
                      </span>
                      <svg className="w-4 h-4 text-white/30 group-hover:text-[#ff003c] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </a>

                {/* Social cards row */}
                <div
                  className="flex flex-wrap justify-center gap-4 sm:gap-5 animate-slide-in-up"
                  style={{ animationDelay: '0.55s', animationFillMode: 'both' }}
                >
                  {socials.map((social, i) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center gap-3 w-[140px] sm:w-[160px] py-6 sm:py-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:-translate-y-1"
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 0%, rgba(255,0,60,0.08) 0%, transparent 70%)',
                        }}
                      />
                      <span className="relative text-white/35 group-hover:text-[#ff003c] transition-colors duration-300">
                        {social.icon}
                      </span>
                      <div className="relative flex flex-col items-center gap-0.5">
                        <span className="font-medium text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                          {social.label}
                        </span>
                        <span className="font-mono text-[10px] text-white/25 group-hover:text-white/40 transition-colors duration-300 truncate max-w-[120px]">
                          {social.handle}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer strip ── */}
            <div
              className="relative z-10 pb-6 flex items-center gap-4 px-6 sm:px-10 animate-fade-in"
              style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
                  Available for work
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
