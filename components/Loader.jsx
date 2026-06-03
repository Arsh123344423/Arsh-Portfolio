'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';

/**
 * Loader — Premium landing experience with sophisticated animations and visual storytelling
 */
export default function Loader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    initSynth();
    toggleMute();
    document.body.classList.remove('locked');

    setTimeout(() => {
      router.push('/home');
    }, 600);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex justify-center items-center pointer-events-auto overflow-hidden">
      
      {/* Animated background gradient that follows cursor */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`,
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* Premium content container with staggered animations */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-6 md:px-12 w-full max-w-5xl pointer-events-auto transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Decorative line above heading */}
        <div className="mb-8 flex items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="h-px w-8 bg-gradient-to-r from-white/40 to-transparent" />
          <span className="text-xs font-light tracking-widest text-gray-400 uppercase">Welcome</span>
          <div className="h-px w-8 bg-gradient-to-l from-white/40 to-transparent" />
        </div>

        {/* Main heading with text reveal effect */}
        <h1 className="relative mb-8">
          <span className="block text-7xl md:text-9xl font-black tracking-tight leading-[0.95] text-white opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            ARSH
          </span>
          <span className="block text-2xl md:text-4xl font-light text-gray-400 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Creative Developer & Designer
          </span>
        </h1>

        {/* Premium tagline */}
        <div className="max-w-2xl mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
            Building immersive digital experiences with cutting-edge technology, thoughtful design, and meticulous attention to detail.
          </p>
        </div>

        {/* Descriptive features */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 text-sm text-gray-400 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full" />
            Interactive 3D Experiences
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full" />
            Full-Stack Development
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full" />
            Creative Coding
          </span>
        </div>

        {/* Premium button with enhanced interactions */}
        <div className="flex flex-col items-center gap-8 pointer-events-auto opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative px-12 py-5 text-base font-medium tracking-widest uppercase transition-all duration-500 border border-white/40 hover:border-white ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/20'
            }`}
          >
            {/* Premium background effect on hover */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 text-white group-hover:text-black flex items-center gap-3 transition-colors duration-500">
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Initializing Experience
                </>
              ) : (
                <>
                  Explore My Work
                  <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
                </>
              )}
            </span>
          </button>

          {/* Decorative line below button */}
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Interactive hint */}
          <p className="text-xs text-gray-500 tracking-widest uppercase font-light">
            Move your cursor to see the magic
          </p>
        </div>
      </div>

      {/* Corner accent elements */}
      <div className="absolute top-8 left-8 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
        <div className="flex flex-col gap-2">
          <div className="w-8 h-px bg-white/30" />
          <div className="w-px h-8 bg-white/30" />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
        <div className="flex flex-col items-end gap-2">
          <div className="w-8 h-px bg-white/30" />
          <div className="w-px h-8 bg-white/30" />
        </div>
      </div>

      {/* Premium version badge */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-600 tracking-widest font-light opacity-0 animate-fade-in" style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
        PORTFOLIO.V3
      </div>

      {/* Scroll indicator with animation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <p className="text-xs tracking-widest uppercase font-light">Scroll to explore</p>
          <div className="animate-bounce">
            <svg className="w-4 h-6 border border-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
