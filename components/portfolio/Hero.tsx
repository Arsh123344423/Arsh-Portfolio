'use client';

import type { JSX, RefObject, MutableRefObject } from 'react';
import { OrbBackground } from './OrbBackground';
import { HeroChat } from './HeroChat';

/* ────────────────────────── Hero ────────────────────────── */

interface HeroProps {
  heroLines: string[];
  heroSub: string;
  location: string;
  disciplines: string[];
  spotlightRef: RefObject<HTMLDivElement | null>;
  heroLineRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
  heroSubRef: RefObject<HTMLParagraphElement | null>;
  heroActionsRef: RefObject<HTMLDivElement | null>;
  disciplineRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Hero({
  heroLines,
  heroSub,
  location,
  disciplines,
  spotlightRef,
  heroLineRefs,
  heroSubRef,
  heroActionsRef,
  disciplineRefs,
  onMouseMove,
}: HeroProps): JSX.Element {
  const positions = [
    { top: '15%', left: '4%' },
    { top: '15%', right: '4%' },
    { bottom: '12%', left: '4%' },
    { bottom: '12%', right: '4%' },
  ];

  return (
    <section id="hero" className="pf-hero pf-hero-interactive" onMouseMove={onMouseMove}>
      {/* 3D Organic Orb Canvas in Background */}
      <OrbBackground />

      {/* Grid overlay & subtle cursor spotlight */}
      <div className="pf-hero-grid" aria-hidden />
      <div ref={spotlightRef} className="pf-hero-spotlight" aria-hidden />

      {/* Floating discipline badges */}
      {disciplines.map((label, i) => (
        <div
          key={label}
          className="pf-discipline mono"
          style={positions[i % positions.length]}
          ref={(el) => { disciplineRefs.current[i] = el; }}
        >
          <span className="pip" />
          <span className="lbl">{label}</span>
        </div>
      ))}

      <div className="wrap pf-hero-content-wrap">
        {/* Top Hero Branding Header */}
        <div className="pf-hero-header-block">
          <div className="pf-hero-eyebrow mono">
            <span className="pip" />
            <span>INTERACTIVE PORTFOLIO & AI COPILOT</span>
          </div>

          <h1 className="serif">
            {heroLines.map((line, i) => (
              <span className="pf-line" key={i}>
                <span ref={(el) => { heroLineRefs.current[i] = el; }}>
                  {i === heroLines.length - 1 ? (
                    <>
                      {line.split(' ').slice(0, -1).join(' ')}{' '}
                      <em>{line.split(' ').slice(-1)}</em>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p ref={heroSubRef} className="pf-hero-sub">{heroSub}</p>

          <div ref={heroActionsRef} className="pf-hero-actions mono">
            <a href="#about" className="pf-btn pf-btn-solid">About Arsh</a>
            <a href="#work" className="pf-btn pf-btn-ghost">View Projects</a>
            <a href="#contact" className="pf-btn pf-btn-ghost">Contact</a>
          </div>
        </div>

        {/* Central Glassmorphic Chatbot Interface over the 3D Orb */}
        <div className="pf-hero-chat-wrapper">
          <HeroChat />
        </div>
      </div>

      {/* Scroll metadata cue at bottom */}
      <div className="pf-hero-meta mono">
        <a href="#about" className="pf-scroll-cue">
          <span className="pf-scroll-chevron" aria-hidden>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Scroll Down
        </a>
        <div className="pf-scroll-cue" style={{ textAlign: 'right' }}>{location}</div>
      </div>
    </section>
  );
}
