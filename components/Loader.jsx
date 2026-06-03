'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';

/**
 * Loader — Modern minimalist landing with particle background and ghost cursor
 */
export default function Loader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {/* Main content container */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-6 md:px-12 w-full max-w-4xl pointer-events-auto transition-all duration-700 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Main heading - Large and bold */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
          <span className="block">ARSH</span>
          <span className="block text-4xl md:text-6xl font-light text-gray-400 mt-2">Creative Developer</span>
        </h1>

        {/* Tagline */}
        <p className="text-base md:text-lg text-gray-300 font-light tracking-wide mb-2 max-w-2xl leading-relaxed">
          Crafting immersive digital experiences with code, creativity, and precision
        </p>

        {/* Descriptive text */}
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-12 max-w-lg">
          Interactive 3D • Full Stack Development • Creative Coding
        </p>

        {/* Interactive button with minimal design */}
        <div className="flex flex-col items-center w-full gap-8 pointer-events-auto">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative px-10 py-4 text-base font-light tracking-widest uppercase transition-all duration-300 border border-white/30 hover:border-white/100 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white/5'
            }`}
          >
            <span className="relative z-10 text-white flex items-center gap-3">
              {isLoading ? (
                <>
                  <span className="inline-block w-3 h-3 border border-white/60 border-t-white rounded-full animate-spin" />
                  Entering
                </>
              ) : (
                <>
                  Enter Experience
                  <span className="transition-transform group-hover:translate-x-1 text-white/60">→</span>
                </>
              )}
            </span>
          </button>

          {/* Scroll indicator */}
          <p className="text-xs text-gray-600 tracking-widest uppercase mt-4">
            Move cursor to see particles
          </p>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-10 left-10 w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-10 right-10 w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
      
      {/* Version badge */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-600 tracking-widest">
        PORTFOLIO V2.0
      </div>
    </div>
  );
}
