/**
 * Projects Section Component
 */

const PROJECTS = [
  {
    id:    '01',
    glow:  'red-glow',
    title: 'PROJECT CHRONOS',
    desc:  'An interactive temporal database visualiser featuring custom GPU particle streams and spatial sorting layouts.',
    live:  '#',
    info:  '#',
  },
  {
    id:    '02',
    glow:  'blue-glow',
    title: 'VIRTUAL GRID',
    desc:  'A multiplayer Three.js simulation where users construct customised cyber rooms using pre-loaded GLTF assets.',
    live:  '#',
    info:  '#',
  },
  {
    id:    '03',
    glow:  'red-glow',
    title: 'NEURAL SLICE',
    desc:  'A WebGL cutting mechanics prototype utilising real-time mesh CSG clipping and shader sparks.',
    live:  '#',
    info:  '#',
  },
];

function projectCard({ id, glow, title, desc, live, info }) {
  return /* html */ `
    <article class="project-card">
      <div class="project-image-placeholder ${glow}">
        <div class="project-num">${id}</div>
      </div>
      <div class="project-info">
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="project-links">
          <a href="${info}" class="btn-link">SYSTEM INFO</a>
          <a href="${live}" class="btn-link secondary">LAUNCH</a>
        </div>
      </div>
    </article>
  `;
}

export function createProjects() {
  return /* html */ `
    <section class="section projects-section" id="projects">
      <div class="content-wrapper-wide">
        <h2 class="section-title text-center">THE PROJECTS</h2>
        <div class="project-slider">
          ${PROJECTS.map(projectCard).join('')}
        </div>
      </div>
    </section>
  `;
}
