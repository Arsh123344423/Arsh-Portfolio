'use client';

import type { JSX, MutableRefObject, RefObject } from 'react';
import type { AboutContent } from './types';
import { CurvedText } from './CurvedText';

/* ────────────────────────── About ────────────────────────── */

interface AboutProps {
  about: AboutContent;
  name: string;
  role: string;
  registerReveal: (el: HTMLElement | null) => void;
}

export function About({ about, name, role, registerReveal }: AboutProps): JSX.Element {
  return (
    <section className="pf-section-ink" id="about">
      <div className="wrap">
        <div className="pf-about-grid">

          {/* LEFT — heading + bio + currently */}
          <div ref={registerReveal} className="pf-about-left">
            <span className="pf-section-eyebrow mono">About</span>
            <h2 className="pf-section-title serif">The person behind the builds</h2>
            <div className="pf-about-copy">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="pf-about-currently mono">
              <span className="pip" />
              {about.currently}
            </div>
          </div>

          {/* RIGHT — photo + identity + facts */}
          <div ref={registerReveal} className="pf-about-right">
            <div className="pf-about-photo-wrap">
              <div className="pf-about-photo-ring">
                <CurvedText id="about-ring-text" text={about.ringText} color="var(--ember)" />
              </div>
              <div className="pf-about-photo-circle">
                {about.photoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={about.photoSrc} alt={name} />
                ) : (
                  <span className="serif pf-about-photo-fallback">{about.initials}</span>
                )}
              </div>
            </div>

            <div className="pf-about-id">
              <span className="pf-about-id-name">{name}</span>
              <span className="pf-about-id-role mono">{role}</span>
            </div>

            <ul className="pf-about-facts">
              {about.facts.map((f) => (
                <li key={f.label}>
                  <span className="mono pf-about-fact-label">{f.label}</span>
                  <span className="pf-about-fact-value">{f.value}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
