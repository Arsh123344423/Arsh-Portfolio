'use client';

import type { JSX } from 'react';
import type { Capability } from './types';

/* ────────────────────────── Capabilities ────────────────────────── */

interface CapabilitiesProps {
  capabilities: Capability[];
  registerReveal: (el: HTMLElement | null) => void;
}

export function Capabilities({ capabilities, registerReveal }: CapabilitiesProps): JSX.Element {
  return (
    <section className="pf-section-stone" id="capabilities">
      <div className="wrap">
        <div className="pf-section-head">
          <div>
            <span className="pf-section-eyebrow mono">Capabilities deck</span>
            <h2 className="pf-section-title serif">What I bring to the table</h2>
          </div>
          <p className="pf-section-note">Six disciplines, one continuous process. From the first sketch to the shipped build.</p>
        </div>

        <div className="pf-deck">
          {capabilities.map((c) => (
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
  );
}
