'use client';

import { useEffect, useState, useRef } from 'react';

export default function LandingHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Used for parallax effect
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });

      // Direct DOM manipulation for butter-smooth cursor tracking
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax transform for the background (scale 1.05 and slight movement)
  const getParallaxTransform = () => {
    if (typeof window === 'undefined') return 'scale(1.05)';
    const x = (mousePos.x / window.innerWidth - 0.5) * 30; // max 15px movement each side
    const y = (mousePos.y / window.innerHeight - 0.5) * 30;
    return `translate(${-x}px, ${-y}px) scale(1.05)`;
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center cursor-none"
    >
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0 transition-transform duration-75 ease-out pointer-events-none"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: getParallaxTransform()
        }}
      />

      {/* Dark subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Main Title */}
        <h1
          className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white mb-10 tracking-widest uppercase"
          style={{
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
            fontFamily: 'var(--font-outfit)',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          HI , I Am Arsh
        </h1>

        {/* CTA Button */}
        <a
          href="/home"
          className="px-12 py-4 rounded-full border-2 border-white text-white bg-transparent font-bold text-lg tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
          style={{
            fontFamily: 'var(--font-outfit)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Visit My Work
        </a>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering 
            ? 'w-12 h-12 bg-black border-2 border-black opacity-90' 
            : 'w-10 h-10 bg-transparent border-2 border-white mix-blend-difference'
        }`}
        style={{
          // Use transform directly applied in JS, so skip it in style to avoid conflict
          willChange: 'transform',
        }}
      />
    </section>
  );
}
