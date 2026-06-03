'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const GhostCursor = dynamic(() => import('@/components/GhostCursor'), { ssr: false });

/**
 * Landing Page — solely serves the Loader.
 * Persistent global elements (3D background, audio) are now in app/layout.js.
 */
export default function LandingPage() {
  return (
    <>
      <GhostCursor
        color="#ff003c"
        brightness={2}
        edgeIntensity={0}
        trailLength={12.55}
        inertia={0.71}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={9999}
        mixBlendMode="normal"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none' , width: '200%', height: '200%' }}
      />
      <Loader />
    </>
  );
}
