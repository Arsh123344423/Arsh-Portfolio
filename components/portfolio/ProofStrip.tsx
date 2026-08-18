'use client';

import type { JSX, MutableRefObject, RefObject } from 'react';
import type { Stat } from './types';

/* ────────────────────────── ProofStrip ────────────────────────── */

interface ProofStripProps {
  stats: Stat[];
  proofGridRef: RefObject<HTMLDivElement | null>;
  proofValueRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
  registerReveal: (el: HTMLElement | null) => void;
}

/**
 * Stats strip where each figure counts up from zero the first time the
 * strip enters view. Hovering or focusing a cell reveals the one-line
 * context note behind the number.
 */
export function ProofStrip({ stats, proofGridRef, proofValueRefs, registerReveal }: ProofStripProps): JSX.Element {
  return (
    <div className="pf-section-stone pf-proof-section">
      <div className="wrap">
        <div className="pf-proof-grid" ref={proofGridRef}>
          {stats.map((s, i) => (
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
  );
}
