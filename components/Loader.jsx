'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { initSynth, toggleMute } from '@/lib/AudioEngine';


/**
 * Loader — Full-screen landing overlay with "UNLOCK THE REALITY" button.
 * Triggers audio and routes to the main portfolio page.
 */
export default function Loader() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    // Trigger the audio context
    initSynth();
    toggleMute();
    
    // Unlock scrolling in case it's still locked on body
    document.body.classList.remove('locked');

    // Route to the portfolio
    router.push('/home');
  }, [router]);

  return (
    <div className="fixed inset-0 bg-transparent z-[10000] flex justify-center items-center pointer-events-auto overflow-hidden">
      
      <div className="relative z-10 text-center flex flex-col items-center justify-center p-[45px] md:p-[45px] w-[90%] md:w-1/2 h-auto min-h-[300px] pointer-events-auto mx-auto bg-black/80 border border-cyber-red/30 backdrop-blur-sm">
        <div className="font-mono text-[0.75rem] tracking-[5px] text-cyber-red mb-[0.9rem] animate-pulse">// SYSTEM ACCESS //</div>
        <h1 className="glitch text-[clamp(6rem,7.5vw,4.5rem)] font-black tracking-[-2px] leading-[0.9] mb-[18px] text-white" data-text="NEO-ZEN">
          NEO-ZEN
        </h1>
        <p className="font-mono text-[0.9rem] text-cyber-blue tracking-[2px] mb-[0.9rem]">AN INTERACTIVE 3D DIGITAL DIMENSION</p>
        

        <div className="flex flex-col items-center w-full mt-[0.9rem] pointer-events-auto">
          <button
            className="font-mono text-[0.9rem] font-bold tracking-[2px] px-[30px] py-[11px] bg-cyber-red-dim text-white border-2 border-cyber-red cursor-pointer transition-all duration-300 hover:bg-cyber-red hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]"
            onClick={handleClick}
          >
            UNLOCK THE REALITY
          </button>
          <div className="font-mono text-[0.6rem] text-cyber-red tracking-[2px] mt-[11px] opacity-70 animate-pulse">
            CLICK TO UNLEASH THE SENSES
          </div>
        </div>
      </div>
    </div>
  );
}
