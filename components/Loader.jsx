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

      {/* Apple-style content container */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 w-full pointer-events-auto transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Main hero heading - bold Apple style */}
        <h1 className="relative mb-6 sm:mb-8 md:mb-12 opacity-0 animate-fade-in max-w-6xl" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.1] text-white">
            Creative Developer
          </span>
        </h1>

        {/* Subtitle - clean and minimal */}
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            Building immersive digital experiences with precision and innovation.
          </p>
        </div>

        {/* Apple-style button with understated design */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`opacity-0 animate-fade-in group relative px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-normal transition-all duration-700 text-white ${
            isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:text-gray-300'
          }`}
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                Explore My Work
                <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
              </>
            )}
          </span>
        </button>

        {/* Minimal divider line */}
        <div className="mt-16 sm:mt-20 md:mt-24 w-12 h-px bg-white/20 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }} />
      </div>


    </div>
  );
}
