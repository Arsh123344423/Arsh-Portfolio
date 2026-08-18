'use client';

import { useEffect, useRef, type JSX } from 'react';
import * as THREE from 'three';

interface OrbBackgroundProps {
  className?: string;
}

export function OrbBackground({ className = '' }: OrbBackgroundProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animFrameId: number;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.2;

    /* ── Shaders ── */
    const vertexShader = /* glsl */`
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec3 vPosition;

      float hash(vec3 p) {
        p  = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yxz + 19.19);
        return fract((p.x + p.y) * p.z);
      }
      float noise(vec3 p) {
        vec3 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i),            hash(i+vec3(1,0,0)), f.x),
              mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x), f.y),
          mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
              mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x), f.y), f.z
        );
      }

      void main() {
        vec3 pos = position;
        float t = uTime * 0.22;

        float n = noise(pos * 1.15 + t)        * 0.38
                + noise(pos * 2.40 - t * 1.1)  * 0.18
                + noise(pos * 4.80 + t * 0.7)  * 0.08;

        vec3 peach = vec3(0.99, 0.86, 0.68);
        vec3 cream = vec3(0.953, 0.925, 0.875);
        vec3 sage  = vec3(0.60, 0.78, 0.68);
        vec3 ember = vec3(0.89, 0.66, 0.45);

        float c1 = noise(pos * 0.90 + t * 0.38);
        float c2 = noise(pos * 1.65 - t * 0.25);
        vColor = mix(mix(peach, cream, c1), mix(sage, ember, 0.3), c2 * 0.35);

        pos += normal * n * 0.32;
        vNormal = normalMatrix * normal;
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = /* glsl */`
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec3 vPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        float rim = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 2.4);
        vec3 peach = vec3(0.99, 0.86, 0.68);
        vec3 col = mix(vColor, peach * 1.15, rim * 0.5);
        col += 0.04;
        gl_FragColor = vec4(col, 0.92);
      }
    `;

    const geo = new THREE.SphereGeometry(1.25, 96, 96);
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Warm ambient outer halo
    const haloGeo = new THREE.SphereGeometry(1.42, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffdcb0,
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    /* ── Sizing & Resize ── */
    const updateSize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    /* ── Mouse Parallax ── */
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    /* ── Render Loop ── */
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      mat.uniforms.uTime.value = elapsedTime;

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mesh.rotation.y = elapsedTime * 0.15 + mouseX * 1.2;
      mesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + mouseY * 1.2;
      halo.rotation.y = mesh.rotation.y;
      halo.rotation.x = mesh.rotation.x;

      // Gentle floating bob
      mesh.position.y = Math.sin(elapsedTime * 0.8) * 0.06;
      mesh.position.x = Math.cos(elapsedTime * 0.6) * 0.04;
      halo.position.copy(mesh.position);

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      geo.dispose();
      mat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pf-orb-bg-wrap ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="pf-orb-canvas" />
    </div>
  );
}
