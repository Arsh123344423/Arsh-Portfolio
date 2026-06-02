'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Scene3DBackground — Full-page Three.js background with:
 *   • 3000-point particle nebula (additive blending)
 *   • 6 floating wireframe icosahedra at different scales / speeds
 *   • 2 glowing torus rings
 *   • Mouse-driven camera parallax
 *   • Subtle colour-shift over time (red ↔ cyan)
 *
 * Renders behind everything via z-index: -1. No samurai model.
 */
export default function Scene3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 50);

    // ── Particles ─────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    const pCol = new Float32Array(PARTICLE_COUNT * 3);

    const colA = new THREE.Color('#ff003c');
    const colB = new THREE.Color('#00f0ff');
    const colC = new THREE.Color('#b497cf');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 160;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const pick = Math.random();
      const c = pick < 0.45 ? colA : pick < 0.75 ? colB : colC;
      pCol[i * 3]     = c.r;
      pCol[i * 3 + 1] = c.g;
      pCol[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));

    // Soft sprite texture
    const sc = document.createElement('canvas');
    sc.width = sc.height = 64;
    const sctx = sc.getContext('2d')!;
    const sg = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0,   'rgba(255,255,255,1)');
    sg.addColorStop(0.5, 'rgba(255,255,255,0.4)');
    sg.addColorStop(1,   'rgba(255,255,255,0)');
    sctx.fillStyle = sg;
    sctx.arc(32, 32, 32, 0, Math.PI * 2);
    sctx.fill();
    const sprite = new THREE.CanvasTexture(sc);

    const pMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: sprite,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Floating Wireframe Icosahedra ─────────────────────────────────────────
    const ICOSA_CONFIGS = [
      { r: 6,   pos: [22, 8, -20],   speed: 0.003, phase: 0 },
      { r: 3.5, pos: [-18, 12, -10], speed: 0.005, phase: 1.2 },
      { r: 5,   pos: [0, -16, -15],  speed: 0.004, phase: 2.4 },
      { r: 2.5, pos: [30, -8, -5],   speed: 0.007, phase: 0.8 },
      { r: 4,   pos: [-28, 5, -18],  speed: 0.003, phase: 3.1 },
      { r: 1.8, pos: [10, 20, -8],   speed: 0.009, phase: 1.8 },
    ];

    const icosahedra: THREE.Mesh[] = [];
    ICOSA_CONFIGS.forEach(({ r, pos, phase }) => {
      const geo = new THREE.IcosahedronGeometry(r, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0xff003c : 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.userData.phase = phase;
      scene.add(mesh);
      icosahedra.push(mesh);
    });

    // ── Torus Rings Removed per request ────────────────────────────────────────

    // ── Grid Floor Plane ───────────────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(200, 40, 0xff003c, 0x1a0a0a);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.07;
    gridHelper.position.y = -30;
    scene.add(gridHelper);

    // ── Mouse Parallax ─────────────────────────────────────────────────────────
    let targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 6;
      targetY = (e.clientY / window.innerHeight - 0.5) * -4;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ─────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Render Loop ────────────────────────────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow particle drift
      particles.rotation.y = t * 0.015;
      particles.rotation.x = t * 0.007;

      // Icosahedra: orbit + pulse opacity
      ICOSA_CONFIGS.forEach((cfg, i) => {
        const m = icosahedra[i];
        m.rotation.x += cfg.speed;
        m.rotation.y += cfg.speed * 0.7;
        m.position.y = cfg.pos[1] + Math.sin(t * 0.5 + cfg.phase) * 3;
        (m.material as THREE.MeshBasicMaterial).opacity =
          0.12 + Math.abs(Math.sin(t * 0.3 + cfg.phase)) * 0.12;
      });

      // Torus slow spin removed

      // Camera parallax (smooth follow)
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      pGeo.dispose();
      pMat.dispose();
      sprite.dispose();
      icosahedra.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
