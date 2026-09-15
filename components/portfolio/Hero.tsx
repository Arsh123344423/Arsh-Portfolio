'use client';

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import type { JSX, RefObject, MutableRefObject } from 'react';
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
      <ShaderGradientCanvas
        className="pf-hero-shader-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        pixelDensity={1}
        fov={45}
        preserveDrawingBuffer={false}
        powerPreference="high-performance"
      >
        <ShaderGradient
          type="waterPlane"
          cDistance={3.6}
          cPolarAngle={90}
          cameraZoom={3}
          enableCameraUpdate={false}
          zoomOut={false}
          positionX={0}
          positionY={0.9}
          positionZ={-0.3}
          color1="#c37044"
        />
      </ShaderGradientCanvas>

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

      <div className="wrap pf-hero-content-wrap pf-hero-welcome-wrap">
        <h1 className="serif pf-hero-welcome">
          <span className="pf-welcome-text">WELCOME TO THE PORTFOLIO OF</span>{" "}
          <span className="pf-hero-title">ARSH</span>
        </h1>
        <div className="pf-hero-chat-wrapper">
          <HeroChat />
        </div>
      </div>
      {/* Scroll metadata cue at bottom */}
      <div className="pf-hero-meta mono">
        
        <div className="pf-scroll-cue" style={{ textAlign: 'right' }}>{location}</div>
      </div>
    </section>
  );
}
