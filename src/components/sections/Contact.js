/**
 * Contact Section Component
 */

export function createContact() {
  return /* html */ `
    <section class="section contact-section" id="contact">
      <div class="content-wrapper glass-panel">
        <div class="panel-header">
          <span class="panel-dot"></span>
          <span class="panel-title">ESTABLISH PORTAL LINK</span>
        </div>
        <h2>NEXUS CONNECT</h2>
        <p>
          Ready to build the next dimension? Send a neural signal to establish contact.
          I am currently open for full-time contracts, creative collaborations, and
          high-impact web design projects.
        </p>

        <form class="contact-form" id="contact-form"
              onsubmit="event.preventDefault(); alert('Signal Transmitted.');">
          <div class="form-group">
            <label for="contact-name">CODENAME / NAME</label>
            <input type="text" id="contact-name" name="name"
                   required placeholder="e.g. Ronin 08" />
          </div>
          <div class="form-group">
            <label for="contact-email">SIGNAL ADDR / EMAIL</label>
            <input type="email" id="contact-email" name="email"
                   required placeholder="e.g. cyber@domain.com" />
          </div>
          <div class="form-group">
            <label for="contact-message">TRANSMISSION DATA / MESSAGE</label>
            <textarea id="contact-message" name="message"
                      rows="4" required placeholder="What are we building..."></textarea>
          </div>
          <button type="submit" class="btn-cyber-submit">TRANSMIT NEURAL SIGNAL</button>
        </form>
      </div>
    </section>
  `;
}
