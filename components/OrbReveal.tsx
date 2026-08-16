'use client';

import { useEffect, useRef, type JSX } from 'react';

export interface OrbRevealProps {
  name?: string;
  role?: string;
  onComplete?: () => void;
}

export default function OrbReveal({
  name = 'Arsh Srivastava',
  role = 'AI · Full-Stack · Software Developer',
  onComplete,
}: OrbRevealProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    // Lock page scroll while overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cleanups.push(() => {
      document.body.style.overflow = originalOverflow;
    });

    (async () => {
      const [THREE, { default: gsap }] = await Promise.all([
        import('three'),
        import('gsap'),
      ]);
      if (cancelled) return;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const cue = cueRef.current;
      const text = textRef.current;
      if (!container || !canvas) return;

      /* ── Three.js Renderer ── */
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      cleanups.push(() => renderer.dispose());

      /* ── Scene & Camera ── */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.z = 5;

      /* ── Vertex Shader: Organic Blob Expanding to Fill Screen ── */
      const vertexShader = /* glsl */`
        uniform float uTime;
        uniform float uScroll;
        varying vec3 vNormal;
        varying vec3 vColor;

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
          float t = uTime * 0.20;

          // Displacement reduces smoothly as sphere grows
          float blobAmt = max(0.0, 1.0 - uScroll * 1.1);
          float n = (noise(pos * 1.10 + t)         * 0.42
                   + noise(pos * 2.40 - t * 1.15)  * 0.20
                   + noise(pos * 5.20 + t * 0.70)  * 0.09) * blobAmt;

          vec3 peach = vec3(0.99, 0.86, 0.68);
          vec3 cream = vec3(0.953, 0.925, 0.875);
          vec3 sage  = vec3(0.60, 0.78, 0.68);
          float c1 = noise(pos * 0.85 + t * 0.42);
          float c2 = noise(pos * 1.60 - t * 0.28);
          vColor = mix(mix(peach, cream, c1), sage, c2 * 0.32);

          // Sphere expands to overfill the viewport
          float expand = 1.0 + uScroll * 8.5;
          pos = pos * expand + normal * n * 0.30;

          vNormal = normalMatrix * normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      /* ── Fragment Shader ── */
      const fragmentShader = /* glsl */`
        uniform float uScroll;
        varying vec3 vNormal;
        varying vec3 vColor;

        void main() {
          float rim = pow(1.0 - dot(normalize(vNormal), vec3(0, 0, 1)), 2.2);
          vec3 peach = vec3(0.99, 0.86, 0.68);
          vec3 col = mix(vColor, peach * 1.2, rim * 0.45 * (1.0 - uScroll));
          col += 0.06;
          // Flattens completely to solid sphere cream color (#f3ecdf)
          col = mix(col, vec3(0.953, 0.925, 0.875), min(1.0, uScroll * 1.1));
          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const geo = new THREE.SphereGeometry(1.3, 128, 128);
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 }, uScroll: { value: 0 } },
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(1.46, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xffdcb0,
          transparent: true,
          opacity: 0.14,
          side: THREE.BackSide,
        })
      );
      scene.add(halo);

      /* ── Resize handler ── */
      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);
      cleanups.push(() => window.removeEventListener('resize', resize));

      /* ── Animation / Render loop ── */
      const clock = new THREE.Clock();
      let raf = 0;
      let targetScroll = 0;
      let currentScroll = 0;
      let isSliding = false;

      const triggerSlideUp = () => {
        if (isSliding) return;
        isSliding = true;

        // Slide the entire cream screen up smoothly like a curtain
        gsap.to(container, {
          yPercent: -100,
          duration: 1.05,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete?.();
          },
        });
      };

      const loop = () => {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        mesh.rotation.y += 0.0018;
        mesh.rotation.x += 0.0007;

        // Smoothly interpolate scroll
        currentScroll += (targetScroll - currentScroll) * 0.1;
        mat.uniforms.uScroll.value = currentScroll;
        halo.material.opacity = Math.max(0, 0.14 * (1.0 - currentScroll * 2));

        // Background color of container blends from black to sphere's cream (#f3ecdf)
        if (currentScroll > 0.4) {
          const bgP = Math.min(1, (currentScroll - 0.4) / 0.5);
          container.style.backgroundColor = `rgb(${Math.round(243 * bgP)}, ${Math.round(236 * bgP)}, ${Math.round(223 * bgP)})`;
        } else {
          container.style.backgroundColor = '#000000';
        }

        // Fade cue out early
        if (cue) {
          cue.style.opacity = String(Math.max(0, 1 - currentScroll / 0.25));
        }

        renderer.render(scene, camera);

        // Trigger slide-up once the sphere reaches 75% expansion —
        // don't wait for the background color transition to finish
        if (currentScroll >= 0.75 && !isSliding) {
          triggerSlideUp();
        }

        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanups.push(() => cancelAnimationFrame(raf));

      /* ── Scroll / Wheel / Touch Input Listeners ── */
      const handleWheel = (e: WheelEvent) => {
        if (isSliding) return;
        targetScroll = Math.min(1.0, Math.max(0, targetScroll + e.deltaY * 0.0018));
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchMove = (e: TouchEvent) => {
        if (isSliding) return;
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        touchStartY = currentY;
        targetScroll = Math.min(1.0, Math.max(0, targetScroll + deltaY * 0.0035));
      };

      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

      cleanups.push(() => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      });
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        overflow: 'hidden',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {/* Full-viewport Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Centered Name + Role — Auto inverts on top of the orb with mix-blend-mode */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: 'translateY(-50%)',
          zIndex: 10,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "'Fraunces', serif",
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {name}
        </h1>
        <p
          style={{
            margin: '18px 0 0',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#ffffff',
            opacity: 0.8,
          }}
        >
          {role}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(243, 236, 223, 0.35)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <p style={{ margin: '0 0 8px' }}>scroll to enter</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ display: 'inline-block' }}
        >
          <path
            d="M2 5l5 5 5-5"
            stroke="#e3a874"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}