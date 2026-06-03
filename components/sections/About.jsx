/**
 * About Section — Modern clean design
 */
export default function About() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 relative" id="about">
      {/* Background accent */}
      <div className="absolute left-0 top-0 w-px h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      <div className="w-full max-w-3xl">
        {/* Section label */}
        <div className="mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm text-gray-500 tracking-widest uppercase font-light">About</span>
          <div className="h-px w-12 bg-white/20 mt-3" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 text-white leading-tight">
          Full-Stack Creator & Design Enthusiast
        </h2>

        {/* Description paragraphs */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-10 sm:mb-12 md:mb-14">
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            I'm a passionate full-stack developer who bridges the gap between stunning design and robust technology. My expertise spans interactive 3D graphics, modern frontend frameworks, and scalable backend architectures.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Every project I undertake is guided by a philosophy of precision, creativity, and obsessive attention to detail. I believe in building experiences that not only work beautifully but also perform flawlessly.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 pt-8 sm:pt-10 md:pt-12 border-t border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">8+</div>
            <p className="text-xs sm:text-sm text-gray-400 tracking-wide uppercase font-light">Years Experience</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
            <p className="text-xs sm:text-sm text-gray-400 tracking-wide uppercase font-light">Projects Shipped</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
            <p className="text-xs sm:text-sm text-gray-400 tracking-wide uppercase font-light">Commitment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
