/**
 * Hero Section — Modern minimalist design matching landing page
 */
export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 relative" id="hero">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Decorative line */}
        <div className="mb-6 sm:mb-8">
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white">
          <span className="block">Creative Developer</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl font-light text-gray-400 mt-2 sm:mt-3">Building Digital Experiences</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-2xl font-light">
          I blend cutting-edge technology with thoughtful design to create immersive digital experiences that captivate, engage, and inspire.
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16">
          <a href="#projects" className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm md:text-base font-light tracking-wide">
            Work
          </a>
          <a href="#skills" className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm md:text-base font-light tracking-wide">
            Skills
          </a>
          <a href="#contact" className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-white bg-white text-black hover:bg-white/90 transition-all duration-300 text-xs sm:text-sm md:text-base font-light tracking-wide">
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-start gap-3 opacity-60 pointer-events-none">
          <p className="text-xs sm:text-sm text-gray-500 tracking-widest uppercase font-light">Scroll to explore</p>
          <div className="animate-bounce">
            <svg className="w-4 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Accent element */}
      <div className="hidden sm:block absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-20">
        <div className="w-32 h-32 border border-white rounded-full" />
      </div>
    </section>
  );
}
