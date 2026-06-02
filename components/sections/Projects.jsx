'use client';

/**
 * Projects Section — data-driven project cards.
 */

const PROJECTS = [
  {
    id:         '01',
    glow:       'red',
    title:      'PROJECT CHRONOS',
    desc:       'An interactive temporal database visualiser featuring custom GPU particle streams and spatial sorting layouts.',
    live:       '#',
    info:       '#',
    featured:   false,
  },
  {
    id:         '00',
    glow:       'red',
    title:      'PROJECT NEO-ZEN',
    desc:       'The very portfolio you are standing in — an immersive WebGL dimension built with Next.js, Three.js, GSAP scroll triggers, and a cyber-samurai guardian.',
    live:       '#',
    info:       '#',
    featured:   true,
  },
  {
    id:         '02',
    glow:       'blue',
    title:      'VIRTUAL GRID',
    desc:       'A multiplayer Three.js simulation where users construct customised cyber rooms using pre-loaded GLTF assets.',
    live:       '#',
    info:       '#',
    featured:   false,
  },
  {
    id:         '03',
    glow:       'red',
    title:      'NEURAL SLICE',
    desc:       'A WebGL cutting mechanics prototype utilising real-time mesh CSG clipping and shader sparks.',
    live:       '#',
    info:       '#',
    featured:   false,
  },
];

function FeaturedCard({ id, title, desc, live, info }) {
  return (
    <article className="group flex flex-col md:flex-row mb-11 min-h-[360px] bg-[rgba(5,5,16,0.9)] border border-cyber-red/30 rounded-[2px] shadow-[0_12px_60px_rgba(0,0,0,0.7)] transition-all duration-400 pointer-events-auto hover:border-cyber-red hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_100px_rgba(255,0,60,0.15)] overflow-hidden">
      
      <div className="relative flex-none h-[260px] md:h-auto md:w-[55%] border-b md:border-b-0 md:border-r border-cyber-red/20 bg-gradient-to-br from-[#08080f] to-[#0d0d1a] overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-cyber-red rounded-full opacity-20 blur-[80px] z-0" />
        
        <div className="absolute z-10 font-mono text-[4.5rem] font-black text-white/5 bottom-2 right-4 select-none transition-colors duration-400 group-hover:text-cyber-red/10">{id}</div>
        <div className="absolute top-3.5 left-4 z-10 font-mono text-[0.62rem] tracking-[4px] text-cyber-red bg-[#05050e]/80 px-3 py-1 border border-cyber-red/40 pointer-events-none">NEO-ZEN</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-9 md:px-9 md:py-10">
        <div className="font-mono text-[0.68rem] tracking-[3px] text-cyber-red mb-3.5 opacity-85">// FEATURED PROJECT //</div>
        <h3 className="text-[1.7rem] font-bold mb-4 tracking-[1px] text-white">{title}</h3>
        <p className="text-[0.95rem] text-gray leading-relaxed mb-8">{desc}</p>
        <div className="flex gap-3">
          <a href={info} className="flex-1 text-center font-mono text-[0.72rem] text-white tracking-[1.5px] py-2.5 px-4 bg-cyber-red/15 border border-cyber-red rounded-[2px] transition-all duration-300 hover:bg-cyber-red hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(255,0,60,0.3)]">SYSTEM INFO</a>
          <a href={live} className="flex-1 text-center font-mono text-[0.72rem] text-cyber-red tracking-[1.5px] py-2.5 px-4 bg-transparent border border-cyber-red rounded-[2px] transition-all duration-300 hover:bg-cyber-red/10 hover:-translate-y-[1px] hover:shadow-[0_4px_15px_rgba(255,0,60,0.15)]">LAUNCH</a>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ id, glow, title, desc, live, info }) {
  const isRed = glow === 'red';
  return (
    <article className="group flex flex-col bg-[rgba(5,5,16,0.85)] border border-white/5 rounded-[2px] shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-400 pointer-events-auto overflow-hidden hover:border-cyber-red hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,0,60,0.12),0_0_40px_rgba(255,0,60,0.05)]">
      
      <div className="relative h-[200px] flex justify-center items-center bg-gradient-to-br from-[#08080f] to-[#0d0d1a] border-b border-white/5 overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full opacity-25 blur-[60px] ${isRed ? 'bg-cyber-red' : 'bg-cyber-blue'}`} />
        
        <div className="absolute z-10 font-mono text-[4.5rem] font-black text-white/5 bottom-2 right-4 select-none transition-colors duration-400 group-hover:text-cyber-red/10">{id}</div>
      </div>
      
      <div className="p-7">
        <h3 className="text-[1.15rem] font-bold mb-2.5 tracking-[1px] text-white">{title}</h3>
        <p className="text-[0.87rem] text-gray leading-relaxed mb-5 h-[72px] overflow-hidden">{desc}</p>
        <div className="flex gap-3">
          <a href={info} className="flex-1 text-center font-mono text-[0.72rem] text-white tracking-[1.5px] py-2 px-3 bg-cyber-red/15 border border-cyber-red rounded-[2px] transition-all duration-300 hover:bg-cyber-red hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(255,0,60,0.3)]">SYSTEM INFO</a>
          <a href={live} className="flex-1 text-center font-mono text-[0.72rem] text-cyber-red tracking-[1.5px] py-2 px-3 bg-transparent border border-cyber-red rounded-[2px] transition-all duration-300 hover:bg-cyber-red/10 hover:-translate-y-[1px] hover:shadow-[0_4px_15px_rgba(255,0,60,0.15)]">LAUNCH</a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest     = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="cyber-section bg-gradient-to-b from-transparent via-[#02020a]/80 to-transparent" id="projects">
      <div className="w-full max-w-[1140px] z-10 pointer-events-auto">
        <h2 className="text-center text-white tracking-[4px] mb-11 text-[clamp(1.8rem,4vw,2.8rem)] font-bold">
          THE PROJECTS
        </h2>

        {featured && <FeaturedCard {...featured} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-11">
          {rest.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
