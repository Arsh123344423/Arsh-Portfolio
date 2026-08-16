'use client';

import { useState } from 'react';
import OrbReveal from '@/components/OrbReveal';
import Portfolio from '@/components/Portfolio';

/**
 * Root landing page.
 * OrbReveal sits as a fixed overlay on top of the static Portfolio.
 * As the user scrolls, the orb expands to fill the screen with its color (#f3ecdf),
 * then smoothly slides up like a curtain to reveal the portfolio.
 * Once the slide animation finishes, OrbReveal is unmounted.
 */
export default function LandingPage() {
  const [showOrb, setShowOrb] = useState(true);

  return (
    <>
      {showOrb && (
        <OrbReveal
          name="Arsh Srivastava"
          role="AI · Full-Stack · Software Developer"
          onComplete={() => setShowOrb(false)}
        />
      )}
      <Portfolio />
    </>
  );
}
