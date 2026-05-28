/**
 * main.js — Application Entry Point
 *
 * Orchestrates the entire portfolio:
 *   1. Mounts all HTML components into #app
 *   2. Builds the Three.js scene
 *   3. Loads the GLTF model
 *   4. Starts the render loop
 *   5. Wires up GSAP scroll animations & UI events
 */

// ── Styles ─────────────────────────────────────────────────────────────────
import './style.css';
import './components/sections/sections.css';

// ── Components ─────────────────────────────────────────────────────────────
import { createLoader, hideLoader }                   from './components/Loader.js';
import { createNav, revealNav }                       from './components/Nav.js';
import { createHUD }                                  from './components/HUD.js';
import { createAudioControl, initSynth, toggleMute,
         bindAudioControl }                           from './components/AudioControl.js';

// ── Sections ───────────────────────────────────────────────────────────────
import { createHero }     from './components/sections/Hero.js';
import { createAbout }    from './components/sections/About.js';
import { createSkills }   from './components/sections/Skills.js';
import { createProjects } from './components/sections/Projects.js';
import { createContact }  from './components/sections/Contact.js';

// ── Scene ──────────────────────────────────────────────────────────────────
import { buildScene }           from './scene/SceneBuilder.js';
import { loadModel }            from './scene/ModelLoader.js';
import { startLoop, updateLoopRefs } from './scene/AnimationLoop.js';
import { setupScrollAnimations } from './scene/ScrollAnimations.js';

// ── GSAP entry zoom helper ─────────────────────────────────────────────────
import { gsap } from 'gsap';

// ===========================================================================
// 1. MOUNT HTML
// ===========================================================================
const app = document.getElementById('app');

app.innerHTML = /* html */ `
  ${createLoader()}
  ${createNav()}
  ${createHUD()}
  ${createAudioControl()}

  <!-- Scrollable content layer -->
  <div id="scroll-container">
    ${createHero()}
    ${createAbout()}
    ${createSkills()}
    ${createProjects()}
    ${createContact()}
  </div>
`;

// Wire audio toggle after DOM is ready
bindAudioControl();

// ===========================================================================
// 2. THREE.JS SCENE SETUP
// ===========================================================================
const canvas = document.getElementById('samurai-canvas');
const { scene, camera, renderer, particles } = buildScene(canvas);

// ===========================================================================
// 3. LOAD MODEL → START LOOP → SETUP SCROLL
// ===========================================================================
loadModel(scene, (percent) => {
  // Update loader progress text
  const subtext = document.getElementById('loader-subtext');
  if (subtext) subtext.textContent = `DECRYPTING SAMURAI CORE [${percent}%]`;
})
  .then(({ model, headTarget,
           modelBasePosition, modelBaseRotation,
           headBasePosition,  headBaseRotation }) => {

    // Inject model refs into the already-running loop
    updateLoopRefs({
      model, headTarget,
      modelBasePosition, modelBaseRotation,
      headBasePosition,  headBaseRotation,
    });

    // Setup GSAP scroll animations now that the model is in the scene
    setupScrollAnimations();
  })
  .catch((err) => {
    console.error('[main] Model load failed:', err);
  });

// Start the loop immediately — particles animate during model load.
// Model refs will be injected via updateLoopRefs() once GLTF finishes.
startLoop({ scene, camera, renderer, particles });

// ===========================================================================
// 4. ENTER BUTTON
// ===========================================================================
document.getElementById('enter-btn')?.addEventListener('click', function handler() {
  this.removeEventListener('click', handler); // fire once

  // Init & unmute audio
  initSynth();
  toggleMute();

  // Hide loader & reveal navigation
  hideLoader();
  revealNav();

  // Unlock scrolling
  document.body.classList.remove('locked');

});
