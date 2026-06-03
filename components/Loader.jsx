'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';

/**
 * Loader — Clean modernistic landing with responsive design
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
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col justify-center items-center pointer-events-auto overflow-hidden">
      
      {/* Subtle animated background gradient following cursor */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 sm:opacity-20"
        style={{
          background: `radial-gradient(400px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 80%)`,
          transition: 'background 0.4s ease-out'
        }}
      />

      {/* Clean content container */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 w-full max-w-5xl pointer-events-auto transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Minimal decorative element */}
        <div className="mb-6 sm:mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Main heading - clean and responsive */}
        <h1 className="relative mb-4 sm:mb-6">
          <span className="block text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1] text-white opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            ARSH
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl font-light text-gray-400 mt-2 sm:mt-3 md:mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Creative Developer
          </span>
        </h1>

        {/* Clean tagline */}
        <div className="max-w-2xl mb-8 sm:mb-10 md:mb-12 opacity-0 animate-fade-in px-4" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 leading-relaxed">
            Crafting immersive digital experiences through code, design, and creative innovation
          </p>
        </div>

        {/* Minimal feature list */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-14 text-xs sm:text-sm text-gray-400 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <span>3D Experiences</span>
          <span className="hidden sm:inline">•</span>
          <span>Full-Stack Dev</span>
          <span className="hidden sm:inline">•</span>
          <span>Creative Code</span>
        </div>

        {/* Clean button */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 pointer-events-auto opacity-0 animate-fade-in w-full px-4" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base font-light tracking-widest uppercase transition-all duration-500 border border-white/30 hover:border-white w-full sm:w-auto max-w-xs ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/20'
            }`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 text-white group-hover:text-black flex items-center justify-center gap-2 sm:gap-3 transition-colors duration-500">
              {isLoading ? (
                <>
                  <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">Entering</span>
                </>
              ) : (
                <>
                  Enter Experience
                  <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
                </>
              )}
            </span>
          </button>

          {/* Minimal divider */}
          <div className="h-px w-8 bg-white/15" />

          {/* Subtle hint */}
          <p className="text-xs text-gray-600 tracking-widest uppercase font-light">
            Move cursor to explore
          </p>
        </div>
      </div>

      {/* Minimal corner accents - hidden on mobile */}
      <div className="hidden sm:block absolute top-6 left-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
        <div className="w-6 h-px bg-white/20 mb-2" />
        <div className="w-px h-6 bg-white/20" />
      </div>

      <div className="hidden sm:block absolute bottom-6 right-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
        <div className="w-6 h-px bg-white/20 mb-2" />
        <div className="w-px h-6 bg-white/20" />
      </div>

      {/* Version badge - mobile friendly */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-xs text-gray-700 tracking-widest font-light opacity-0 animate-fade-in" style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
        v3
      </div>
    </div>
  );
}
