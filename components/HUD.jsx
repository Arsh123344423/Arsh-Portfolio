'use client';

import { useEffect, useRef } from 'react';

/**
 * HUD — Fixed cyber HUD overlay + Three.js canvas viewport.
 *
 * The samurai viewport fades in/out based on whether the #hero section
 * is visible. When the user scrolls past it, the samurai disappears.
 * It is never visible on any other section.
 */
export default function HUD({ canvasRef }) {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Start hidden — SamuraiCanvas will load asynchronously
    // and the hero will bring it in via IntersectionObserver below.
    viewport.style.opacity = '0';
    viewport.style.transition = 'opacity 0.6s ease';

    // Watch the hero section. When it's in view → show; when gone → hide.
    const hero = document.getElementById('hero');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        viewport.style.opacity = entry.isIntersecting ? '1' : '0';
        // Disable pointer events when hidden so hidden canvas doesn't eat clicks
        viewport.style.pointerEvents = entry.isIntersecting ? 'none' : 'none';
      },
      {
        // Threshold 0 means fire as soon as ANY pixel of #hero enters/leaves
        threshold: 0,
        // shrink the top margin so the canvas hides quickly as user scrolls down
        rootMargin: '0px 0px -30% 0px',
      }
    );

    io.observe(hero);

    return () => io.disconnect();
  }, []);

  return (
    <div id="samurai-viewport" className="viewport-layer" ref={viewportRef}>
      <canvas id="samurai-canvas" ref={canvasRef} />

      {/* Cyber HUD overlays */}
      <div className="cyber-hud-top">
        <div className="hud-left">
          <span className="hud-tag">ID: RONIN-01</span>
          <span className="hud-latency">LATENCY: 12MS</span>
        </div>
        <div className="hud-right">
          <span className="hud-status-ready">SYS ONLINE</span>
        </div>
      </div>

      <div className="cyber-hud-decor border-left" />
      <div className="cyber-hud-decor border-right" />
    </div>
  );
}
