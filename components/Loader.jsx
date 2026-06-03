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
        
        {/* Main heading - ultra clean and bold */}
        <h1 className="relative mb-6 sm:mb-8 md:mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <span className="block text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[1] text-white">
            ARSH
          </span>
        </h1>

        {/* Modernistic tagline */}
        <div className="max-w-2xl mb-12 sm:mb-14 md:mb-16 opacity-0 animate-fade-in px-4" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 leading-relaxed">
            Creative Developer
          </p>
        </div>

        {/* Modernistic button */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`opacity-0 animate-fade-in group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full text-xs sm:text-sm md:text-base font-light tracking-wide transition-all duration-500 border border-white ${
            isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/30'
          }`}
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500" />
          
          <span className="relative z-10 text-white group-hover:text-black flex items-center justify-center gap-2 transition-colors duration-500">
            {isLoading ? (
              <>
                <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>Enter</>
            )}
          </span>
        </button>
      </div>


    </div>
  );
}
