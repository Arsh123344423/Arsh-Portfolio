/**
 * About Section Component
 */

export function createAbout() {
  return /* html */ `
    <section class="section about-section" id="about">
      <div class="content-wrapper glass-panel">
        <div class="panel-header">
          <span class="panel-dot"></span>
          <span class="panel-title">SYSTEM FILE: AGENT.LOG</span>
        </div>
        <h2>THE RONIN</h2>
        <p>
          I am a creative full-stack developer specialising in bringing complex 3D
          graphics, interactive frontends, and robust backend logic together in the browser.
        </p>
        <p>
          My philosophy is like the bushido code of the digital age: precision,
          mastery of tools, and an unwavering commitment to aesthetics and speed.
        </p>
        <div class="system-stats">
          <div class="stat-box">
            <span class="stat-num">08+</span>
            <span class="stat-lbl">Years Code</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">50+</span>
            <span class="stat-lbl">Systems Shipped</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">100%</span>
            <span class="stat-lbl">Aesthetic Rating</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
