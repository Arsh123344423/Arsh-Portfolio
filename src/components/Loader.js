import './Loader.css';

/**
 * Loader Component
 * Renders the full-screen landing/loader overlay into the DOM.
 */

/** Returns the loader HTML string. */
export function createLoader() {
  return /* html */ `
    <div id="loader-container">
      <div class="landing-bg-layer" aria-hidden="true"></div>
      <div class="landing-scanlines" aria-hidden="true"></div>

      <div class="landing-content">
        <div class="landing-tag">// SYSTEM ACCESS //</div>
        <h1 class="landing-title glitch" data-text="NEO-ZEN">NEO-ZEN</h1>
        <p class="landing-subtitle">AN INTERACTIVE 3D DIGITAL DIMENSION</p>
        <p class="landing-desc">
          Immersive WebGL portfolio — scroll through projects, tools, and contact
          after you enter the samurai dimension.
        </p>

        <div class="landing-action">
          <button id="enter-btn" class="ready">UNLOCK THE REALITY</button>
          <div class="loader-subtext" id="loader-subtext">CLICK TO UNLEASH THE SENSES</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Fades out and hides the loader overlay.
 * @param {number} [delay=0] - milliseconds before starting the fade
 */
export function hideLoader(delay = 0) {
  const el = document.getElementById('loader-container');
  if (!el) return;

  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.visibility = 'hidden';
      el.style.pointerEvents = 'none';
    }, 800);
  }, delay);
}
