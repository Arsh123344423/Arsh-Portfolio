'use client';

import type { JSX } from 'react';

/* ────────────────────────── PortfolioStyles ────────────────────────── */

/**
 * All global CSS for the portfolio, extracted into its own component so
 * Loader.tsx stays a clean orchestrator. Rendered once at the top of the tree.
 */
export function PortfolioStyles(): JSX.Element {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

      :root {
        --ink: #15130f;
        --ink-2: #1b1812;
        --stone: #ede6d8;
        --stone-2: #f5f0e5;
        --paper: #f3ecdf;
        --ember: #e3a874;
        --ember-soft: rgba(227, 168, 116, 0.14);
        --moss: #2f4a3e;
        --line-on-ink: rgba(243, 236, 223, 0.85);
        --line-on-stone: rgba(21, 19, 15, 0.85);
        --muted-on-ink: rgba(243, 236, 223, 0.58);
        --muted-on-stone: rgba(21, 19, 15, 0.56);
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; font-family: 'Figtree', sans-serif; -webkit-font-smoothing: antialiased; }
      ::selection { background: var(--ember); color: var(--ink); }
      a { text-decoration: none; color: inherit; }

      .serif { font-family: 'Fraunces', serif; font-weight: 400; letter-spacing: -0.01em; line-height: 0.98; margin: 0; }
      .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; }

      .wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
      @media (max-width: 640px) { .wrap { padding: 0 20px; } }

      a:focus-visible, button:focus-visible {
        outline: 2px solid var(--ember);
        outline-offset: 3px;
        border-radius: 4px;
      }

      /* ── custom tracking cursor ── */
      .pf-cursor {
        position: fixed; top: 0; left: 0;
        width: 60px; height: 60px; border-radius: 50%;
        background: var(--paper);
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s ease, width 0.25s ease, height 0.25s ease;
        will-change: transform;
      }
      .pf-cursor--active { width: 42px; height: 42px; }

      @media (hover: hover) and (pointer: fine) {
        body.pf-cursor-enabled,
        body.pf-cursor-enabled a,
        body.pf-cursor-enabled button { cursor: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        html { scroll-behavior: auto; }
      }

      /* ── nav ── */
      .pf-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        display: flex; align-items: center; justify-content: space-between;
        padding: 22px 32px;
        background: rgba(21, 19, 15, 0.7);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(243, 236, 223, 0.14);
        transition: background 0.3s ease;
      }
      .pf-nav.scrolled { background: rgba(21, 19, 15, 0.92); }
      .pf-mark { display: flex; align-items: center; gap: 10px; font-family: 'Fraunces', serif; font-weight: 500; font-size: 17px; color: var(--paper); }
      .pf-mark .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ember); }
      .pf-links { display: flex; align-items: center; gap: 34px; }
      .pf-links a { font-size: 11px; color: var(--muted-on-ink); transition: color 0.25s ease; }
      .pf-links a:hover { color: var(--paper); }
      .pf-nav-cta {
        font-size: 11px; padding: 10px 20px; border-radius: 999px;
        border: 2px solid rgba(243, 236, 223, 0.3); color: var(--paper);
        transition: all 0.25s ease;
      }
      .pf-nav-cta:hover { background: var(--ember); border-color: var(--ember); color: var(--ink); }
      @media (max-width: 860px) { .pf-links { display: none; } }

      /* ── hero (ink chamber) ── */
      .pf-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 115px 0 90px; overflow: hidden; }

      /* Precision grid, faded toward the edges — quiet technical texture behind the headline */
      .pf-hero-grid {
        position: absolute; inset: 0; z-index: 0; pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(243, 236, 223, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(243, 236, 223, 0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 38%, black 35%, transparent 82%);
        mask-image: radial-gradient(ellipse 65% 55% at 50% 38%, black 35%, transparent 82%);
      }

      /* Soft glow that tracks the cursor within the hero — the section's one signature move */
      .pf-hero-spotlight {
        position: absolute; inset: 0; z-index: 0; pointer-events: none;
        --sx: 50%; --sy: 38%;
        background: radial-gradient(560px circle at var(--sx) var(--sy), rgba(227, 168, 116, 0.14), transparent 45%);
      }
      @media (max-width: 760px) { .pf-hero-spotlight { background: radial-gradient(420px circle at 50% 30%, rgba(227, 168, 116, 0.12), transparent 45%); } }

      .pf-hero h1 { position: relative; z-index: 2; font-size: clamp(3rem, 8vw, 7.2rem); max-width: 17ch; color: var(--paper); }
      .pf-hero h1 .pf-line { display: block; overflow: hidden; }
      .pf-hero h1 .pf-line span { display: inline-block; transform: translateY(100%); opacity: 0; }
      .pf-hero h1 em { font-style: italic; color: var(--ember); }
      .pf-hero-sub { position: relative; z-index: 2; margin-top: 30px; max-width: 46ch; font-size: 18px; line-height: 1.7; color: var(--muted-on-ink); opacity: 0; }
      .pf-hero-actions { position: relative; z-index: 2; display: flex; gap: 14px; margin-top: 42px; flex-wrap: wrap; opacity: 0; }

      .pf-btn { font-size: 12px; letter-spacing: 0.06em; padding: 15px 28px; border-radius: 999px; transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease; }
      .pf-btn-solid { background: var(--ember); color: var(--ink); border: 1px solid var(--ember); }
      .pf-btn-solid:hover { transform: translateY(-2px); }
      .pf-btn-ghost { border: 1px solid rgba(243, 236, 223, 0.18); color: var(--paper); background: rgba(243, 236, 223, 0.02); }
      .pf-btn-ghost:hover { border-color: rgba(227, 168, 116, 0.55); color: var(--ember); background: rgba(227, 168, 116, 0.06); }

      .pf-hero-meta { position: absolute; z-index: 2; bottom: 40px; left: 0; right: 0; padding: 0 32px; display: flex; justify-content: space-between; }
      .pf-scroll-cue { display: flex; align-items: center; gap: 8px; font-size: 10px; color: var(--muted-on-ink); }
      .pf-scroll-chevron { display: inline-flex; color: var(--ember); animation: pf-chevron-bounce 1.6s ease-in-out infinite; }
      @keyframes pf-chevron-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
      @media (max-width: 640px) { .pf-hero-meta { display: none; } }

      .pf-discipline {
        position: absolute; z-index: 1; display: flex; align-items: center; gap: 8px; opacity: 0;
        font-size: 10.5px; padding: 7px 13px; border: 1px solid rgba(243, 236, 223, 0.14); border-radius: 999px;
        background: rgba(243, 236, 223, 0.03); backdrop-filter: blur(6px);
      }
      .pf-discipline .pip { width: 5px; height: 5px; border-radius: 50%; background: var(--ember); }
      .pf-discipline span.lbl { color: rgba(243, 236, 223, 0.7); }
      @media (max-width: 760px) { .pf-discipline { display: none; } }

      /* ── marquee (stone chamber) ── */
      .pf-marquee-section { background: var(--stone); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 28px 0; overflow: hidden; }
      .pf-marquee-track { display: flex; gap: 60px; width: max-content; animation: pf-scroll-x 28s linear infinite; }
      .pf-marquee-track span { font-family: 'Fraunces', serif; font-style: italic; font-size: 22px; color: var(--muted-on-stone); white-space: nowrap; }
      @keyframes pf-scroll-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }

      /* ── section shells ── */
      .pf-section-stone { background: var(--stone); color: var(--ink); padding: 130px 0; }
      .pf-section-ink { background: var(--ink); color: var(--paper); padding: 130px 0; }
      .pf-section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 64px; flex-wrap: wrap; }
      .pf-section-eyebrow { color: var(--ember); font-size: 11px; display: block; margin-bottom: 14px; }
      .pf-section-title { font-size: clamp(2rem, 4vw, 3.4rem); max-width: 14ch; }
      .pf-section-note { max-width: 32ch; font-size: 14.5px; line-height: 1.6; }
      .pf-section-stone .pf-section-note { color: var(--muted-on-stone); }
      .pf-section-ink .pf-section-note { color: var(--muted-on-ink); }

      /* ── capabilities deck ── */
      .pf-deck { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      @media (max-width: 900px) { .pf-deck { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 620px) { .pf-deck { grid-template-columns: 1fr; } }
      .pf-deck-card { background: var(--stone-2); border: 2px solid var(--ink); border-radius: 28px; padding: 34px 28px; opacity: 0; transition: background 0.3s ease; }
      .pf-deck-card:hover { background: #fff; }
      .pf-deck-num { font-size: 12px; color: var(--muted-on-stone); }
      .pf-deck-card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 22px; margin: 20px 0 12px; }
      .pf-deck-card p { font-size: 14px; line-height: 1.65; color: var(--muted-on-stone); margin: 0 0 18px; }
      .pf-deck-tags { display: flex; gap: 8px; flex-wrap: wrap; }
      .pf-deck-tags span { font-size: 10px; letter-spacing: 0.08em; color: var(--moss); border: 1px solid var(--moss); border-radius: 999px; padding: 4px 10px; font-family: 'JetBrains Mono'; text-transform: uppercase; }

      /* ── about (ink chamber, two-column) ── */
      .pf-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
      @media (max-width: 860px) { .pf-about-grid { grid-template-columns: 1fr; gap: 56px; } }

      /* left column */
      .pf-about-left { opacity: 0; }
      @media (max-width: 860px) { .pf-about-left { order: 1; } }
      .pf-about-left .pf-section-eyebrow { display: block; margin-bottom: 14px; }
      .pf-about-left .pf-section-title { margin-bottom: 36px; }
      .pf-about-copy p { font-size: 17px; line-height: 1.78; color: var(--muted-on-ink); margin: 0 0 22px; }
      .pf-about-copy p:last-child { margin-bottom: 0; }
      .pf-about-currently { display: flex; align-items: flex-start; gap: 10px; margin-top: 32px; padding-top: 28px; border-top: 1.5px solid rgba(243,236,223,0.12); font-size: 13px; line-height: 1.6; color: var(--ember); }
      .pf-about-currently .pip { width: 7px; height: 7px; border-radius: 50%; background: var(--ember); box-shadow: 0 0 10px var(--ember); flex-shrink: 0; margin-top: 5px; }

      /* right column */
      .pf-about-right { opacity: 0; display: flex; flex-direction: column; align-items: center; gap: 28px; }
      @media (max-width: 860px) { .pf-about-right { order: 2; } }

      .pf-about-photo-wrap { position: relative; width: 260px; height: 260px; flex-shrink: 0; }
      @media (max-width: 860px) { .pf-about-photo-wrap { width: 240px; height: 240px; } }
      @media (max-width: 480px) { .pf-about-photo-wrap { width: 200px; height: 200px; } }
      .pf-about-photo-ring { position: absolute; inset: 0; animation: pf-spin 24s linear infinite; }
      @keyframes pf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .pf-about-photo-circle {
        position: absolute; inset: 34px; border-radius: 50%; overflow: hidden;
        border: 2px solid rgba(227, 168, 116, 0.5); background: var(--ember-soft);
        display: flex; align-items: center; justify-content: center;
      }
      .pf-about-photo-circle img { width: 100%; height: 100%; object-fit: cover; }
      .pf-about-photo-fallback { font-size: 46px; color: var(--ember); font-family: 'Fraunces', serif; }

      .pf-about-id { text-align: center; }
      .pf-about-id-name { font-family: 'Fraunces', serif; font-weight: 500; font-size: 22px; color: var(--paper); display: block; margin-bottom: 6px; }
      .pf-about-id-role { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ember); font-family: 'JetBrains Mono', monospace; }

      .pf-about-facts { list-style: none; margin: 0; padding: 0; width: 100%; border-top: 2px solid rgba(243, 236, 223, 0.14); }
      .pf-about-facts li { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 2px solid rgba(243, 236, 223, 0.14); }
      .pf-about-fact-label { font-size: 10px; color: var(--muted-on-ink); flex-shrink: 0; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; }
      .pf-about-fact-value { font-size: 14px; text-align: right; color: var(--paper); }

      /* ── work grid (ink chamber, big radius cards) ── */
      .pf-work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
      @media (max-width: 780px) { .pf-work-grid { grid-template-columns: 1fr; } }
      .pf-work-card { border-radius: 48px; overflow: hidden; border: 2px solid rgba(243, 236, 223, 0.25); opacity: 0;}
      .pf-work-thumb { height: 260px; position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 26px; }
      .pf-work-thumb::before { content: ''; position: absolute; inset: 0; transition: transform 0.7s cubic-bezier(.16,1,.3,1); }
      .pf-work-card:hover .pf-work-thumb::before { transform: scale(1.06); }
      .pf-work-thumb-label { position: relative; z-index: 1; font-size: 11px; color: rgba(21, 19, 15, 0.7); font-family: 'JetBrains Mono'; text-transform: uppercase; }
      .pf-work-info { padding: 26px 28px 28px; background: var(--ink-2); }
      .pf-work-info-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
      .pf-work-info h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 20px; margin: 0; }
      .pf-work-info-head span { font-size: 11px; color: var(--muted-on-ink); font-family: 'JetBrains Mono'; flex-shrink: 0; }
      .pf-work-desc { margin: 12px 0 18px; font-size: 14px; line-height: 1.65; color: var(--muted-on-ink); }
      .pf-work-foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
      .pf-work-tags { display: flex; gap: 8px; flex-wrap: wrap; }
      .pf-work-tags span { font-size: 10px; letter-spacing: 0.06em; color: var(--muted-on-ink); border: 1px solid rgba(243, 236, 223, 0.25); border-radius: 999px; padding: 4px 10px; }
      .pf-work-link { font-size: 11px; color: var(--ember); transition: opacity 0.25s ease; }
      .pf-work-link:hover { opacity: 0.7; }

      /* ── proof strip (stone chamber) ──
         Signature move: each figure counts up from zero the first time the
         strip enters view (a quiet echo of the "real-time systems" thread
         running through the work section), and hovering a cell reveals the
         one line of context that number actually stands for. Dividers are
         drawn with a single 1px grid gap over an ink background instead of
         per-cell borders, so every seam renders at exactly the same weight
         regardless of column rounding. */
      .pf-proof-section { padding: 0; }
      /* Border-collapse technique: every cell gets a full 1px border, then is
         pulled up/left by exactly that width so its border lands precisely on
         top of its neighbor's — one shared 1px line instead of two stacked
         ones. The grid is nudged down/right by the same amount so the very
         first cell isn't shifted out of position. This is deliberately pure
         borders (no gap+background mixing) so there's only ever one seam-
         drawing mechanism, and no dependency on how the fractional 1fr
         columns round — the fix always lands, at any width or zoom level. */
      .pf-proof-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        background: var(--ink);
        padding: 1px 0 0 1px;
      }
      @media (max-width: 780px) { .pf-proof-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 400px) { .pf-proof-grid { grid-template-columns: 1fr; } }

      .pf-proof-cell {
        position: relative;
        padding: 52px 32px 44px;
        background: var(--stone-2);
        border: 1px solid var(--ink);
        margin: -1px 0 0 -1px;
        opacity: 0;
        overflow: hidden;
        transition: background 0.35s ease;
      }
      .pf-proof-cell::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: var(--ember);
        transform: scaleY(0);
        transform-origin: bottom;
        transition: transform 0.45s cubic-bezier(.16,1,.3,1);
      }
      .pf-proof-cell:hover,
      .pf-proof-cell:focus-within { background: #fff; z-index: 2; }
      .pf-proof-cell:hover::before,
      .pf-proof-cell:focus-within::before { transform: scaleY(1); }

      .pf-proof-num {
        display: flex; align-items: baseline;
        font-family: 'Fraunces', serif; font-weight: 500;
        font-size: clamp(2.1rem, 4vw, 3.1rem);
        font-variant-numeric: tabular-nums;
      }
      .pf-proof-num .accent { color: var(--ember); font-style: italic; }
      .pf-proof-label { margin-top: 10px; font-size: 11px; color: var(--muted-on-stone); font-family: 'JetBrains Mono'; text-transform: uppercase; letter-spacing: 0.1em; }
      .pf-proof-note {
        font-size: 12.5px; line-height: 1.55; color: var(--muted-on-stone);
        max-height: 0; margin-top: 0; opacity: 0;
        overflow: hidden;
        transition: max-height 0.35s ease, margin-top 0.35s ease, opacity 0.3s ease;
      }
      .pf-proof-cell:hover .pf-proof-note,
      .pf-proof-cell:focus-within .pf-proof-note { max-height: 80px; margin-top: 12px; opacity: 0.9; }

      /* ── CTA (ink chamber) ── */
      .pf-cta { text-align: center; padding: 100px 0; }
      .pf-cta h2 { font-size: clamp(2.4rem, 7vw, 5.4rem); max-width: 16ch; margin: 0 auto; }
      .pf-cta p { margin: 28px auto 0; max-width: 40ch; color: var(--muted-on-ink); font-size: 16px; }
      .pf-cta-email { display: inline-block; margin-top: 46px; font-family: 'JetBrains Mono', monospace; font-size: clamp(15px, 2.4vw, 20px); border-bottom: 2px solid var(--ember); padding-bottom: 6px; color: var(--paper); transition: color 0.25s ease; }
      .pf-cta-email:hover { color: var(--ember); }

      /* ── footer (stone chamber) ── */
      .pf-footer { background: var(--stone); color: var(--ink); padding: 34px 0; }
      .pf-footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 11px; }
      .pf-footer-links { display: flex; gap: 26px; }
      .pf-footer-links a:hover { color: var(--moss); }

      /* ══════════ MOBILE COMPACTION ══════════
         Tightens padding, gaps, and type scale across every section so
         the page reads as a proper phone layout instead of a shrunk
         desktop one. */
      @media (max-width: 640px) {
        .pf-nav { padding: 14px 18px; }
        .pf-mark { font-size: 15px; }
        .pf-nav-cta { padding: 8px 14px; font-size: 10px; }

        .pf-hero { padding: 96px 0 48px; min-height: auto; }
        .pf-hero h1 { font-size: clamp(2.15rem, 10.5vw, 3rem); margin-top: 18px; max-width: 13ch; }
        .pf-hero-sub { margin-top: 16px; font-size: 14.5px; line-height: 1.6; }
        .pf-hero-actions { margin-top: 26px; gap: 10px; }
        .pf-btn { padding: 12px 20px; font-size: 10.5px; }

        .pf-marquee-section { padding: 14px 0; }
        .pf-marquee-track { gap: 30px; }
        .pf-marquee-track span { font-size: 15px; }

        .pf-section-stone, .pf-section-ink { padding: 56px 0; }
        .pf-section-head { margin-bottom: 30px; gap: 12px; }
        .pf-section-title { font-size: clamp(1.5rem, 7vw, 2rem); max-width: 13ch; }
        .pf-section-note { font-size: 13px; }

        .pf-about-grid { gap: 24px; }
        .pf-about-blurb { font-size: 14px; line-height: 1.6; margin-bottom: 14px; }
        .pf-about-location { margin-bottom: 14px; }
        .pf-about-currently { margin-top: 16px; font-size: 10px; }
        .pf-about-photo-wrap { width: 140px; height: 140px; margin-bottom: 4px; }
        .pf-about-photo-circle { inset: 20px; }
        .pf-about-photo-fallback { font-size: 20px; }
        .pf-about-facts li { padding: 12px 0; }
        .pf-about-fact-value { font-size: 13px; }

        .pf-deck { gap: 12px; }
        .pf-deck-card { padding: 22px 20px; border-radius: 20px; }
        .pf-deck-card h3 { font-size: 17px; margin: 14px 0 8px; }
        .pf-deck-card p { font-size: 13px; margin-bottom: 14px; }

        .pf-work-grid { gap: 16px; }
        .pf-work-card { border-radius: 24px; }
        .pf-work-thumb { height: 160px; padding: 16px; }
        .pf-work-info { padding: 18px 18px 20px; }
        .pf-work-info h3 { font-size: 17px; }
        .pf-work-desc { font-size: 13px; margin: 10px 0 14px; }

        .pf-proof-cell { padding: 28px 20px 24px; }
        .pf-proof-num { font-size: 1.9rem; }
        .pf-proof-label { font-size: 9.5px; margin-top: 6px; }
        .pf-proof-note { font-size: 11.5px; }
        .pf-proof-cell:hover .pf-proof-note,
        .pf-proof-cell:focus-within .pf-proof-note { max-height: 100px; margin-top: 8px; }

        .pf-cta { padding: 68px 0; }
        .pf-cta h2 { font-size: clamp(1.8rem, 9vw, 2.6rem); }
        .pf-cta p { margin-top: 16px; font-size: 14px; }
        .pf-cta-email { margin-top: 26px; }

        .pf-footer { padding: 22px 0; }
        .pf-footer-row { font-size: 10px; gap: 10px; }
        .pf-footer-links { gap: 16px; }
      }

      @media (max-width: 400px) {
        .wrap { padding: 0 16px; }
        .pf-hero h1 { font-size: clamp(1.9rem, 11vw, 2.6rem); }
      }
    `}</style>
  );
}
