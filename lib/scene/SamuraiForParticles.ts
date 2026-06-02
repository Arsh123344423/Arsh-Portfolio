import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export interface SamuraiParticleResult {
  /** The root THREE.Group added to the scene — remove this to clean up. */
  model: THREE.Group;
  /** Call this to fully dispose geometry, materials and remove from scene. */
  dispose: () => void;
}

/**
 * loadSamuraiIntoScene
 * ─────────────────────────────────────────────────────────────────────────────
 * Loads the cyber-samurai GLTF model and drops it into an existing Three.js
 * scene. This is a standalone utility that is completely independent of the
 * main AnimationLoop / ModelLoader pipeline.
 *
 * Usage:
 *   const result = await loadSamuraiIntoScene(scene);
 *   // later, to remove:
 *   result.dispose();
 *
 * @param scene      - The THREE.Scene to add the model into.
 * @param scale      - Uniform scale override (default: 1.5).
 * @param position   - World-space offset (default: { x:0, y:-0.6, z:0 }).
 * @param onProgress - Optional 0–100 progress callback.
 */
export function loadSamuraiIntoScene(
  scene: THREE.Scene,
  {
    scale = 1.5,
    position = { x: 0, y: -0.6, z: 0 },
    onProgress,
  }: {
    scale?: number;
    position?: { x: number; y: number; z: number };
    onProgress?: (pct: number) => void;
  } = {}
): Promise<SamuraiParticleResult> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      '/models/cyber_samurai/scene.gltf',

      // ── onLoad ─────────────────────────────────────────────────────────────
      (gltf) => {
        const model = gltf.scene;

        // 1. Compute bounding box while at default transform
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.updateMatrixWorld(true);

        const box    = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size   = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // 2. Normalise so the tallest axis = `scale` units
        const normScale = scale / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(normScale);

        // 3. Centre on origin then apply caller offset
        model.position.set(
          -center.x * normScale + position.x,
          -center.y * normScale + position.y,
          -center.z * normScale + position.z
        );
        model.updateMatrixWorld(true);

        // 4. Material tweaks — metallic cyber look
        model.traverse((node) => {
          if (!(node as THREE.Mesh).isMesh) return;
          const mesh = node as THREE.Mesh;
          mesh.castShadow    = true;
          mesh.receiveShadow = true;

          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          mats.forEach((mat) => {
            const m = mat as THREE.MeshStandardMaterial;
            m.roughness = 0.2;
            m.metalness = 0.95;
            if (m.name?.match(/neon|emissive/i)) {
              m.emissiveIntensity = 4.0;
            }
          });
        });

        scene.add(model);

        // 5. Return handle with dispose callback
        const dispose = () => {
          scene.remove(model);
          model.traverse((node) => {
            const mesh = node as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.geometry?.dispose();
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((m) => (m as THREE.Material).dispose());
          });
        };

        resolve({ model, dispose });
      },

      // ── onProgress ─────────────────────────────────────────────────────────
      (xhr) => {
        if (xhr.total > 0 && onProgress) {
          onProgress(Math.floor((xhr.loaded / xhr.total) * 100));
        }
      },

      // ── onError ────────────────────────────────────────────────────────────
      (err) => {
        console.error('[SamuraiForParticles] GLTF load failed:', err);
        reject(err);
      }
    );
  });
}
