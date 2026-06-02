'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollAnimations — Sets up all GSAP ScrollTrigger animations.
 * Dynamically imports gsap to avoid SSR issues.
 */
export default function ScrollAnimations() {
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    // Dynamic import — GSAP doesn't support SSR
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapModule, scrollModule]) => {
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default;

      gsap.registerPlugin(ScrollTrigger);

      // Skill cards stagger in
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '#skills',
          start: 'top center+=150',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Project cards scale in
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top center+=150',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Contact panel slides in
      gsap.from('#contact .glass-panel', {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top center+=150',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      });
    });
  }, []);

  return null; // Side-effect only, no DOM
}
