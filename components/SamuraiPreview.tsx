'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * SamuraiPreview — A compact Three.js canvas that renders the cyber-samurai
 * GLTF inside its parent container only. Used exclusively by the NEO-ZEN
 * project card in the Projects section.
 *
 * It is completely isolated from the main AnimationLoop samurai.
 */
export default function SamuraiPreview() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    // We create the renderer immediately but set size in the ResizeObserver
    // because clientWidth/Height is 0 before the browser has painted.
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x09090f, 4, 12);

    // ── Camera ────────────────────────────────────────────────────────────────
    // Initial aspect ratio — will be corrected immediately by ResizeObserver
    const camera = new THREE.PerspectiveCamera(45, 2, 0.01, 50);
    camera.position.set(0, 0.1, 3.2);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0xff003c, 3.5);
    keyLight.position.set(1.5, 2, 2);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    rimLight.position.set(-2, 1, -1);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.6, 8);
    fillLight.position.set(0, 2, 1);
    scene.add(fillLight);

    // ── Floor reflection plane ────────────────────────────────────────────────
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09090f,
      roughness: 0.1,
      metalness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.75;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Load GLTF ─────────────────────────────────────────────────────────────
    let model: THREE.Group | null = null;
    let rafId: number;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      '/models/cyber_samurai/scene.gltf',
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.updateMatrixWorld(true);

        // Normalise size
        const box    = new THREE.Box3().setFromObject(model);
        const size   = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const normScale = 1.4 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(normScale);
        model.position.set(
          -center.x * normScale,
          -center.y * normScale - 0.05,
          -center.z * normScale,
        );
        model.updateMatrixWorld(true);

        // Metallic cyber material overrides
        model.traverse((node) => {
          if (!(node as THREE.Mesh).isMesh) return;
          const mesh = node as THREE.Mesh;
          mesh.castShadow    = true;
          mesh.receiveShadow = true;
          const mats = Array.isArray(mesh.material)
            ? mesh.material as THREE.MeshStandardMaterial[]
            : [mesh.material as THREE.MeshStandardMaterial];
          mats.forEach((m) => {
            m.roughness = 0.18;
            m.metalness = 0.95;
            if (m.name?.match(/neon|emissive|glow/i)) {
              m.emissiveIntensity = 5;
            }
          });
        });

        scene.add(model);
      },
      undefined,
      (err) => console.warn('[SamuraiPreview] GLTF load error:', err)
    );

    // ── Mouse tracking (within the card) ─────────────────────────────────────
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
      const ny = ((e.clientY - rect.top)   / rect.height) * 2 - 1;
      targetRotY = nx * 0.5;   // ±0.5 rad horizontal
      targetRotX = -ny * 0.2;  // ±0.2 rad vertical
    };
    mount.addEventListener('mousemove', onMouseMove);

    // ── Resize observer — also fires immediately on first attach ────────────
    // This is the correct place to read clientWidth/Height, not useEffect body.
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    });
    ro.observe(mount);

    // ── Render loop ───────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (model) {
        // Gentle idle sway + mouse tracking
        model.rotation.y += (targetRotY + Math.sin(t * 0.4) * 0.06 - model.rotation.y) * 0.06;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.06;

        // Subtle bob
        model.position.y += (Math.sin(t * 0.8) * 0.015 - model.position.y) * 0.04;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      mount.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();

      model?.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => (m as THREE.Material).dispose());
      });

      floorGeo.dispose();
      floorMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, cursor: 'crosshair' }}
      aria-hidden="true"
    />
  );
}
