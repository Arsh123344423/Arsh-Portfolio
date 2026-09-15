'use client';

import type { JSX } from 'react';
import './Marquee.css';

/* ────────────────────────── Marquee ────────────────────────── */

export interface MarqueeProps {
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
