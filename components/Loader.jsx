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

      {/* Premium Apple-style content */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 w-full pointer-events-auto transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Premium headline with enhanced visual weight */}
        <h1 className="relative mb-8 sm:mb-10 md:mb-12 opacity-0 animate-fade-in max-w-7xl" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.95] text-white">
            Creative
          </span>
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.95] text-white">
            Developer
          </span>
        </h1>

        {/* Premium subtitle with enhanced messaging */}
        <div className="max-w-2xl mb-10 sm:mb-12 md:mb-14 opacity-0 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light tracking-wide">
            Designing and building digital experiences that inspire
          </p>
        </div>

        {/* Secondary tagline */}
        <div className="mb-16 sm:mb-18 md:mb-20 opacity-0 animate-fade-in max-w-xl" style={{ animationDelay: '0.50s', animationFillMode: 'forwards' }}>
          <p className="text-sm sm:text-base text-gray-500 font-light tracking-wide">
            Full-stack development meets creative innovation
          </p>
        </div>

        {/* Premium CTA button with enhanced styling */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`opacity-0 animate-fade-in group relative px-7 sm:px-9 md:px-11 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-medium transition-all duration-700 text-white border border-white/40 rounded-full ${
            isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:border-white/100 hover:bg-white/5 hover:shadow-lg hover:shadow-white/10 active:scale-95'
          }`}
          style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3 text-base">
              View My Work
              <span className="transition-all group-hover:translate-y-0.5 duration-300 text-white/60 group-hover:text-white/100">
                ↓
              </span>
            </span>
          )}
        </button>

        {/* Decorative scroll indicator */}
        <div className="mt-24 sm:mt-28 md:mt-32 opacity-0 animate-fade-in pointer-events-none" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-gray-600 tracking-widest uppercase font-light">Scroll to explore</p>
            <div className="w-6 h-10 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
