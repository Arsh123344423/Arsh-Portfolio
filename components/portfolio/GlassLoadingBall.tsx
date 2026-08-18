'use client';

import type { JSX } from 'react';
import { ParticlesOrb } from '@/registry/orbe/particles-orb/particles-orb';
import type { OrbState } from '@/registry/lib/orb-state';

export interface GlassLoadingBallProps {
  label?: string;
  className?: string;
  classNameText?: string;
  size?: number;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  state?: OrbState;
}

export function GlassLoadingBall({
  label = 'Synthesizing response...',
  className = '',
  classNameText,
  size = 32,
  speed = 1,
  colorFrom = '#facb23',
  colorTo = '#facb23',
  state = 'thinking',
}: GlassLoadingBallProps): JSX.Element {
  return (
    <div className={`pf-glass-loader-row ${className}`} role="status" aria-live="polite">
      <ParticlesOrb
        state={state}
        size={size}
        speed={speed}
        colorFrom={colorFrom}
        colorTo={colorTo}
      />
      <span className={classNameText || 'pf-glass-loader-label mono'}>{label}</span>
    </div>
  );
}

export const Assistant = () => (
  <ParticlesOrb
    state="idle"
    size={168}
    speed={1}
    colorFrom="#ff8c42"
    colorTo="#facb23"
  />
);
