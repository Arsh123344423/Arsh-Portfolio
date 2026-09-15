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
        --muted-on-ink: rgba(243, 236, 223, 0.78);
        --muted-on-stone: rgba(21, 19, 15, 0.76);

        /* glass system tokens — the chat panel is the one place we let the
           material get elaborate, everything else stays flat and quiet */
        --glass-tint-top: rgba(32, 28, 23, 0.86);
        --glass-tint-bottom: rgba(12, 11, 9, 0.9);
        --glass-rim: rgba(227, 168, 116, 0.45);
        --glass-rim-soft: rgba(243, 236, 223, 0.05);
        --signal: #4ade80;
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

      /* Ambient breathing glow — sits behind the orb/chat, gives the interactive
         hero the same "alive" material feel as a voice-agent product without
         adding any new UI chrome. Drop <div className="pf-ambient-glow" /> as
         the first child inside .pf-hero-interactive (or .pf-hero-blend-stage)
         to activate it. */
      .pf-ambient-glow { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
      .pf-ambient-glow::before,
      .pf-ambient-glow::after {
        content: '';
        position: absolute;
        width: 44vw; height: 44vw;
        max-width: 600px; max-height: 600px;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.2;
        animation: pf-breathe 11s ease-in-out infinite;
      }
      .pf-ambient-glow::before { background: var(--ember); top: -12%; left: -10%; }
      .pf-ambient-glow::after { background: var(--moss); bottom: -16%; right: -8%; animation-delay: -5.5s; }
      @keyframes pf-breathe {
        0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.16; }
        50% { transform: scale(1.16) translate(3%, -2%); opacity: 0.27; }
      }

      .pf-hero h1 { position: relative; z-index: 2; font-size: clamp(3rem, 8vw, 7.2rem); max-width: 17ch; color: var(--paper); }
      .pf-hero h1 .pf-line { display: block; overflow: hidden; }
      .pf-hero h1 .pf-line span { display: inline-block; transform: translateY(100%); opacity: 0; }
      .pf-hero h1 em { font-style: italic; color: var(--ember); }
      .pf-hero-sub { position: relative; z-index: 2; margin-top: 30px; max-width: 46ch; font-size: 18px; line-height: 1.7; color: var(--muted-on-ink); opacity: 0; }
      .pf-hero-actions { position: relative; z-index: 2; display: flex; gap: 14px; margin-top: 42px; flex-wrap: wrap; opacity: 0; }

      .pf-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        letter-spacing: 0.06em;
        padding: 15px 28px;
        border-radius: 999px;
        position: relative;
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.25s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .pf-btn-solid {
        background: var(--ember);
        color: var(--ink);
        border: 1px solid var(--ember);
        position: relative;
        overflow: hidden;
        isolation: isolate;
        z-index: 1;
      }
      .pf-btn-solid::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: var(--ink);
        transform: translate(-50%, -50%);
        transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                    height 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: -1;
      }
      .pf-btn-solid:hover {
        color: var(--ember);
        border-color: var(--ember);
      }
      .pf-btn-solid:hover::before {
        width: 320px;
        height: 320px;
      }
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
      .pf-work-card { border-radius: 48px; overflow: hidden; border: 2px solid rgba(243, 236, 223, 0.25); opacity: 0; display: flex; flex-direction: column; }
      .pf-work-thumb { height: 260px; position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 26px; }
      .pf-work-thumb::before { content: ''; position: absolute; inset: 0; transition: transform 0.7s cubic-bezier(.16,1,.3,1); }
      .pf-work-card:hover .pf-work-thumb::before { transform: scale(1.06); }
      .pf-work-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.7s cubic-bezier(.16,1,.3,1); }
      .pf-work-card:hover .pf-work-img { transform: scale(1.06); }
      .pf-work-thumb-label { position: relative; z-index: 1; font-size: 11px; color: rgba(21, 19, 15, 0.7); font-family: 'JetBrains Mono'; text-transform: uppercase; background: rgba(243, 236, 223, 0.85); padding: 4px 10px; border-radius: 999px; backdrop-filter: blur(8px); }
      .pf-work-info { padding: 26px 28px 28px; background: var(--ink-2); display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; }
      .pf-work-info-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
      .pf-work-info h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 20px; margin: 0; }
      .pf-work-info-head span { font-size: 11px; color: var(--muted-on-ink); font-family: 'JetBrains Mono'; flex-shrink: 0; }
      .pf-work-desc { margin: 12px 0 18px; font-size: 14px; line-height: 1.65; color: var(--muted-on-ink); display: flex; flex-direction: column; gap: 6px; }
      .pf-work-desc-line { display: block; }
      .pf-work-foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: auto; }
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
      .pf-hero-shader-canvas {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      .pf-hero-shader-canvas canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
      }
      .pf-welcome-text{
          color: #ffffff; /* White */

      }
      .pf-hero-title{
        color: #351704;
      }
      .pf-hero-interactive h1{
        font-size: clamp(1.95rem, 3.1vw, 3.1rem) !important;
        line-height: 1.05;
        max-width: 14ch;
      }
      .pf-hero-title-diff {
        font-size: clamp(1.95rem, 3.1vw, 3.1rem) !important;
        line-height: 1.05;
        max-width: 14ch;
        mix-blend-mode: difference;
      }

      .pf-hero-interactive h1 em{
        font-style: normal;
        color: inherit !important;
      }
      .pf-hero-title-diff em {
        font-style: normal;
        color: inherit !important;
        mix-blend-mode: difference;
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
      }

      .pf-orb-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
