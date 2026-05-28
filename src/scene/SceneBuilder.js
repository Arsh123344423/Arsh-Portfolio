import * as THREE from 'three';

/**
 * SceneBuilder
 * Creates and configures the Three.js scene, camera, renderer, lights and particles.
 * Returns all created objects so other modules can reference them.
 */

/**
 * @param {HTMLCanvasElement} canvas
 * @returns {{ scene: THREE.Scene, camera: THREE.PerspectiveCamera,
 *             renderer: THREE.WebGLRenderer, particles: THREE.Points }}
 */
export function buildScene(canvas) {
  // ── Scene ──────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050508, 0.05);

  // ── Camera ─────────────────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0.2, 3.2);

  // ── Renderer ───────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // ── Lights ─────────────────────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(0xff003c, 0.15);
  scene.add(ambientLight);

  const neonRed = new THREE.SpotLight(0xff003c, 12, 10, Math.PI / 4, 0.5, 1);
  neonRed.position.set(1.5, 2, 2);
  neonRed.castShadow = true;
  scene.add(neonRed);

  const neonBlue = new THREE.SpotLight(0x00f0ff, 5, 10, Math.PI / 4, 0.5, 1);
  neonBlue.position.set(-1.5, 1, 2);
  scene.add(neonBlue);

  const rimLight = new THREE.DirectionalLight(0xff003c, 4);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  // ── Particles ──────────────────────────────────────────────────────────
  const PARTICLE_COUNT = 200;
  const geometry  = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
    positions[i]     = (Math.random() - 0.5) * 5;
    positions[i + 1] = Math.random() * 4 - 2;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xff003c,
    size: 0.02,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // ── Resize handler ─────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer, particles };
}
