'use client';

import type { JSX } from 'react';

/* ────────────────────────── Cta ────────────────────────── */

interface CtaProps {
  email: string;
}

export function Cta({ email }: CtaProps): JSX.Element {
  return (
    <section className="pf-cta">
      <div className="wrap" id="contact">
        <span className="pf-section-eyebrow mono" style={{ display: 'block', marginBottom: 20 }}>Get in touch</span>
        <h2 className="serif">Got a product<br />worth <em>building?</em></h2>
        <p>Tell me what you&apos;re working on — I reply to every message within a couple of days.</p>
        <a href={`mailto:${email}`} className="pf-cta-email">{email}</a>
      </div>
    </section>
  );
}
