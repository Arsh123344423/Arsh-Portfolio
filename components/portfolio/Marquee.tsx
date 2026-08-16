'use client';

import type { JSX, RefObject } from 'react';

/* ────────────────────────── Marquee ────────────────────────── */

interface MarqueeProps {
  marqueeWords: string[];
}

export function Marquee({ marqueeWords }: MarqueeProps): JSX.Element {
  return (
    <div className="pf-marquee-section">
      <div className="pf-marquee-track">
        {[...marqueeWords, ...marqueeWords].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