/* Hidden SVG holder — zero footprint */
.pf-glass-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

/* ===== Outer hero panel ===== */
.pf-hero-chat-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(500px, 100%);
  max-width: min(500px, calc(100vw - 32px));
  overflow: hidden;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.26);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: none;
  transition: border-radius 0.4s ease;
}

.pf-chat-collapsed {
  width: min(500px, 100%);
  padding: 0;
  height: auto;
  min-height: 0;
  border-radius: 28px;
}

.pf-chat-expanded {
  width: min(500px, 100%);
  padding: 0;
  min-height: 360px;
  height: clamp(360px, 48vh, 440px);
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.35);
}

@supports (backdrop-filter: url(#a)) {
  .pf-hero-chat-container {
    backdrop-filter: blur(20px) saturate(160%) url(#pf-liquid-distortion);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
  }
}

/* soft top-left specular highlight, like light hitting curved glass */
.pf-hero-chat-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.04) 35%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0.08) 100%
  );
  pointer-events: none;
}

.pf-chat-collapsed { border-radius: 999px; }
.pf-chat-expanded { border-radius: 28px; }

/* ===== Header bar ===== */
.pf-hero-chat-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0));
}

.pf-chat-reset-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.pf-chat-reset-btn:hover { background: rgba(255, 255, 255, 0.16); transform: scale(1.04); }
.pf-chat-reset-btn:active { transform: scale(0.92); }

/* ===== Message bubbles ===== */
.pf-chat-bubble {
  position: relative;
  padding: 10px 14px;
  border-radius: 18px;
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
}

