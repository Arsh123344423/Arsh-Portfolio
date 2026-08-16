'use client';

import { useEffect, useRef, useState, useCallback, type JSX } from 'react';

/**
 * Portfolio — single-page, editorial-styled personal portfolio.
 *
 * Design language: warm stone / deep ink chambers that alternate down the
 * page, a whisper-scale serif display (big, regular weight — commands
 * through size, not boldness), thick border-driven cards with no shadows,
 * and a single continuous "flow line" that threads the hero into the
 * capabilities deck as the page's signature element.
 *
 * All copy is data-driven via the `data` prop so this is safe to drop into
 * a Next.js app and customize without touching markup.
 */

/* ────────────────────────── Types ────────────────────────── */

export interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
  /** CSS gradient used for the placeholder thumbnail — swap for a real image later */
  gradient: string;
}

export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  /** Optional one-line context, revealed on hover/focus — what the number actually means */
  note?: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutContent {
  paragraphs: string[];
  facts: AboutFact[];
  currently: string;
  initials: string;
  /** Optional photo URL — omit to show the initials monogram as a fallback */
  photoSrc?: string;
  /** Text that repeats around the curved ring — include your own separators/spacing, it loops as-is */
  ringText: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  email: string;
  location: string;
  heroLines: string[];
  heroSub: string;
  navLinks: { label: string; href: string }[];
  disciplines: string[];
  marqueeWords: string[];
  about: AboutContent;
  capabilities: Capability[];
  work: WorkItem[];
  stats: Stat[];
  socials: { label: string; href: string }[];
}

export interface PortfolioProps {
  data?: Partial<PortfolioData>;
}

/* ────────────────────────── Default content ────────────────────────── */

