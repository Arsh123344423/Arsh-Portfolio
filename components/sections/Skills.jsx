/**
 * Skills Section — data-driven skill cards
 */

const SKILLS = [
  {
    iconPaths: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
    title: '3D Graphics / WebGL',
    desc: 'Highly skilled in Three.js, shaders (GLSL), canvas optimisations, model rigging, and lighting architecture for real-time 60fps web experiences.',
    tags: ['Three.js', 'WebGL', 'GLSL', 'Blender'],
  },
  {
    iconPaths: <polygon points="12 2 2 22 22 22" />,
    title: 'Creative Frontend',
    desc: 'Crafting responsive, beautiful interactive UI modules using Vanilla CSS/JS, GSAP animations, canvas physics, and modern micro-frontends.',
    tags: ['GSAP', 'Next.js', 'ES6+', 'CSS Grid'],
  },
  {
    iconPaths: (
      <>
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </>
    ),
    title: 'Backend Systems',
    desc: 'Building high-speed Node.js servers, designing relational databases, integrating custom WebSockets for real-time multiplayer applications.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'WebSockets'],
  },
];

function SkillCard({ iconPaths, title, desc, tags }) {
  return (
    <div className="group bg-[rgba(6,6,18,0.8)] border border-cyber-red/10 p-9 transition-all duration-400 pointer-events-auto relative overflow-hidden hover:border-cyber-red/45 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(255,0,60,0.08)]">
      
      <div className="w-11 h-11 bg-cyber-red/10 border border-cyber-red/30 rounded-[2px] flex items-center justify-center mb-5 text-cyber-red shadow-[0_0_20px_rgba(255,0,60,0.1)] transition-all duration-300 group-hover:bg-cyber-red/20 group-hover:shadow-[0_0_30px_rgba(255,0,60,0.25)] group-hover:border-cyber-red relative z-10">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          aria-hidden="true"
        >
          {iconPaths}
        </svg>
      </div>
      <h3 className="text-[1.1rem] font-bold mb-3 tracking-[1px] text-white relative z-10">{title}</h3>
      <p className="text-[0.88rem] text-gray leading-[1.65] mb-5 relative z-10">{desc}</p>
      <div className="flex flex-wrap gap-2 relative z-10">
        {tags.map((t) => (
          <span key={t} className="font-mono text-[0.65rem] tracking-[1px] px-3 py-1 border border-cyber-blue/25 text-cyber-blue rounded-[2px] bg-cyber-blue/5 transition-all duration-200 hover:bg-cyber-blue/10 hover:border-cyber-blue hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="cyber-section bg-gradient-to-b from-transparent via-[#02020a]/70 to-transparent" id="skills">
      <div className="w-full max-w-[1140px] z-10 pointer-events-auto">
        <h2 className="text-center text-white tracking-[4px] mb-2.5 text-[clamp(1.8rem,4vw,2.8rem)] font-bold">
          MASTERY &amp; TOOLS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-11">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
