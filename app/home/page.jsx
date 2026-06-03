'use client';

// UI Components
import Nav              from '@/components/Nav';
import ScrollAnimations from '@/components/ScrollAnimations';

// Sections
import Hero     from '@/components/sections/Hero';
import About    from '@/components/sections/About';
import Skills   from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import AudioControl from '@/components/AudioControl';

import Contact  from '@/components/sections/Contact';

/**
 * Portfolio Home Page
 * Hosted on /home, ensuring zero overlap with the landing page.
 */
export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <AudioControl />
      {/* Scrollable content sections */}
      <div id="scroll-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* GSAP scroll-triggered animations */}
      <ScrollAnimations />
    </>
  );
}
