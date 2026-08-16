'use client';

import type { JSX } from 'react';

/* ────────────────────────── Nav ────────────────────────── */

interface NavProps {
  name: string;
  navLinks: { label: string; href: string }[];
  scrolled: boolean;
}

export function Nav({ name, navLinks, scrolled }: NavProps): JSX.Element {
  return (
    <nav className={`pf-nav mono${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-mark"><span className="dot" />{name}</div>
      <div className="pf-links mono">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <a href="#contact" className="pf-nav-cta mono">Let&apos;s talk</a>
    </nav>
  );
}
