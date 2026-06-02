/**
 * About Section
 */
export default function About() {
  return (
    <section className="cyber-section" id="about">
      <div className="w-full max-w-[720px] z-10 pointer-events-auto glass-panel p-11">
        <div className="font-mono text-[0.72rem] text-cyber-red flex items-center gap-2.5 mb-[26px] tracking-[3px]">
          <span className="w-2 h-2 bg-cyber-red rounded-full shadow-[0_0_10px_var(--color-cyber-red)] animate-pulse" />
          <span className="text-gray">SYSTEM FILE: AGENT.LOG</span>
        </div>
        <h2 className="text-[2.5rem] font-semibold mb-5 tracking-[1px] text-white">THE RONIN</h2>
        <p className="text-gray leading-[1.75] mb-3.5">
          I am a creative full-stack developer specialising in bringing complex 3D
          graphics, interactive frontends, and robust backend logic together in the
          browser.
        </p>
        <p className="text-gray leading-[1.75] mb-3.5">
          My philosophy is like the bushido code of the digital age: precision,
          mastery of tools, and an unwavering commitment to aesthetics and speed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 pt-7 border-t border-cyber-red/10">
          <div className="flex flex-col items-start">
            <span className="font-mono text-[2rem] font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,60,0.4)]">08+</span>
            <span className="text-[0.72rem] text-muted uppercase tracking-[2px] mt-1">Years Code</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-mono text-[2rem] font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,60,0.4)]">50+</span>
            <span className="text-[0.72rem] text-muted uppercase tracking-[2px] mt-1">Systems Shipped</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-mono text-[2rem] font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,60,0.4)]">100%</span>
            <span className="text-[0.72rem] text-muted uppercase tracking-[2px] mt-1">Aesthetic Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
