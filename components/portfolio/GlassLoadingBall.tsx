'use client';

import type { JSX } from 'react';

interface GlassLoadingBallProps {
  label?: string;
  className?: string;
}

export function GlassLoadingBall({
  label = 'Synthesizing response...',
  className = '',
}: GlassLoadingBallProps): JSX.Element {
  return (
    <div className={`pf-glass-loader-row ${className}`} role="status" aria-live="polite">
      <div className="pf-glass-orb-loader">
        <div className="pf-glass-orb-core">
          <div className="pf-glass-orb-gradient" />
          <div className="pf-glass-orb-specular" />
          <div className="pf-glass-orb-ring" />
        </div>
        <div className="pf-glass-orb-glow" />
      </div>
      <span className="mono pf-glass-loader-label">{label}</span>
    </div>
  );
}