const DEFAULT_DATA: PortfolioData = {
  name: 'Arsh Srivastava',
  role: 'AI · Full-Stack · 3D Developer',
  email: 'hello@arshsrivastava.dev',
  location: 'India · GMT+5:30',
  heroLines: ['Building products', 'at the edge of', 'code and AI.'],
  heroSub:
    "I design and build full-stack products with AI woven in from the first line of code — interfaces that think, and 3D experiences that feel alive in the browser.",
  navLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  disciplines: ['AI / ML', 'Full-Stack', '3D / WebGL', 'Systems'],
  marqueeWords: [
    'AI-Native Products',
    'Full-Stack Engineering',
    'Three.js & WebGL',
    'Real-Time Systems',
    'Design Systems',
    'Motion & Interaction',
  ],
  about: {
    paragraphs: [
      "I'm Arsh Srivastava, currently a final year B.Tech student. I'm a full-stack software developer who builds products where AI isn't a bolted-on feature, it's part of the architecture from day one. Most of my work sits at the intersection of a fast, well-engineered backend and an interface that feels considered rather than assembled.",
      "I am also a national level team sports player which proves I am not only a team player but also someone who takes casre of his health. I love to interact with people and learn as many new skills as possible."
    ],
    facts: [
      { label: 'Based in', value: 'India, working globally' },
      { label: 'Stack', value: 'TypeScript, Next.js, Python, Three.js' },
      { label: 'Open to', value: 'Freelance & collaborations' },
    ],
    currently: 'Currently building AI-native tooling and experimenting with real-time 3D interfaces.',
    initials: 'AS',
    photoSrc: '/Arsh Image.png',
    ringText: 'AVAILABLE FOR WORK  ✦  ARSH SRIVASTAVA  ✦  AVAILABLE FOR WORK  ✦  ARSH SRIVASTAVA  ✦  ',
  },
  capabilities: [
    { id: 'c1', number: '01', title: 'AI & ML Integration', description: 'LLM-powered features, agentic workflows, and RAG pipelines built into the product, not bolted on after.', tags: ['OpenAI', 'LangChain', 'Vector DBs'] },
    { id: 'c2', number: '02', title: 'Full-Stack Engineering', description: 'End-to-end product builds — typed APIs, real databases, and interfaces that hold up under real usage.', tags: ['Next.js', 'Node.js', 'PostgreSQL'] },
    { id: 'c3', number: '03', title: '3D & WebGL', description: 'Interactive three.js scenes and product visualizations, optimized to actually run well on real devices.', tags: ['Three.js', 'R3F', 'Shaders'] },
    { id: 'c4', number: '04', title: 'Motion & Interaction', description: 'Purposeful micro-interactions and page transitions that reinforce what the interface is doing.', tags: ['anime.js', 'GSAP', 'Framer Motion'] },
    { id: 'c5', number: '05', title: 'Design Systems', description: 'Token-driven component libraries that keep a fast-moving product consistent as it scales.', tags: ['Figma', 'Tokens', 'Storybook'] },
    { id: 'c6', number: '06', title: 'Product Design', description: 'Interfaces grounded in real user flows — from a rough wireframe through to shipped UI.', tags: ['UX', 'Prototyping', 'Systems Thinking'] },
  ],
  work: [
    {
      id: 'w1',
      title: 'Cortex — AI Research Copilot',
      year: '2026',
      description: 'An AI copilot that reads, summarizes, and cross-references research papers in real time, with a RAG pipeline over a user\u2019s own library.',
      tags: ['Next.js', 'LangChain', 'PostgreSQL'],
      link: '#',
      gradient: 'linear-gradient(135deg, #2a2115, #e3a874 150%)',
    },
    {
      id: 'w2',
      title: 'Aether — 3D Product Configurator',
      year: '2025',
      description: 'A real-time three.js configurator letting customers customize and rotate a product in the browser before checkout, with no app to install.',
      tags: ['Three.js', 'React Three Fiber', 'WebGL'],
      link: '#',
      gradient: 'linear-gradient(135deg, #172119, #6f9179 150%)',
    },
    {
      id: 'w3',
      title: 'Loop — Team Automation Platform',
      year: '2025',
      description: 'A full-stack workflow automation tool for small teams — trigger-based actions across email, Slack, and internal tools.',
      tags: ['Node.js', 'TypeScript', 'Redis'],
      link: '#',
      gradient: 'linear-gradient(135deg, #1e1a22, #a48fc2 150%)',
    },
    {
      id: 'w4',
      title: 'Signal — Realtime Analytics Dashboard',
      year: '2024',
      description: 'A live analytics dashboard streaming event data over websockets, built for teams who need to watch numbers move, not refresh a page.',
      tags: ['Next.js', 'WebSockets', 'D3.js'],
      link: '#',
      gradient: 'linear-gradient(135deg, #221a1a, #c98a7e 150%)',
    },
    {
      id: 'w5',
      title: 'Nimbus — Voice-First Notes App',
      year: '2024',
      description: 'A voice-to-structured-notes app using speech-to-text plus an LLM cleanup pass, so a rough voice memo comes out as clean, formatted notes.',
      tags: ['Whisper API', 'React Native', 'GPT-4'],
      link: '#',
      gradient: 'linear-gradient(135deg, #1a1f2a, #7e9bc9 150%)',
    },
    {
      id: 'w6',
      title: 'Kiln — Portfolio Site for a Ceramicist',
      year: '2023',
      description: 'A quiet, gallery-style portfolio site for an independent ceramicist, built around large imagery and almost no chrome.',
      tags: ['Next.js', 'Sanity CMS', 'GSAP'],
      link: '#',
      gradient: 'linear-gradient(135deg, #22201a, #cbb787 150%)',
    },
  ],
  stats: [
    { id: 's1', value: '4', suffix: '+', label: 'Years Building', note: 'From first line of code to shipped, maintained products.' },
    { id: 's2', value: '20', suffix: '+', label: 'Products Shipped', note: 'Across web, mobile, and embedded 3D contexts.' },
    { id: 's3', value: '8', label: 'AI-Native Products', note: 'AI woven into the architecture, never bolted on after.' },
    { id: 's4', value: '100', suffix: '%', label: 'Design-to-Code Handoff', note: 'Every pixel and token accounted for in the build.' },
  ],
  socials: [
    { label: 'Twitter', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
};

/* ────────────────────────── CurvedText ────────────────────────── */

export interface CurvedTextProps {
  /** The string to lay along the circle — repeat it yourself with separators so it fills the loop */
  text: string;
  /** Unique id — required whenever more than one CurvedText renders on the same page (SVG <path> ids must be unique) */
  id: string;
  /** Outer diameter used for the path math. The SVG itself scales to fill its container via CSS, so this mainly controls text curvature, not rendered size. */
  size?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  fontFamily?: string;
  /** Fraction (0–1) of the radius the text sits on — 1 = right at the edge, lower pulls it inward */
  textRadiusRatio?: number;
  className?: string;
}

/**
 * Renders text curved around a full circle using an invisible SVG <path>
 * plus <textPath>. Drop it inside a fixed-size, positioned wrapper and spin
 * that wrapper with CSS for the classic "rotating badge" effect — see
 * .pf-about-photo-ring / @keyframes pf-spin below for the reference usage.
 */
function CurvedText({
  text,
  id,
  size = 200,
  fontSize = 12,
  letterSpacing = 3,
  color = 'currentColor',
  fontFamily = "'JetBrains Mono', monospace",
  textRadiusRatio = 0.92,
  className,
}: CurvedTextProps): JSX.Element {
  const center = size / 2;
  const r = center * textRadiusRatio;

  // Full-circle path built from two semicircle arcs so <textPath> can flow all the way around.
  const pathD = `M ${center - r},${center} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className={className}
      aria-hidden
    >
      <defs>
        <path id={id} d={pathD} fill="none" />
      </defs>
      <text fontSize={fontSize} fill={color} fontFamily={fontFamily} style={{ letterSpacing }}>
        <textPath href={`#${id}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/* ────────────────────────── Component ────────────────────────── */

export default function Portfolio({ data }: PortfolioProps): JSX.Element {
  const d: PortfolioData = { ...DEFAULT_DATA, ...data };

  const [scrolled, setScrolled] = useState(false);

  const heroLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroActionsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const disciplineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealRefs = useRef<HTMLElement[]>([]);

  const proofGridRef = useRef<HTMLDivElement>(null);
  const proofValueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const registerReveal = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
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

  /* ── Scroll listener for nav chrome ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Custom tracking cursor, page-wide ──
     mix-blend-mode: difference on a plain HTML element (not nested in an
     <svg> — that's what makes it work) blends the dot's paper color against
     whatever's directly beneath it: light over the dark ink chambers, and
     it flips to near-black on its own over the light stone chambers. No
     manual "which section am I over" tracking needed. Fine-pointer devices
     only, and falls back to an instant (non-lerped) follow under
     prefers-reduced-motion. */
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

    const showCursor = () => {
      if (visible) return;
      visible = true;
      cursor.style.opacity = '1';
    };
    const hideCursor = () => {
      visible = false;
      cursor.style.opacity = '0';
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      showCursor();
    };

    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(target?.closest('a, button, [role="button"]'));
      cursor.classList.toggle('pf-cursor--active', interactive);
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
  }, []);

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
  }, []);

  /* ── Proof strip: numbers count up from zero once the strip enters view ──
     A quiet nod to the "systems / real-time" thread running through the
     work section — the one place on the page where a number is caught
     mid-motion instead of sitting static. Respects reduced-motion by
     writing the final value immediately with no animation. */
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
        d.stats.forEach((s, i) => {
          const el = proofValueRefs.current[i];
          if (!el) return;
          const target = parseFloat(s.value);
          if (Number.isNaN(target)) {
            el.textContent = s.value;
            return;
          }
          if (reduceMotion) {
            el.textContent = s.value;
            return;
          }
          const counter = { val: 0 };
          anime({
            targets: counter,
            val: target,
            round: 1,
            duration: 1300,
            delay: i * 90,
            easing: 'easeOutCubic',
            update: () => {
              el.textContent = String(counter.val);
            },
          });
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(gridEl);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d.stats]);

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <div ref={cursorRef} className="pf-cursor" aria-hidden />
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
        .pf-cta { text-align: center; padding: 160px 0; }
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

      {/* ── NAV ── */}
      <nav className={`pf-nav mono${scrolled ? ' scrolled' : ''}`}>
        <div className="pf-mark"><span className="dot" />{d.name}</div>
        <div className="pf-links mono">
          {d.navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a href="#contact" className="pf-nav-cta mono">Let&apos;s talk</a>
      </nav>

      {/* ── HERO ── */}
      <section className="pf-hero" onMouseMove={handleHeroMouseMove}>
        <div className="pf-hero-grid" aria-hidden />
        <div ref={spotlightRef} className="pf-hero-spotlight" aria-hidden />

        {d.disciplines.map((label, i) => {
          const positions = [
            { top: '22%', left: '6%' },
            { top: '22%', right: '6%' },
            { bottom: '18%', left: '5%' },
            { bottom: '18%', right: '5%' },
          ];
          const pos = positions[i % positions.length];
          return (
            <div
              key={label}
              className="pf-discipline mono"
              style={pos}
              ref={(el) => { disciplineRefs.current[i] = el; }}
            >
              <span className="pip" />
              <span className="lbl">{label}</span>
            </div>
          );
        })}

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="serif">
            {d.heroLines.map((line, i) => (
              <span className="pf-line" key={i}>
                <span ref={(el) => { heroLineRefs.current[i] = el; }}>
                  {i === d.heroLines.length - 1 ? (
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
          <p ref={heroSubRef} className="pf-hero-sub">{d.heroSub}</p>
          <div ref={heroActionsRef} className="pf-hero-actions mono">
            <a href="#work" className="pf-btn pf-btn-solid">View Work</a>
            <a href="#contact" className="pf-btn pf-btn-ghost">Start a Project</a>
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
          <div className="pf-scroll-cue" style={{ textAlign: 'right' }}>{d.location}</div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="pf-marquee-section">
        <div className="pf-marquee-track">
          {[...d.marqueeWords, ...d.marqueeWords].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="pf-section-ink" id="about">
        <div className="wrap">
          <div className="pf-about-grid">

            {/* LEFT — heading + bio + currently */}
            <div ref={registerReveal} className="pf-about-left">
              <span className="pf-section-eyebrow mono">About</span>
              <h2 className="pf-section-title serif">The person behind the builds</h2>
              <div className="pf-about-copy">
                {d.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pf-about-currently mono">
                <span className="pip" />
                {d.about.currently}
              </div>
            </div>

            {/* RIGHT — photo + identity + facts */}
            <div ref={registerReveal} className="pf-about-right">
              <div className="pf-about-photo-wrap">
                <div className="pf-about-photo-ring">
                  <CurvedText id="about-ring-text" text={d.about.ringText} color="var(--ember)" />
                </div>
                <div className="pf-about-photo-circle">
                  {d.about.photoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={d.about.photoSrc} alt={d.name} />
                  ) : (
                    <span className="serif pf-about-photo-fallback">{d.about.initials}</span>
                  )}
                </div>
              </div>

              <div className="pf-about-id">
                <span className="pf-about-id-name">{d.name}</span>
                <span className="pf-about-id-role mono">{d.role}</span>
              </div>

              <ul className="pf-about-facts">
                {d.about.facts.map((f) => (
                  <li key={f.label}>
                    <span className="mono pf-about-fact-label">{f.label}</span>
                    <span className="pf-about-fact-value">{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── CAPABILITIES DECK ── */}
      <section className="pf-section-stone" id="capabilities">
        <div className="wrap">
          <div className="pf-section-head">
            <div>
              <span className="pf-section-eyebrow mono">Capabilities deck</span>
              <h2 className="pf-section-title serif">What I bring to the table</h2>
            </div>
            <p className="pf-section-note">Six disciplines, one continuous process — from the first sketch to the shipped build.</p>
          </div>

          <div className="pf-deck">
            {d.capabilities.map((c) => (
              <div className="pf-deck-card" key={c.id} ref={registerReveal}>
                <span className="pf-deck-num mono">{c.number}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className="pf-deck-tags">
                  {c.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className="pf-section-ink" id="work">
        <div className="wrap">
          <div className="pf-section-head">
            <div>
              <span className="pf-section-eyebrow mono">Selected work</span>
              <h2 className="pf-section-title serif">A few recent builds</h2>
            </div>
            <p className="pf-section-note">Thumbnails are gradient placeholders — swap in real screenshots or renders when you have them.</p>
          </div>

          <div className="pf-work-grid">
            {d.work.map((w) => (
              <div className="pf-work-card" key={w.id} ref={registerReveal}>
                <div className="pf-work-thumb" style={{ background: w.gradient }}>
                  <span className="pf-work-thumb-label">Case Study</span>
                </div>
                <div className="pf-work-info">
                  <div className="pf-work-info-head">
                    <h3>{w.title}</h3>
                    <span className="mono">{w.year}</span>
                  </div>
                  <p className="pf-work-desc">{w.description}</p>
                  <div className="pf-work-foot">
                    <div className="pf-work-tags">
                      {w.tags.map((t) => <span key={t} className="mono">{t}</span>)}
                    </div>
                    {w.link && (
                      <a href={w.link} className="pf-work-link mono">View project →</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ──
          Each figure counts up on first view; hover or focus a cell to read
          the one line of context behind the number. */}
      <div className="pf-section-stone pf-proof-section">
        <div className="wrap">
          <div className="pf-proof-grid" ref={proofGridRef}>
            {d.stats.map((s, i) => (
              <div className="pf-proof-cell" key={s.id} ref={registerReveal} tabIndex={0}>
                <div className="pf-proof-num">
                  <span ref={(el) => { proofValueRefs.current[i] = el; }}>0</span>
                  {s.suffix && <span className="accent">{s.suffix}</span>}
                </div>
                <div className="pf-proof-label mono">{s.label}</div>
                {s.note && <div className="pf-proof-note">{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="pf-cta" id="contact">
        <div className="wrap">
          <span className="pf-section-eyebrow mono" style={{ display: 'block', marginBottom: 20 }}>Get in touch</span>
          <h2 className="serif">Got a product<br />worth <em>building?</em></h2>
          <p>Tell me what you&apos;re working on — I reply to every message within a couple of days.</p>
          <a href={`mailto:${d.email}`} className="pf-cta-email">{d.email}</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pf-footer mono">
        <div className="wrap pf-footer-row">
          <span>© 2026 {d.name}</span>
          <div className="pf-footer-links">
            {d.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
          </div>
          <span>Back to top ↑</span>
        </div>
      </footer>
    </div>
  );
}