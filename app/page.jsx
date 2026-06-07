'use client';

import { useEffect, useState, useCallback } from 'react';
import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import LogoSection from '@/components/LogoSection';
import { StrictMode } from 'react';
import './home/index.css';

export default function LandingPage() {
  const [dismissed, setDismissed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const dismiss = useCallback(() => {
    if (dismissed) return;
    setDismissed(true);
    // After the white screen finishes sliding up (700ms), fade in content
    setTimeout(() => setRevealed(true), 750);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Lock scroll while white screen is showing
    document.body.style.overflow = 'hidden';

    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) dismiss();
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      if (delta > 30) dismiss();
    };

    // Keyboard support (arrow down, space, page down)
    const onKeyDown = (e) => {
      if (['ArrowDown', 'Space', 'PageDown'].includes(e.code)) {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dismissed, dismiss]);

  // Unlock scroll after reveal and ensure we're at the top
  useEffect(() => {
    if (revealed) {
      window.scrollTo(0, 0);
      document.body.style.overflow = '';
    }
  }, [revealed]);

  return (
    <StrictMode>
      <main className="w-full bg-black">
        {/* White overlay — slides up on first scroll */}
        <div
          className="fixed inset-0 z-50 bg-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col items-center justify-center"
          style={{
            transform: dismissed ? 'translateY(-100%)' : 'translateY(0)',
            pointerEvents: dismissed ? 'none' : 'auto',
          }}
        >
          {/* Centered title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Arsh&apos;s Portfolio
          </h1>

          {/* Scroll hint at the bottom */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
            <span
              className="text-sm text-black/50 uppercase tracking-widest font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Scroll down
            </span>
            <svg
              className="w-5 h-5 text-black/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Portfolio content — fades in after white screen leaves */}
        <div
          className="transition-opacity duration-700 ease-out"
          style={{ opacity: revealed ? 1 : 0 }}
        >
          <div className="relative z-0 flex flex-col gap-4 w-full overflow-x-hidden pt-[2%]">
            <HeroSection />
            <MarqueeSection />
            <div className="flex flex-col gap-20 px-6 md:px-10 w-full mx-auto">
              <AboutSection />
              <ServicesSection />
              <LogoSection />
              <ProjectsSection />
            </div>
          </div>
        </div>
      </main>
    </StrictMode>
  );
}
