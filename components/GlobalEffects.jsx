'use client';

import dynamic from 'next/dynamic';

const Scene3DBackground = dynamic(() => import('@/components/Scene3DBackground'), { ssr: false });
import AudioControl from '@/components/AudioControl';

export default function GlobalEffects() {
  return (
    <>
      <Scene3DBackground />
      <AudioControl />
    </>
  );
}
