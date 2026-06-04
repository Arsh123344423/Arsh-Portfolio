'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const GhostCursor = dynamic(() => import('@/components/GhostCursor'), { ssr: false });
const MagicRings = dynamic(() => import('@/components/MagicRings'), { ssr: false });
/**
 * Landing Page — solely serves the Loader.
 * Persistent global elements (3D background, audio) are now in app/layout.js.
 */
export default function LandingPage() {
  return (
    <>

    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MagicRings
        color="#108fe4"
        colorTwo="#e013a9"
        ringCount={6}
        speed={1}
        attenuation={10}
        lineThickness={2}
        baseRadius={0.35}
        radiusStep={0.1}
        scaleRate={0.1}
        opacity={3}
        blur={0}
        noiseAmount={0.1}
        rotation={0}
        ringGap={1.5}
        fadeIn={0.7}
        fadeOut={0.5}
        followMouse={false}
        mouseInfluence={0.2}
        hoverScale={1.2}
        parallax={0.05}
        clickBurst={false}
      />
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
        zIndex={10001}
        mixBlendMode="normal"
      />
    </div>
      
      <Loader />

      
    </>
  );
}
