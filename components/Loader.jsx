'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';

/**
 * Loader — Premium landing overlay with sophisticated animations.
 * Triggers audio and routes to the main portfolio page.
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
    
    // Trigger the audio context
    initSynth();
    toggleMute();
    
    // Unlock scrolling in case it's still locked on body
    document.body.classList.remove('locked');

    // Smooth transition before routing
    setTimeout(() => {
      router.push('/home');
    }, 600);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex justify-center items-center pointer-events-auto overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-cyan-600/20 animate-pulse" />
      </div>

      {/* Main content container */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center p-6 md:p-12 w-[90%] md:w-[85%] lg:w-[70%] max-w-2xl pointer-events-auto transition-all duration-700 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isLoading ? 'opacity-0 translate-y-4' : ''}`}>
        
        {/* Top accent line */}
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-600 to-transparent mb-8 animate-pulse" />

        {/* System status label */}
        <div className="inline-block mb-6 px-3 py-1 border border-red-600/50 rounded-full">
          <span className="font-mono text-xs tracking-widest text-red-500 uppercase">System Online</span>
        </div>

        {/* Main heading */}
        <h1 className="glitch text-[clamp(3.5rem,10vw,5.5rem)] font-black tracking-tight leading-[0.95] mb-6 text-white drop-shadow-[0_0_30px_rgba(255,0,60,0.4)]" data-text="NEO-ZEN">
          NEO-ZEN
        </h1>

        {/* Subheading */}
        <p className="font-light text-base md:text-lg text-gray-300 tracking-wide mb-2 max-w-xl">
          CYBER SAMURAI PORTFOLIO
        </p>

        {/* Description */}
        <p className="font-mono text-xs md:text-sm text-gray-400 tracking-widest mb-12 max-w-lg uppercase">
          Immersive 3D Web Experience — Code × Craft × Culture
        </p>

        {/* Interactive button with state */}
        <div className="flex flex-col items-center w-full gap-6 pointer-events-auto">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative px-8 md:px-10 py-3 md:py-4 text-sm md:text-base font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 active:scale-95'
            }`}
          >
            {/* Button background with gradient glow */}
            <div className={`absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-sm transition-all duration-300 ${
              isLoading ? 'opacity-70' : 'group-hover:shadow-[0_0_30px_rgba(255,0,60,0.8)] opacity-100'
            }`} />
            
            {/* Button text */}
            <span className="relative z-10 text-white flex items-center gap-2">
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  INITIALIZING
                </>
              ) : (
                <>
                  UNLOCK THE REALITY
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
          </button>

          {/* Bottom accent line */}
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Call to action */}
          <p className="font-mono text-xs text-gray-500 tracking-widest uppercase animate-pulse mt-2">
            Click to Begin Your Journey
          </p>
        </div>
      </div>

      {/* Bottom corner accent */}
      <div className="absolute bottom-8 right-8 text-xs font-mono text-gray-700 opacity-50">
        neo-zen.v1
      </div>
    </div>
  );
}
