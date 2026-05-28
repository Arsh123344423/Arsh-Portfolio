import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimations
 * Configures all GSAP ScrollTrigger animations for the portfolio.
 *
 * @param {{
 *   camera: THREE.PerspectiveCamera,
 *   model:  THREE.Group,
 * }} opts
 */
export function setupScrollAnimations() {
  // ── Skill cards stagger in ─────────────────────────────────────────────
  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '#skills',
      start:         'top center+=150',
      toggleActions: 'play none none reverse',
    },
    y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out',
  });

  // ── Project cards scale in ─────────────────────────────────────────────
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '#projects',
      start:         'top center+=150',
      toggleActions: 'play none none reverse',
    },
    scale: 0.9, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)',
  });

  // ── Contact panel slides in ────────────────────────────────────────────
  gsap.from('#contact .glass-panel', {
    scrollTrigger: {
      trigger: '#contact',
      start:         'top center+=150',
      toggleActions: 'play none none reverse',
    },
    y: 40, opacity: 0, duration: 0.9, ease: 'power2.out',
  });
}
