/**
 * Hero Section
 */
export default function Hero() {
  return (
    <section className="cyber-section justify-start items-center md:pt-[90px] md:px-10 md:pb-10" id="hero">
      <div className="w-full max-w-[620px] ml-0 mr-auto glass-panel p-9 md:p-12">
        <h1 className="glitch text-[clamp(2.5rem,8vw,4.5rem)] font-black leading-[0.9] tracking-[-2px] mb-[25px] text-white drop-shadow-[0_0_20px_rgba(255,0,60,0.3)]" data-text="CYBER SAMURAI">
          CYBER SAMURAI
        </h1>
        <p className="text-[1.15rem] text-gray leading-[1.7] max-w-[540px] mb-8">
          Blending cybernetic code with ancient digital craftsmanship. I design,
          build, and deploy immersive web dimensions.
        </p>
        <div className="flex flex-wrap gap-2.5 mb-7">
          <a href="#projects" className="font-mono text-[0.72rem] tracking-[2px] uppercase text-gray px-4 py-2 border border-cyber-red/25 rounded-[2px] transition-all duration-300 hover:text-white hover:border-cyber-red hover:bg-cyber-red/10 pointer-events-auto">Projects</a>
          <a href="#skills" className="font-mono text-[0.72rem] tracking-[2px] uppercase text-gray px-4 py-2 border border-cyber-red/25 rounded-[2px] transition-all duration-300 hover:text-white hover:border-cyber-red hover:bg-cyber-red/10 pointer-events-auto">Tools</a>
          <a href="#contact" className="font-mono text-[0.72rem] tracking-[2px] uppercase text-cyber-red px-4 py-2 border border-cyber-red bg-cyber-red/10 rounded-[2px] transition-all duration-300 hover:text-white hover:bg-cyber-red pointer-events-auto">Contact</a>
        </div>
        <div className="flex flex-col items-start mt-[50px] opacity-60 pointer-events-none">
          <span className="block w-[10px] h-[10px] border-b-2 border-r-2 border-cyber-red rotate-45 mb-2.5 animate-bounce" />
          <span className="font-mono text-[0.75rem] tracking-[3px] text-cyber-red">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}
