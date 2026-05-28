/**
 * Skills Section Component
 */

const SKILLS = [
  {
    icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>`,
    title: '3D Graphics / WebGL',
    desc: 'Highly skilled in Three.js, shaders (GLSL), canvas optimisations, model rigging, and lighting architecture for real-time 60fps web experiences.',
    tags: ['Three.js', 'WebGL', 'GLSL', 'Blender'],
  },
  {
    icon: `<polygon points="12 2 2 22 22 22"/>`,
    title: 'Creative Frontend',
    desc: 'Crafting responsive, beautiful interactive UI modules using Vanilla CSS/JS, GSAP animations, canvas physics, and modern micro-frontends.',
    tags: ['GSAP', 'Vite', 'ES6+', 'CSS Grid'],
  },
  {
    icon: `<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
           <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
           <line x1="6" y1="6" x2="6.01" y2="6"/>
           <line x1="6" y1="18" x2="6.01" y2="18"/>`,
    title: 'Backend Systems',
    desc: 'Building high-speed Node.js servers, designing relational databases, integrating custom WebSockets for real-time multiplayer applications.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'WebSockets'],
  },
];

function skillCard({ icon, title, desc, tags }) {
  return /* html */ `
    <div class="skill-card">
      <div class="skill-icon">
        <svg viewBox="0 0 24 24" width="24" height="24"
             stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true">
          ${icon}
        </svg>
      </div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="tags">
        ${tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;
}

export function createSkills() {
  return /* html */ `
    <section class="section skills-section" id="skills">
      <div class="content-wrapper">
        <h2 class="section-title text-center">MASTERY &amp; TOOLS</h2>
        <div class="skills-grid">
          ${SKILLS.map(skillCard).join('')}
        </div>
      </div>
    </section>
  `;
}
