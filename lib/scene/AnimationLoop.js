import * as THREE from 'three';

/**
 * AnimationLoop — Single-instance RAF loop with 360° head tracking.
 *
 * Call startLoop() once to begin (particles-only is fine).
 * Call updateLoopRefs() after the GLTF loads to inject model + head refs.
 * The head will rotate to follow the cursor across the full 360° range.
 */

// ── Mouse state ──────────────────────────────────────────────────────────
const mouse       = { x: 0, y: 0 };
const targetMouse = { x: 0, y: 0 };

let _mouseBound = false;

function _bindMouse() {
  if (_mouseBound) return;
  _mouseBound = true;
  window.addEventListener('mousemove', (e) => {
    // Normalise to [-1, 1]
    targetMouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
    targetMouse.y = (e.clientY / window.innerHeight)  * -2 + 1;
  });
}

// ── Mutable scene state ──────────────────────────────────────────────────
let _scene, _camera, _renderer, _particles;
let _model             = null;
let _headTarget        = null;
let _modelBasePosition = null;
let _modelBaseRotation = null;
let _headBasePosition  = null;
let _headBaseRotation  = null;

const clock = new THREE.Clock();
let   rafId = null;

// ── Core loop ────────────────────────────────────────────────────────────
function loop() {
  rafId = requestAnimationFrame(loop);

  const t = clock.getElapsedTime();

  // Smooth mouse lerp
  mouse.x += (targetMouse.x - mouse.x) * 0.05;
  mouse.y += (targetMouse.y - mouse.y) * 0.05;

  // Particles drift
  if (_particles) {
    _particles.rotation.y = t * 0.02;
    _particles.rotation.x = t * 0.01;
  }

  // Body — locked to base transform (no drift)
  if (_model && _modelBasePosition) {
    _model.position.copy(_modelBasePosition);
    _model.rotation.copy(_modelBaseRotation);
  }

  // Head — 360° cursor tracking
  if (_headTarget && _headBaseRotation) {
    // Full 360°: mouse range [-1,1] maps to [-PI, PI]
    const targetRotY = _headBaseRotation.y + mouse.x * Math.PI;
    const targetRotX = _headBaseRotation.x - mouse.y * (Math.PI * 0.5);

    _headTarget.rotation.y = THREE.MathUtils.lerp(
      _headTarget.rotation.y, targetRotY, 0.08
    );
    _headTarget.rotation.x = THREE.MathUtils.lerp(
      _headTarget.rotation.x, targetRotX, 0.08
    );
    // Z stays locked
    _headTarget.rotation.z = THREE.MathUtils.lerp(
      _headTarget.rotation.z, _headBaseRotation.z, 0.15
    );

    // Keep head position locked
    _headTarget.position.lerp(_headBasePosition, 0.15);
  }

  _renderer.render(_scene, _camera);
}

/**
 * Starts the render loop (call once).
 * @param {{ scene, camera, renderer, particles }} opts
 */
export function startLoop({ scene, camera, renderer, particles }) {
  if (rafId !== null) return; // already running

  _bindMouse();
  _scene     = scene;
  _camera    = camera;
  _renderer  = renderer;
  _particles = particles;

  loop();
}

/**
 * Injects model & head refs after GLTF loads.
 * @param {{ model, headTarget, modelBasePosition, modelBaseRotation, headBasePosition, headBaseRotation }} refs
 */
export function updateLoopRefs(refs) {
  _model             = refs.model;
  _headTarget        = refs.headTarget;
  _modelBasePosition = refs.modelBasePosition;
  _modelBaseRotation = refs.modelBaseRotation;
  _headBasePosition  = refs.headBasePosition;
  _headBaseRotation  = refs.headBaseRotation;
}

/** Stops the loop and resets refs. */
export function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  _model = null;
  _headTarget = null;
}
