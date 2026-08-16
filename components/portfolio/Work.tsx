'use client';

import type { JSX } from 'react';
import type { WorkItem } from './types';

/* ────────────────────────── Work ────────────────────────── */

interface WorkProps {
  work: WorkItem[];
  registerReveal: (el: HTMLElement | null) => void;
}

export function Work({ work, registerReveal }: WorkProps): JSX.Element {
  return (
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
          {work.map((w) => (
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
  );
}
