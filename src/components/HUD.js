import './HUD.css';

/**
 * HUD Component
 * Renders the fixed cyber HUD overlay and the Three.js canvas viewport.
 */

/** Returns the HUD + canvas viewport HTML string. */
export function createHUD() {
  return /* html */ `
    <!-- Three.js canvas viewport (fixed behind all content) -->
    <div id="samurai-viewport" class="viewport-layer">
      <canvas id="samurai-canvas"></canvas>

      <!-- Cyber HUD UI Overlays -->
      <div class="cyber-hud-top">
        <div class="hud-left">
          <span class="hud-tag">ID: RONIN-01</span>
          <span class="hud-latency">LATENCY: 12MS</span>
        </div>
        <div class="hud-right">
          <span class="hud-status-ready">SYS ONLINE</span>
        </div>
      </div>

      <div class="cyber-hud-decor border-left"></div>
      <div class="cyber-hud-decor border-right"></div>
    </div>
  `;
}
