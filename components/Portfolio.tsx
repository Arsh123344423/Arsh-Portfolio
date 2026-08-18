'use client';

import { useEffect, useRef, useState, useCallback, type JSX } from 'react';

import { DEFAULT_DATA } from './portfolio/data';
import type { PortfolioProps } from './portfolio/types';

import { PortfolioStyles } from './portfolio/styles';
import { usePortfolioAnimations } from './portfolio/usePortfolioAnimations';

import { Nav } from './portfolio/Nav';
import { Hero } from './portfolio/Hero';
import { Marquee } from './portfolio/Marquee';
import { About } from './portfolio/About';
import { Capabilities } from './portfolio/Capabilities';
import { Work } from './portfolio/Work';
import { ProofStrip } from './portfolio/ProofStrip';
import { Cta } from './portfolio/Cta';
import { Footer } from './portfolio/Footer';

/**
 * Portfolio — single-page, editorial-styled personal portfolio.
 *
 * This file is the thin orchestrator: it merges data, wires refs, and
 * assembles the section components in order. All logic lives in
 * `usePortfolioAnimations`; all markup in the individual section files
 * under `components/portfolio/`.
 */
export default function Portfolio({ data }: PortfolioProps): JSX.Element {
  const d = { ...DEFAULT_DATA, ...data };

  const [scrolled, setScrolled] = useState(false);

  /* ── Refs ── */
  const cursorRef        = useRef<HTMLDivElement>(null);
  const spotlightRef     = useRef<HTMLDivElement>(null);
  const heroLineRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const heroSubRef       = useRef<HTMLParagraphElement>(null);
  const heroActionsRef   = useRef<HTMLDivElement>(null);
  const disciplineRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const revealRefs       = useRef<HTMLElement[]>([]);
  const proofGridRef     = useRef<HTMLDivElement>(null);
  const proofValueRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  /** Registers an element for the scroll-reveal IntersectionObserver. */
  const registerReveal = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  /* ── Scroll listener for nav chrome ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Hero spotlight follows the cursor within the hero bounds ── */
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--sx', `${x}%`);
    el.style.setProperty('--sy', `${y}%`);
  }, []);

  /* ── All anime.js animations ── */
  usePortfolioAnimations({
    heroLineRefs,
    heroSubRef,
    heroActionsRef,
    disciplineRefs,
    revealRefs,
    proofGridRef,
    proofValueRefs,
    cursorRef,
    stats: d.stats,
  });

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <PortfolioStyles />
      <div ref={cursorRef} className="pf-cursor" aria-hidden />

      <Nav name={d.name} navLinks={d.navLinks} scrolled={scrolled} />

      <Hero
        heroLines={d.heroLines}
        heroSub={d.heroSub}
        location={d.location}
        disciplines={d.disciplines}
        spotlightRef={spotlightRef}
        heroLineRefs={heroLineRefs}
        heroSubRef={heroSubRef}
        heroActionsRef={heroActionsRef}
        disciplineRefs={disciplineRefs}
        onMouseMove={handleHeroMouseMove}
      />

      <Marquee marqueeWords={d.marqueeWords} />

      <About
        about={d.about}
        name={d.name}
        role={d.role}
        registerReveal={registerReveal}
      />

      <Capabilities
        capabilities={d.capabilities}
        registerReveal={registerReveal}
      />

      <Work
        work={d.work}
        registerReveal={registerReveal}
      />

      <ProofStrip
        stats={d.stats}
        proofGridRef={proofGridRef}
        proofValueRefs={proofValueRefs}
        registerReveal={registerReveal}
      />

      <Cta email={d.email} />

      <Footer name={d.name} socials={d.socials} />
    </div>
  );
}