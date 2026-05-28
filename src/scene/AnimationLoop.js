import * as THREE from 'three';

/**
 * AnimationLoop
 * Single-instance RAF loop.  Call startLoop() once to begin; call
 * updateLoopRefs() any time to inject the loaded model refs.
 */

// ── Mutable scene state (updated after model loads) ──────────────────────
let _scene, _camera, _renderer, _particles;
let _model             = null;
let _modelBasePosition = null;
let _modelBaseRotation = null;

const clock = new THREE.Clock();
let   rafId = null;

// ── Loop ─────────────────────────────────────────────────────────────────
function loop() {
  rafId = requestAnimationFrame(loop);

  const t = clock.getElapsedTime();

  // Particles only — samurai model stays completely still.
  if (_particles) {
    _particles.rotation.y = t * 0.02;
    _particles.rotation.x = t * 0.01;
  }

  if (_model && _modelBasePosition && _modelBaseRotation) {
    _model.position.copy(_modelBasePosition);
    _model.rotation.copy(_modelBaseRotation);
  }

  _renderer.render(_scene, _camera);
}

/**
 * Initialises and starts the render loop (call once).
 * Particle animation begins immediately even before the model is loaded.
 *
 * @param {{ scene, camera, renderer, particles }} opts
 */
export function startLoop({ scene, camera, renderer, particles }) {
  if (rafId !== null) return; // already running

  _scene     = scene;
  _camera    = camera;
  _renderer  = renderer;
  _particles = particles;

  loop();
}

/**
 * Injects model refs after the GLTF has loaded.
 * Safe to call at any time after startLoop().
 *
 * @param {{
 *   model, headTarget,
 *   modelBasePosition, modelBaseRotation,
 *   headBasePosition,  headBaseRotation,
 * }} refs
 */
export function updateLoopRefs(refs) {
  _model             = refs.model;
  _modelBasePosition = refs.modelBasePosition;
  _modelBaseRotation = refs.modelBaseRotation;

  if (_model && _modelBasePosition && _modelBaseRotation) {
    _model.position.copy(_modelBasePosition);
    _model.rotation.copy(_modelBaseRotation);
  }

  if (refs.headTarget && refs.headBasePosition && refs.headBaseRotation) {
    refs.headTarget.position.copy(refs.headBasePosition);
    refs.headTarget.rotation.copy(refs.headBaseRotation);
  }
}

/** Cancels the running loop. */
export function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}
