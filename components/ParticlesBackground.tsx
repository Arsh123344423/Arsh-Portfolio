'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { SamuraiParticleResult } from '@/lib/scene/SamuraiForParticles';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ParticlesBackgroundProps {
  /**
   * showSamurai — Toggle the cyber-samurai GLTF model inside the scene.
   *
   *   true  → loads /models/cyber_samurai/scene.gltf and plants it at the
   *            centre of the particle field.
   *   false → pure particle field only (default, lighter).
   */
  showSamurai?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ParticlesBackground({
  showSamurai = false,
}: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '0';
    container.appendChild(renderer.domElement);

    // ── Particle geometry ────────────────────────────────────────────────────
    const PARTICLE_COUNT = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);

    const colorA = new THREE.Color('#6c7582'); // soft violet (matches GhostCursor)
    const colorB = new THREE.Color('#ff003c'); // cyber red

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

      const c = Math.random() > 0.5 ? colorA : colorB;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

    // Soft glow sprite texture
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width  = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.25)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.fill();
    // Bright specular highlight
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(45, 45, 12, 0, Math.PI * 2);
    ctx.fill();
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      map: spriteTexture,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.01,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // The Samurai model uses MeshStandardMaterial, so it needs lights to render.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const keyLight = new THREE.DirectionalLight(0xff003c, 2.2);
    keyLight.position.set(140, 180, 120);
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 1.4);
    fillLight.position.set(-120, 90, 140);

    scene.add(ambientLight);
    scene.add(keyLight);
    scene.add(fillLight);

    // ── Optional samurai ─────────────────────────────────────────────────────
    // Loaded asynchronously via the dedicated utility.
    // The ref holds the result so cleanup can call .dispose().
    let samuraiHandle: SamuraiParticleResult | null = null;
    let cancelled = false;

    if (showSamurai) {
      // Dynamic import keeps the GLTF loader out of the initial bundle
      // when showSamurai is false.
      import('@/lib/scene/SamuraiForParticles').then(({ loadSamuraiIntoScene }) => {
        if (cancelled) return;
        loadSamuraiIntoScene(scene, {
          // This scene's camera sits far back (z=200), so use a larger scale.
          scale: 125,
          position: { x: 0, y: -32, z: 0 },
          onProgress: (pct) => {
            // Optional: surface progress to parent if needed
            void pct;
          },
        })
          .then((handle) => {
            if (cancelled) {
              handle.dispose();
            } else {
              samuraiHandle = handle;
            }
          })
          .catch((err) =>
            console.warn('[ParticlesBackground] Samurai load failed:', err)
          );
      });
    }

    // ── Mouse parallax ───────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX - window.innerWidth  / 2) * 0.1;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    };
    window.addEventListener('pointermove', onPointerMove);

    // ── Animation loop ───────────────────────────────────────────────────────
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;

      camera.position.x += (mouseX  - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      samuraiHandle?.dispose();
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [showSamurai]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    />
  );
}
