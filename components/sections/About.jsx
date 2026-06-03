/**
 * About Section — Ultra-modernistic
 */
export default function About() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 relative" id="about">
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 text-white leading-[1.1]">
          Full-Stack Developer
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-14 sm:mb-16 md:mb-20 max-w-3xl font-light">
          I build digital experiences with precision, combining modern technology with thoughtful design.
        </p>

        {/* Stats grid - minimal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 pt-12 border-t border-white/10">
          <div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">8+</div>
            <p className="text-xs sm:text-sm text-gray-500 font-light">Years</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">50+</div>
            <p className="text-xs sm:text-sm text-gray-500 font-light">Projects</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">∞</div>
            <p className="text-xs sm:text-sm text-gray-500 font-light">Passion</p>
          </div>
        </div>
      </div>
    </section>
  );
}
