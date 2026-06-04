'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';
import ShinyText from './ShinyText';
import BorderGlow from './BorderGlow';


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
    document.body.classList.add('locked');

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('locked');
    };
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
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[10000] flex flex-col justify-center items-center pointer-events-auto overflow-hidden">
      
      

      {/* Premium Apple-style content */}
      <div className={`relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 w-full pointer-events-auto transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isLoading ? 'opacity-0 scale-95' : ''}`}>
        
        {/* Premium headline with enhanced visual weight */}
        <h1 className="relative mb-12 m-4 mt-0 opacity-0 animate-fade-in max-w-7xl" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.95] text-white">
            Arsh
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.95] text-white">
            Srivastava
          </span>
        </h1>

        {/* Premium subtitle with enhanced messaging */}
        <div className="max-w-2xl mb-9 sm:mb-10 md:mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light tracking-wide">
            Welcomes you all to his portfolio playground, where code and creativity collide
          </p>
        </div>

        {/* Secondary tagline */}
        <div className="mb-10 sm:mb-4 md:mb-14 opacity-0 animate-fade-in max-w-xl" style={{ animationDelay: '0.50s', animationFillMode: 'forwards' }}>
          <ShinyText
            text="Life of an Ai Full-Stack Developer"
            speed={10}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </div>

        {/* Premium CTA button with enhanced styling */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#120F17"
          borderRadius={9999} // full pill shape
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative px-7 sm:px-9 md:px-11 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-medium transition-all duration-700 text-white rounded-full ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white/5 active:scale-95'
            }`}
            style={{
              animationDelay: '0.65s',
              animationFillMode: 'forwards',
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3 text-base">
                View My Work
              </span>
            )}
          </button>
        </BorderGlow>

        
      </div>


    </div>
  );
}
