/**
 * Hero Section Component
 */

export function createHero() {
  return /* html */ `
    <section class="section hero-section" id="hero">
      <div class="content-wrapper hero-panel glass-panel">
        <div class="hud-badge">// PROJECT NEO-ZEN</div>
        <h1 class="glitch hero-title" data-text="CYBER SAMURAI">CYBER SAMURAI</h1>
        <p class="lead-text">
          Blending cybernetic code with ancient digital craftsmanship.
          I design, build, and deploy immersive web dimensions.
        </p>
        <div class="hero-quick-links">
          <a href="#projects" class="hero-chip">Projects</a>
          <a href="#skills" class="hero-chip">Tools</a>
          <a href="#contact" class="hero-chip hero-chip--accent">Contact</a>
        </div>
        <div class="cta-scroll-indicator">
          <span class="scroll-arrow"></span>
          <span class="scroll-text">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  `;
}
