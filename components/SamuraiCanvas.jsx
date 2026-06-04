'use client';

import { useEffect } from 'react';
import { buildScene }              from '@/lib/scene/SceneBuilder';
import { loadModel }               from '@/lib/scene/ModelLoader';
import { startLoop, updateLoopRefs, stopLoop } from '@/lib/scene/AnimationLoop';

/**
 * SamuraiCanvas — Initialises the Three.js scene, loads the GLTF model,
 * starts the animation loop with 360° head tracking.
 *
 * Expects a canvasRef that points to the <canvas> element rendered by HUD.
 * showSamurai controls whether the GLTF model is loaded.
 */
export default function SamuraiCanvas({ canvasRef, showSamurai = true }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Build scene
    const { scene, camera, renderer, particles, cleanup } = buildScene(canvas);

    // Start particle-only loop immediately
    startLoop({ scene, camera, renderer, particles });

    if (showSamurai) {
      // Load model → inject refs → enable head tracking
      loadModel(scene, (percent) => {
        const subtext = document.getElementById('loader-subtext');
        if (subtext) subtext.textContent = `DECRYPTING SAMURAI CORE [${percent}%]`;
      })
        .then((refs) => {
          updateLoopRefs(refs);
        })
        .catch((err) => {
          console.error('[SamuraiCanvas] Model load failed:', err);
        });
    }

    // Cleanup on unmount
    return () => {
      stopLoop();
      cleanup();
      renderer.dispose();
    };
  }, [canvasRef, showSamurai]);

  return null; // No DOM — this component only manages side-effects
}
