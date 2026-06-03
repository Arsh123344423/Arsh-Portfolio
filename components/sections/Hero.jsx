/**
 * Hero Section — Ultra-modernistic and clean
 */
export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 relative" id="hero">
      <div className="w-full max-w-4xl relative z-10">
        {/* Main heading - bold and clear */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-10 sm:mb-12 md:mb-14 text-white">
          Creative Developer
        </h1>

        {/* Concise description */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-14 sm:mb-16 md:mb-20 max-w-3xl font-light">
          Building digital experiences with code and design.
        </p>

        {/* Navigation buttons - minimal rounded style */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mb-20">
          <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light rounded-full">
            Work
          </a>
          <a href="#skills" className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light rounded-full">
            Skills
          </a>
          <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black hover:bg-gray-100 transition-all duration-300 text-sm font-light rounded-full">
            Contact
          </a>
        </div>

        {/* Minimal scroll indicator */}
        <div className="flex items-center gap-2 opacity-60 pointer-events-none">
          <p className="text-xs text-gray-500 font-light">Scroll</p>
          <div className="w-3 h-3 border-b-2 border-r-2 border-gray-500 rotate-45 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
