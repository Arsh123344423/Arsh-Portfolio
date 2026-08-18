'use client';

import type { JSX } from 'react';

/* ────────────────────────── Footer ────────────────────────── */

interface FooterProps {
  name: string;
  socials: { label: string; href: string }[];
}

export function Footer({ name, socials }: FooterProps): JSX.Element {
  return (
    <footer className="pf-footer mono">
      <div className="wrap pf-footer-row">
        <span>© 2026 {name}</span>
        <div className="pf-footer-links">
          {socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
        </div>
        <a href='#hero'>
          <span>Back to top ↑</span>
        </a>
      </div>
    </footer>
  );
}