.pf-bubble-ai {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.pf-bubble-user {
  background: rgba(38, 246, 53, 0.14);
  border: 1px solid rgba(38, 246, 53, 0.3);
}

/* ===== Input bar ===== */
.pf-hero-chat-input-bar {
  position: relative;
  padding: 12px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.pf-chat-demo-input-main {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 6px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.pf-chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.92);
  font-size: 14px;
}
.pf-chat-input::placeholder { color: rgba(255, 255, 255, 0.7); }

.pf-chat-send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.pf-hero-chat-container .pf-chat-send-btn { color: #fff; }
.pf-chat-send-btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.24); transform: scale(1.06); }
.pf-chat-send-btn:active:not(:disabled) { transform: scale(0.9); }
.pf-chat-send-btn:disabled { opacity: 0.75; cursor: not-allowed; }
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

      .pf-hero-welcome-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .pf-hero-welcome {
        max-width: 18ch !important;
        margin: 0;
      }

      .pf-hero-welcome-wrap .pf-hero-chat-wrapper {
        margin-top: 28px;
        justify-items: center;
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
        margin: auto;
      }

      .pf-hero-chat-container {
        isolation: isolate;
        padding: 0;
        gap: 0;
      }

      .pf-hero-chat-header {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: rgba(255,255,255,0.04);
        border-bottom: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .pf-hero-chat-status {
        display: flex;
        align-items: center;
        gap: 11px;
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
        position: relative;
        z-index: 2;
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
        animation: pf-msg-in 0.4s cubic-bezier(.16, 1, .3, 1) both;
      }
      @keyframes pf-msg-in {
        from { opacity: 0; transform: translateY(7px) scale(0.985); }
        to { opacity: 1; transform: translateY(0) scale(1); }
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
        border-radius: 16px;
        font-size: 13px;
        line-height: 1.5;
        background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
        border: 1px solid rgba(255,255,255,0.09);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.22),
          inset 0 -8px 18px rgba(255,255,255,0.04),
          0 10px 26px rgba(0,0,0,0.12);
        backdrop-filter: blur(18px) saturate(140%);
        -webkit-backdrop-filter: blur(18px) saturate(140%);
      }

      .pf-bubble-user {
        background: linear-gradient(135deg, rgba(227, 168, 116, 0.28), rgba(255,255,255,0.06));
        border-color: rgba(227, 168, 116, 0.42);
        color: var(--paper);
        border-bottom-right-radius: 6px;
        box-shadow: 0 14px 28px rgba(227, 168, 116, 0.12), inset 0 1px 0 rgba(255,255,255,0.15);
      }

      .pf-bubble-ai {
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
        border-color: rgba(255,255,255,0.1);
        color: var(--paper);
        border-bottom-left-radius: 6px;
      }

      .pf-bubble-loading {
        background: linear-gradient(180deg, rgba(227, 168, 116, 0.12), rgba(255,255,255,0.04));
        border: 1px solid rgba(227, 168, 116, 0.35);
      }

      .pf-chat-time {
        display: block;
        font-size: 9.5px;
        opacity: 0.8;
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
        position: relative;
        z-index: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 16px 8px;
      }

      .pf-chat-chip {
        font-size: 10px;
        padding: 5px 10px;
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--paper);
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 22px rgba(0,0,0,0.08);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }

      .pf-chat-chip:hover {
        background: linear-gradient(180deg, rgba(227, 168, 116, 0.18), rgba(255,255,255,0.04));
        border-color: rgba(227, 168, 116, 0.5);
        color: var(--ember);
        transform: translateY(-1px);
      }

      .pf-chat-input {
        flex: 1;
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 999px;
        padding: 9px 16px;
        color: var(--paper);
        font-size: 12.5px;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -8px 18px rgba(255,255,255,0.02);
      }

      .pf-chat-input::placeholder { color: rgba(243, 236, 223, 0.7); }

      .pf-chat-input:focus {
        border-color: var(--ember);
        box-shadow: 0 0 0 3px rgba(227, 168, 116, 0.14), 0 0 14px rgba(227, 168, 116, 0.2);
      }

      .pf-chat-send-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(227, 168, 116, 0.3));
        color: #fff;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 999px;
        padding: 0 16px;
        font-size: 10.5px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        box-shadow: none;
      }

      .pf-hero-chat-container .pf-chat-send-btn {
        position: relative;
        z-index: 1;
        flex: 0 0 36px;
        width: 36px;
        min-width: 36px;
        height: 36px;
        padding: 0;
        background: #f3ecdf;
        color: #15130f;
        border: 1px solid rgba(21, 19, 15, 0.35);
        box-shadow: none;
      }

      .pf-hero-chat-container .pf-chat-send-btn svg {
        width: 16px;
        height: 16px;
        display: block;
        color: #15130f;
      }

      .pf-hero-chat-container .pf-chat-send-btn svg path {
        stroke: #15130f;
      }

      .pf-chat-send-btn:disabled {
        opacity: 0.75;
        cursor: not-allowed;
      }

      .pf-chat-send-btn svg {
        display: block;
        color: #fff;
      }

      .pf-chat-send-btn svg path {
        stroke: #fff;
      }

      .pf-chat-send-btn:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: none;
      }
      .pf-chat-send-btn:not(:disabled):active { transform: translateY(0) scale(0.97); }

      /* Compact BorderBeam chat surface: the existing conversation remains
         live, while the input follows the supplied prompt-composer design. */
      .pf-chat-demo-shell {
        width: min(500px, 100%);
        min-height: 360px;
        height: clamp(360px, 48vh, 440px);
        border-radius: 20px;
        background: #f9f3f3;
        box-shadow: inset 0 0 0 1px rgba(44, 47, 54, 0.52), inset 0 0 50px rgba(255, 255, 255, 0.02);
        font-family: system-ui, -apple-system, sans-serif;
      }

      .pf-chat-demo-shell.pf-chat-collapsed {
        min-height: 0;
        height: auto;
      }

      .pf-chat-demo-shell.pf-chat-expanded {
        animation: pf-chat-expand 0.35s cubic-bezier(.16, 1, .3, 1) both;
      }

      @keyframes pf-chat-expand {
        from { opacity: 0.82; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .pf-chat-demo-shell .pf-hero-chat-header {
        background: transparent;
        border-bottom-color: rgba(255, 255, 255, 0.06);
      }

      .pf-chat-demo-shell .pf-hero-chat-messages {
        padding: 12px 14px;
      }

      .pf-chat-demo-shell .pf-chat-bubble {
        font-size: 12px;
      }

      .pf-chat-demo-input {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        padding: 12px 14px 13px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 18px 36px rgba(0,0,0,0.18);
      }

      .pf-chat-demo-input-main {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .pf-chat-demo-at-icon,
      .pf-chat-demo-control,
      .pf-chat-demo-send {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        border-radius: 36px;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .pf-chat-demo-at-icon {
        width: 28px;
        align-self: flex-start;
      }

      .pf-chat-demo-input .pf-chat-input {
        flex: 1;
        min-width: 0;
        min-height: 38px;
        padding: 0 12px;
        border: 0;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: none;
        font-size: 15px;
      }

      .pf-chat-demo-input .pf-chat-input:focus {
        border: 0;
        box-shadow: none;
      }

      .pf-chat-demo-input .pf-chat-input::placeholder {
        color: rgba(234, 236, 241, 0.58);
      }

      .pf-chat-demo-input .pf-chat-input:focus-visible {
        outline: 2px solid rgba(227, 168, 116, 0.7);
        outline-offset: 2px;
      }

      .pf-chat-demo-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .pf-chat-demo-control {
        gap: 4px;
        padding: 0 8px;
        border: 0;
        color: #caccd2;
        font-size: 12px;
        line-height: 14px;
        cursor: pointer;
      }

      .pf-chat-demo-control svg { transform: rotate(90deg); }

      .pf-chat-demo-send {
        width: 28px;
        flex: 0 0 28px;
        padding: 0;
        border: 0;
        background: rgba(255, 255, 255, 0.04);
      }

      .pf-chat-demo-send:not(:disabled):hover {
        background: rgba(227, 168, 116, 0.18);
        box-shadow: inset 0 0 0 1px rgba(227, 168, 116, 0.45);
      }

      .pf-chat-launch-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 160px;
        padding: 18px 16px 8px;
      }

      .pf-glass-action-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: var(--glass-btn-size);
        width: var(--glass-btn-size);
        height: var(--glass-btn-size);
        padding: 0;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: var(--glass-btn-radius);
        background:
          radial-gradient(120% 150% at 20% 0%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04) 38%, rgba(255, 255, 255, 0.02) 60%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
        color: var(--paper);
        box-shadow:
          0 18px 40px rgba(0, 0, 0, 0.38),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -10px 18px rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(20px) saturate(130%);
        -webkit-backdrop-filter: blur(20px) saturate(130%);
        cursor: pointer;
        transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        overflow: hidden;
      }

      .pf-glass-action-btn:hover {
        transform: translateY(-2px) scale(1.02);
        border-color: rgba(227, 168, 116, 0.6);
        box-shadow:
          0 22px 48px rgba(0, 0, 0, 0.42),
          0 0 18px rgba(227, 168, 116, 0.18),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
      }

      .pf-glass-action-btn:active {
        transform: translateY(0) scale(0.985);
      }

      .pf-glass-action-btn--pill {
        width: min(260px, 78vw);
        min-width: min(260px, 78vw);
        height: 64px;
        padding: 0 26px;
        border-radius: 999px;
      }

      .pf-glass-action-btn--rounded {
        border-radius: 22px;
      }

      .pf-glass-action-btn--circle {
        border-radius: 50%;
      }

      .pf-glass-action-btn__shine {
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255, 255, 255, 0.24), transparent 38%, rgba(255, 255, 255, 0.1) 52%, transparent 78%);
        pointer-events: none;
      }

      .pf-glass-action-btn__content {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
      }

      .pf-glass-action-btn__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.95);
      }

      .pf-glass-action-btn__label {
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.96);
      }

      @media (max-width: 640px) {
        .pf-chat-demo-shell {
          width: calc(100% - 24px);
          margin-left: auto;
          margin-right: auto;
        }

        .pf-chat-demo-input {
          margin: 0 4px;
          padding: 13px 14px 14px;
        }

        .pf-chat-demo-input .pf-chat-input {
          min-height: 40px;
          font-size: 14px;
        }
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

      .pf-hero-chat-container,
      .pf-hero-chat-container * {
        color: rgba(0, 0, 0, 0.9);
      }

      .pf-hero-chat-container .pf-chat-input::placeholder {
        color: rgba(0, 0, 0, 0.58);
      }

      .pf-hero-chat-container .pf-chat-time {
        opacity: 0.8;
      }

      .pf-chat-expanded::before {
        background: none;
      }

      .pf-chat-expanded,
      .pf-chat-expanded * {
        color: var(--paper);
      }

      .pf-chat-expanded .pf-chat-link,
      .pf-chat-expanded .pf-chat-md strong,
      .pf-chat-expanded .pf-chat-bullet-dot {
        color: var(--ember);
      }

      .pf-chat-expanded .pf-chat-input::placeholder {
        color: rgba(243, 236, 223, 0.7);
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

      /* Keep the hero geometry stable while mobile browser chrome expands or collapses. */
      .pf-hero-interactive {
        position: relative;
        min-height: 100svh;
        height: 100svh;
        max-height: 100svh;
        flex: 0 0 100svh;
      }

      @media (max-height: 720px) {
        .pf-hero-interactive .pf-hero-meta {
          display: none;
        }
      }

      /* ══════════ MOBILE COMPACTION ══════════ */
      @media (max-width: 960px) {
        .pf-hero-interactive {
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
        .pf-hero-interactive {
          padding: 100px 0 40px;
        }
        .pf-hero h1 { font-size: clamp(2.15rem, 10.5vw, 3rem); margin-top: 18px; max-width: 13ch; }
        .pf-hero-sub { margin-top: 16px; font-size: 14.5px; line-height: 1.6; }
        .pf-hero-actions { margin-top: 26px; gap: 10px; }
        .pf-btn { padding: 12px 20px; font-size: 10.5px; }
        .pf-btn-ghost { border: 1px solid rgba(243, 236, 223, 0.18); color: var(--paper); background: rgba(0, 0, 0, 1); }
        .pf-btn-ghost:hover { border-color: rgba(255, 119, 0, 0.9); color: var(--ember); background: rgba(226, 226, 226, 1); }

        .pf-hero-glass-chat-container { height: 460px; border-radius: 20px; }
        .pf-hero-chat-container {
          width: calc(100% - 32px);
          margin-left: 16px;
          margin-right: 16px;
        }
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