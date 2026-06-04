'use client';

import { useState, useCallback } from 'react';
import { toggleMute } from '@/lib/AudioEngine';

/**
 * AudioControl — Floating button that toggles the ambient synth drone.
 */
export default function AudioControl() {
  const [muted, setMuted] = useState(true);

  const handleToggle = useCallback(() => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  }, []);

  return (
    <button
      className="fixed bottom-7 right-7 w-12 h-12 rounded-full bg-[#060610]/85 border border-cyber-red/50 flex justify-center items-center cursor-pointer z-[1000] text-cyber-red shadow-[0_0_20px_rgba(255,0,60,0.2),inset_0_0_15px_rgba(255,0,60,0.05)] transition-all duration-300 ease-spring pointer-events-auto backdrop-blur-md hover:scale-[1.15] hover:shadow-[0_0_40px_var(--color-cyber-red),0_0_80px_rgba(255,0,60,0.2)] hover:bg-cyber-red hover:text-white hover:border-cyber-red"
      id="audio-toggle"
      aria-label="Toggle ambient audio"
      onClick={handleToggle}
    >
      {/* Playing icon */}
      <svg
        className={`w-5 h-5${muted ? ' hidden' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>

      {/* Muted icon */}
      <svg
        className={`w-5 h-5${muted ? '' : 'hidden'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9"  x2="17" y2="15" />
        <line x1="17" y1="9"  x2="23" y2="15" />
      </svg>
    </button>
  );
}
