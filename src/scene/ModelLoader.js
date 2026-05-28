import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * ModelLoader
 * Loads the cyber-samurai GLTF model and detects the head mesh by bounding-box scoring.
 *
 * Returns a Promise that resolves with:
 *   { model, headTarget, modelBasePosition, modelBaseRotation, headBasePosition, headBaseRotation }
 */

const _tmpA = new THREE.Vector3();
const _tmpB = new THREE.Vector3();

/**
 * @param {THREE.Scene} scene
 * @param {(progress: number) => void} [onProgress] - 0–100
 * @returns {Promise<{
 *   model: THREE.Group,
 *   headTarget: THREE.Object3D,
 *   modelBasePosition: THREE.Vector3,
 *   modelBaseRotation: THREE.Euler,
 *   headBasePosition: THREE.Vector3,
 *   headBaseRotation: THREE.Euler,
 * }>}
 */
export function loadModel(scene, onProgress) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      '/models/cyber_samurai/scene.gltf',

      // ── onLoad ──────────────────────────────────────────────────────────
      (gltf) => {
        const model = gltf.scene;

        // Centre and scale model
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.updateMatrixWorld(true);

        const box    = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size   = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        const scale = 1.3 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.set(
          -center.x * scale,
          -center.y * scale - 0.1,
          -center.z * scale,
        );
        model.position.z += 0.35;
        model.updateMatrixWorld(true);

        // Apply materials
        model.traverse((node) => {
          if (!node.isMesh) return;
          node.castShadow    = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.roughness  = 0.25;
            node.material.metalness  = 0.9;
            if (
              node.material.name.includes('Neon') ||
              node.material.name.includes('Emissive')
            ) {
              node.material.emissiveIntensity = 5.0;
            }
          }
        });

        scene.add(model);

        // ── Head detection (bounding-box scoring, no re-parenting) ─────────
        const modelBounds = new THREE.Box3().setFromObject(model);
        const modelCenter = modelBounds.getCenter(new THREE.Vector3());
        const modelSize   = modelBounds.getSize(new THREE.Vector3());

        const minHeadY       = modelCenter.y + modelSize.y * 0.45;
        const maxHeadY       = modelCenter.y + modelSize.y * 0.92;
        const maxHeadXOffset = modelSize.x * 0.18;
        const minHeadZ       = modelCenter.z + modelSize.z * 0.08;

        let headTarget  = null;
        let bestScore   = -Infinity;

        model.traverse((node) => {
          if (!node.isMesh) return;

          const meshBounds = new THREE.Box3().setFromObject(node);
          const mc = meshBounds.getCenter(_tmpA);
          const ms = meshBounds.getSize(_tmpB);

          const inBand      = mc.y >= minHeadY && mc.y <= maxHeadY;
          const nearCenterX = Math.abs(mc.x - modelCenter.x) <= maxHeadXOffset;
          const inFront     = mc.z >= minHeadZ;
          const smallEnough = ms.length() <= modelSize.length() * 0.42;

          if (inBand && nearCenterX && inFront && smallEnough) {
            const score =
              mc.y * 2.2 +
              mc.z * 1.6 -
              Math.abs(mc.x - modelCenter.x) * 1.1 -
              ms.length() * 0.45;

            if (score > bestScore) {
              bestScore  = score;
              headTarget = node;
            }
          }
        });

        // Fallback — if no candidate found, use the full model
        if (!headTarget) headTarget = model;

        // Capture base transforms
        const modelBasePosition = model.position.clone();
        const modelBaseRotation = model.rotation.clone();
        const headBasePosition  = headTarget.position.clone();
        const headBaseRotation  = headTarget.rotation.clone();

        resolve({
          model,
          headTarget,
          modelBasePosition,
          modelBaseRotation,
          headBasePosition,
          headBaseRotation,
        });
      },

      // ── onProgress ──────────────────────────────────────────────────────
      (xhr) => {
        if (xhr.total > 0 && onProgress) {
          onProgress(Math.floor((xhr.loaded / xhr.total) * 100));
        }
      },

      // ── onError ─────────────────────────────────────────────────────────
      (err) => {
        console.error('[ModelLoader] Failed to load GLTF:', err);
        reject(err);
      },
    );
  });
}
