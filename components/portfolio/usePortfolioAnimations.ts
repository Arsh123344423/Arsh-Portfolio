'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { MutableRefObject } from 'react';
import type { Stat } from './types';

/* ────────────────────────── usePortfolioAnimations ────────────────────────── */

interface UsePortfolioAnimationsOptions {
  heroLineRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
  heroSubRef: React.RefObject<HTMLParagraphElement | null>;
  heroActionsRef: React.RefObject<HTMLDivElement | null>;
  disciplineRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  revealRefs: MutableRefObject<HTMLElement[]>;
  proofGridRef: React.RefObject<HTMLDivElement | null>;
  proofValueRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
  stats: Stat[];
}

/**
 * Encapsulates all anime.js / IntersectionObserver side-effects so Loader.tsx
 * stays declarative. Covers:
 *  - Hero load sequence (staggered headline lines, sub-copy, CTA, disciplines)
 *  - Scroll-triggered reveal for every section element registered via revealRefs
 *  - Proof-strip count-up (numbers tick from 0 once the grid enters view)
 *  - Custom tracking cursor (mix-blend-mode difference dot, fine-pointer only)
 */
export function usePortfolioAnimations({
  heroLineRefs,
  heroSubRef,
  heroActionsRef,
  disciplineRefs,
  revealRefs,
  proofGridRef,
  proofValueRefs,
  cursorRef,
  stats,
}: UsePortfolioAnimationsOptions) {

  /* ── Custom tracking cursor, page-wide ──
     mix-blend-mode: difference on a plain HTML element blends the dot's
     paper color against whatever's beneath it. Fine-pointer devices only;
     falls back to instant (non-lerped) follow under prefers-reduced-motion. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let visible = false;

    const showCursor = () => { if (visible) return; visible = true; cursor.style.opacity = '1'; };
    const hideCursor = () => { visible = false; cursor.style.opacity = '0'; };

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; showCursor(); };

    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      cursor.classList.toggle('pf-cursor--active', Boolean(target?.closest('a, button, [role="button"]')));
    };

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.2;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOverInteractive, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.body.classList.add('pf-cursor-enabled');
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOverInteractive);
      document.removeEventListener('mouseleave', hideCursor);
      document.body.classList.remove('pf-cursor-enabled');
      cancelAnimationFrame(rafId);
    };
  }, [cursorRef]);

  /* ── Hero load sequence + scroll-reveal wiring ── */
  useEffect(() => {
    let cancelled = false;

    import('animejs').then(({ default: anime }) => {
      if (cancelled) return;

      anime({
        targets: heroLineRefs.current.filter(Boolean),
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(120, { start: 350 }),
        easing: 'cubicBezier(.16,1,.3,1)',
      });

      anime({
        targets: heroSubRef.current,
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 800,
        delay: 950,
        easing: 'easeOutQuart',
      });

      anime({
        targets: heroActionsRef.current,
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 800,
        delay: 1100,
        easing: 'easeOutQuart',
      });

      anime({
        targets: disciplineRefs.current.filter(Boolean),
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600,
        delay: anime.stagger(120, { start: 1000 }),
        easing: 'cubicBezier(.61,1,.88,1)',
      });
    });

    /* Scroll-triggered reveals for everything below the fold */
    let observer: IntersectionObserver | null = null;
    import('animejs').then(({ default: anime }) => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [26, 0],
                duration: 800,
                easing: 'cubicBezier(.16,1,.3,1)',
              });
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealRefs.current.forEach((el) => observer?.observe(el));
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Proof strip: numbers count up from zero once the strip enters view ──
     Respects reduced-motion by writing the final value immediately. */
  useEffect(() => {
    let cancelled = false;
    const gridEl = proofGridRef.current;
    if (!gridEl) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCount = () => {
      import('animejs').then(({ default: anime }) => {
        if (cancelled) return;
        stats.forEach((s, i) => {
          const el = proofValueRefs.current[i];
          if (!el) return;
          const target = parseFloat(s.value);
          if (Number.isNaN(target)) { el.textContent = s.value; return; }
          if (reduceMotion) { el.textContent = s.value; return; }
          const counter = { val: 0 };
          anime({
            targets: counter,
            val: target,
            round: 1,
            duration: 1300,
            delay: i * 90,
            easing: 'easeOutCubic',
            update: () => { el.textContent = String(counter.val); },
          });
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { runCount(); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(gridEl);

    return () => { cancelled = true; observer.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);
}
