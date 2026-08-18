'use client';

import type { JSX } from 'react';
import type { CurvedTextProps } from './types';

/* ────────────────────────── CurvedText ────────────────────────── */

/**
 * Renders text curved around a full circle using an invisible SVG <path>
 * plus <textPath>. Drop it inside a fixed-size, positioned wrapper and spin
 * that wrapper with CSS for the classic "rotating badge" effect — see
 * .pf-about-photo-ring / @keyframes pf-spin below for the reference usage.
 */
export function CurvedText({
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
