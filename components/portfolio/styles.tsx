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

      /* ── Interactive 3D Hero & Glassmorphic Chatbot ── */
      .pf-hero-interactive {
        position: relative;
        min-height: 100vh;
        height: 100vh;
        height: 100dvh;
        max-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 70px 0 20px;
        box-sizing: border-box;
      }

      .pf-hero-interactive h1,
      .pf-hero-title-diff {
        font-size: clamp(1.95rem, 3.1vw, 3.1rem) !important;
        line-height: 1.05;
        max-width: 14ch;
        mix-blend-mode: difference;
      }

      .pf-hero-interactive h1 em,
      .pf-hero-title-diff em {
        font-style: normal;
        color: inherit !important;
      }

      .pf-hero-interactive .pf-hero-sub,
      .pf-hero-sub-diff {
        margin-top: 12px;
        font-size: 13.5px;
        line-height: 1.5;
        max-width: 40ch;
        mix-blend-mode: difference;
        opacity: 0.9;
      }

      .pf-hero-interactive .pf-hero-actions {
        margin-top: 18px;
        gap: 10px;
      }

      .pf-hero-interactive .pf-btn {
        padding: 9px 20px;
        font-size: 10.5px;
      }

      /* orb no longer needs its own explicit z-index — DOM order now controls layering */
      .pf-orb-bg-wrap {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        /* z-index: 1;  ← remove this line */
      }

      .pf-orb-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* NEW — this becomes the single shared blend context */
      .pf-hero-blend-stage {
        position: absolute;
        inset: 0;
        z-index: 2; /* sits above grid(0)/spotlight(0)/discipline(1), below hero-met  a */
        display: flex;
        align-items: center;
        pointer-events: none;
      }
      .pf-hero-blend-stage > .pf-hero-content-wrap {
        pointer-events: auto;
        width: 100%;
      }

      .pf-hero-content-wrap {
        position: relative;
        /* z-index: 3;  ← remove this line */
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        align-items: center;
        width: 100%;
        padding: 0;
      }

      .pf-hero-header-block {
        position: relative;
        /* z-index: 4;  ← remove this line */
      }

      .pf-hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ember);
        background: rgba(227, 168, 116, 0.1);
        border: 1px solid rgba(227, 168, 116, 0.28);
        padding: 5px 12px;
        border-radius: 999px;
        margin-bottom: 12px;
      }

      .pf-hero-chat-wrapper {
        position: relative;
        z-index: 4;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
      }

      .pf-hero-glass-chat-container {
        background: rgba(18, 16, 14, 0.76);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(243, 236, 223, 0.16);
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 24px rgba(227, 168, 116, 0.08);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: clamp(360px, 48vh, 440px);
      }

      .pf-hero-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 16px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(243, 236, 223, 0.08);
      }

      .pf-hero-chat-status {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .pf-chat-status-pip {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 10px #4ade80;
        animation: pulse 2.5s infinite;
      }

      .pf-chat-status-text {
        display: flex;
        flex-direction: column;
      }

      .pf-chat-title {
        font-size: 11px;
        letter-spacing: 0.14em;
        color: var(--paper);
        font-weight: 600;
      }

      .pf-chat-subtitle {
        font-size: 10px;
        color: var(--muted-on-ink);
      }

      .pf-chat-reset-btn {
        font-size: 10px;
        letter-spacing: 0.12em;
        padding: 4px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(243, 236, 223, 0.14);
        color: var(--muted-on-ink);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .pf-chat-reset-btn:hover {
        background: rgba(227, 168, 116, 0.15);
        color: var(--ember);
        border-color: var(--ember);
      }

      .pf-hero-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scrollbar-width: none;
      }

      .pf-chat-msg-row {
        display: flex;
        width: 100%;
      }

      .pf-msg-user-row {
        justify-content: flex-end;
      }

      .pf-msg-ai-row {
        justify-content: flex-start;
      }

      .pf-chat-bubble {
        max-width: 90%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.5;
      }

      .pf-bubble-user {
        background: linear-gradient(135deg, rgba(227, 168, 116, 0.3), rgba(227, 168, 116, 0.15));
        border: 1px solid rgba(227, 168, 116, 0.45);
        color: var(--paper);
        border-bottom-right-radius: 4px;
      }

      .pf-bubble-ai {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(243, 236, 223, 0.1);
        color: var(--paper);
        border-bottom-left-radius: 4px;
      }

      .pf-bubble-loading {
        background: rgba(227, 168, 116, 0.08);
        border: 1px dashed rgba(227, 168, 116, 0.4);
      }

      .pf-chat-time {
        display: block;
        font-size: 9.5px;
        opacity: 0.55;
        margin-top: 4px;
        text-align: right;
      }

      .pf-chat-md strong {
        color: var(--ember);
        font-weight: 600;
      }

      .pf-chat-link {
        color: var(--ember);
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .pf-chat-bullet-row {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin: 3px 0;
      }

      .pf-chat-bullet-dot {
        color: var(--ember);
        font-size: 10px;
        flex-shrink: 0;
      }

      .pf-chat-space {
        height: 4px;
      }

      .pf-chat-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 16px 8px;
      }

      .pf-chat-chip {
        font-size: 10px;
        padding: 4px 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(243, 236, 223, 0.12);
        color: var(--paper);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .pf-chat-chip:hover {
        background: rgba(227, 168, 116, 0.2);
        border-color: var(--ember);
        color: var(--ember);
      }

      .pf-hero-chat-input-bar {
        display: flex;
        gap: 8px;
        padding: 10px 14px;
        background: rgba(0, 0, 0, 0.35);
        border-top: 1px solid rgba(243, 236, 223, 0.08);
      }

      .pf-chat-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(243, 236, 223, 0.12);
        border-radius: 10px;
        padding: 8px 12px;
        color: var(--paper);
        font-size: 12.5px;
        outline: none;
        transition: border-color 0.2s ease;
      }

      .pf-chat-input:focus {
        border-color: var(--ember);
        box-shadow: 0 0 10px rgba(227, 168, 116, 0.25);
      }

      .pf-chat-send-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: var(--ember);
        color: var(--ink);
        border: none;
        border-radius: 10px;
        padding: 0 14px;
        font-size: 10.5px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }

      .pf-chat-send-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .pf-chat-send-btn:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(227, 168, 116, 0.4);
      }

      /* ── Glassmorphic Loader Ball Animation ── */
      .pf-glass-loader-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 4px 0;
      }

      .pf-glass-orb-loader {
        position: relative;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pf-glass-orb-core {
        position: relative;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, rgba(255, 236, 210, 0.95), rgba(227, 168, 116, 0.7) 40%, rgba(47, 74, 62, 0.4) 80%, rgba(21, 19, 15, 0.8) 100%);
        box-shadow: 0 0 12px rgba(227, 168, 116, 0.6), inset 0 0 4px rgba(255, 255, 255, 0.8);
        animation: orb-morph 2.4s ease-in-out infinite alternate;
      }

      .pf-glass-orb-glow {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(227, 168, 116, 0.5) 0%, transparent 70%);
        animation: orb-glow-pulse 2s ease-in-out infinite;
      }

      .pf-glass-loader-label {
        font-size: 11px;
        color: var(--ember);
        letter-spacing: 0.08em;
      }

      @keyframes orb-morph {
        0% {
          transform: scale(0.92) rotate(0deg);
          border-radius: 46% 54% 50% 50% / 52% 48% 52% 48%;
        }
        50% {
          transform: scale(1.08) rotate(180deg);
          border-radius: 54% 46% 52% 48% / 46% 54% 46% 54%;
        }
        100% {
          transform: scale(0.96) rotate(360deg);
          border-radius: 48% 52% 46% 54% / 54% 46% 50% 50%;
        }
      }

      @keyframes orb-glow-pulse {
        0%, 100% {
          transform: scale(0.9);
          opacity: 0.4;
        }
        50% {
          transform: scale(1.25);
          opacity: 0.85;
        }
      }

      .pf-hero-interactive .pf-hero-meta {
        position: absolute;
        bottom: 12px;
        left: 0;
        right: 0;
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        z-index: 4;
      }
      @media (max-height: 720px) {
        .pf-hero-interactive .pf-hero-meta {
          display: none;
        }
      }

      /* ══════════ MOBILE COMPACTION ══════════ */
      @media (max-width: 960px) {
        .pf-hero-interactive {
          min-height: auto;
          height: auto;
          max-height: none;
          padding: 100px 0 40px;
        }
        .pf-hero-content-wrap {
          grid-template-columns: 1fr;
          gap: 32px;
          padding-top: 20px;
        }
        .pf-hero-header-block {
          text-align: center;
        }
        .pf-hero-actions {
          justify-content: center;
        }
        .pf-hero-chat-wrapper {
          max-width: 100%;
        }
      }

      @media (max-width: 640px) {
        .pf-nav { padding: 14px 18px; }
        .pf-mark { font-size: 15px; }
        .pf-nav-cta { padding: 8px 14px; font-size: 10px; }

        .pf-hero { padding: 96px 0 48px; min-height: auto; }
        .pf-hero-interactive { min-height: auto; padding: 100px 0 40px; }
        .pf-hero h1 { font-size: clamp(2.15rem, 10.5vw, 3rem); margin-top: 18px; max-width: 13ch; }
        .pf-hero-sub { margin-top: 16px; font-size: 14.5px; line-height: 1.6; }
        .pf-hero-actions { margin-top: 26px; gap: 10px; }
        .pf-btn { padding: 12px 20px; font-size: 10.5px; }

        .pf-hero-glass-chat-container { height: 460px; border-radius: 20px; }
        .pf-hero-chat-header { padding: 14px 16px; }
        .pf-hero-chat-messages { padding: 14px 16px; }
        .pf-chat-bubble { max-width: 94%; font-size: 12.5px; }

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
