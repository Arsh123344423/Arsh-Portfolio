'use client';

import type { JSX, RefObject, MutableRefObject } from 'react';

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
    { top: '22%', left: '6%' },
    { top: '22%', right: '6%' },
    { bottom: '18%', left: '5%' },
    { bottom: '18%', right: '5%' },
  ];

  return (
    <section className="pf-hero" onMouseMove={onMouseMove}>
      <div className="pf-hero-grid" aria-hidden />
      <div ref={spotlightRef} className="pf-hero-spotlight" aria-hidden />

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

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
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
          <a href="#work" className="pf-btn pf-btn-solid">View Work</a>
          <a href="#contact" className="pf-btn pf-btn-ghost">Let's Connect</a>
        </div>
      </div>

      <div className="pf-hero-meta mono">
        <div className="pf-scroll-cue">
          <span className="pf-scroll-chevron" aria-hidden>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Scroll
        </div>
        <div className="pf-scroll-cue" style={{ textAlign: 'right' }}>{location}</div>
      </div>
    </section>
  );
}
