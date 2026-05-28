import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// STATE MANAGEMENT & GLOBALS
// ==========================================================================
let isSamuraiLoaded = false;
let hasClickedEnter = false;
let isInterfaceEntered = false;
let isGSAPInitialized = false;

// Audio variables (Self-contained Web Audio API Synthesizer)
let audioCtx = null;
let osc1 = null, osc2 = null, osc3 = null;
let filterNode = null;
let gainNode = null;
let isMuted = true;
let lfo = null;

// Three.js instances
let samuraiScene, samuraiCamera, samuraiRenderer, samuraiModel, samuraiParticles;
let currentFrameId = null;

// Mouse movement tracking
const mouse = { x: 0, y: 0 };
const targetMouse = { x: 0, y: 0 };

// DOM Elements
const loaderContainer = document.getElementById('loader-container');
const loaderFill = document.getElementById('loader-fill');
const enterBtn = document.getElementById('enter-btn');
const audioToggle = document.getElementById('audio-toggle');

// Helper to write lines to loading terminal
function logTerminal(message, type = 'info') {
  console.log(`[TERMINAL][${type}] ${message}`);
}

// ==========================================================================
// WEB AUDIO API SYNTHESIZER
// ==========================================================================
function initSynth() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create nodes
    osc1 = audioCtx.createOscillator();
    osc2 = audioCtx.createOscillator();
    osc3 = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    filterNode = audioCtx.createBiquadFilter();
    
    // Cyberpunk setting (Fat detuned saw wave drone)
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc3.type = 'triangle';
    
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1
    osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // A2
    osc3.frequency.setValueAtTime(165, audioCtx.currentTime); // E3
    
    osc1.detune.setValueAtTime(-12, audioCtx.currentTime);
    osc2.detune.setValueAtTime(12, audioCtx.currentTime);
    osc3.detune.setValueAtTime(0, audioCtx.currentTime);
    
    // Low pass filter with soft resonance
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(220, audioCtx.currentTime);
    filterNode.Q.setValueAtTime(4, audioCtx.currentTime);
    
    // Create LFO to sweep filter slightly for movement
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.15; // slow sweep
    lfoGain.gain.value = 80;
    
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();
    
    // Connect everything
    osc1.connect(filterNode);
    osc2.connect(filterNode);
    osc3.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Set low volume
    gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime); // Muted initially
    
    osc1.start();
    osc2.start();
    osc3.start();
  } catch (e) {
    console.warn("Audio initialization failed:", e);
  }
}

function toggleMute() {
  if (!audioCtx) initSynth();
  
  if (isMuted) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 1);
    isMuted = false;
    audioToggle.querySelector('.playing').classList.remove('hidden');
    audioToggle.querySelector('.muted').classList.add('hidden');
  } else {
    gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.5);
    isMuted = true;
    audioToggle.querySelector('.playing').classList.add('hidden');
    audioToggle.querySelector('.muted').classList.remove('hidden');
  }
}

// Track mouse movement
window.addEventListener('mousemove', (e) => {
  targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Audio Toggle Event
audioToggle.addEventListener('click', toggleMute);

// ==========================================================================
// THREE.JS SAMURAI SCENE BUILDER
// ==========================================================================
function buildSamuraiScene() {
  const canvas = document.getElementById('samurai-canvas');
  
  samuraiScene = new THREE.Scene();
  samuraiScene.fog = new THREE.FogExp2(0x050508, 0.05);
  
  // Camera
  samuraiCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  samuraiCamera.position.set(0, 0.2, 3.2);
  
  // Renderer
  samuraiRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  samuraiRenderer.setSize(window.innerWidth, window.innerHeight);
  samuraiRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  samuraiRenderer.shadowMap.enabled = true;
  samuraiRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xff003c, 0.15);
  samuraiScene.add(ambientLight);
  
  const neonRedSpotlight = new THREE.SpotLight(0xff003c, 12, 10, Math.PI / 4, 0.5, 1);
  neonRedSpotlight.position.set(1.5, 2, 2);
  neonRedSpotlight.castShadow = true;
  samuraiScene.add(neonRedSpotlight);
  
  const neonBlueSpotlight = new THREE.SpotLight(0x00f0ff, 5, 10, Math.PI / 4, 0.5, 1);
  neonBlueSpotlight.position.set(-1.5, 1, 2);
  samuraiScene.add(neonBlueSpotlight);
  
  const rimLight = new THREE.DirectionalLight(0xff003c, 4);
  rimLight.position.set(0, 2, -3);
  samuraiScene.add(rimLight);
  
  // Particles
  const particleCount = 200;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 5;
    positions[i + 1] = Math.random() * 4 - 2;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff003c,
    size: 0.02,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  samuraiParticles = new THREE.Points(particleGeometry, particleMaterial);
  samuraiScene.add(samuraiParticles);
}

// ==========================================================================
// ASSET LOADER (CYBER SAMURAI GLTF)
// ==========================================================================
const loader = new GLTFLoader();

function loadCyberSamurai() {
  logTerminal("Loading Cyber Samurai GLTF model...");
  
  loader.load(
    '/models/cyber_samurai/scene.gltf',
    (gltf) => {
      samuraiModel = gltf.scene;
      
      // Reset and center mathematically
      samuraiModel.position.set(0, 0, 0);
      samuraiModel.scale.set(1, 1, 1);
      samuraiModel.updateMatrixWorld(true);
      
      const box = new THREE.Box3().setFromObject(samuraiModel);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = new THREE.Vector3();
      box.getSize(size);
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.3 / maxDim; 
      samuraiModel.scale.set(scale, scale, scale);
      samuraiModel.position.set(
        -center.x * scale,
        -center.y * scale - 0.1,
        -center.z * scale
      );
      samuraiModel.updateMatrixWorld(true);
      
      samuraiModel.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.roughness = 0.25;
            node.material.metalness = 0.9;
            if (node.material.name.includes('Neon') || node.material.name.includes('Emissive')) {
              node.material.emissiveIntensity = 5.0;
            }
          }
        }
      });
      
      samuraiScene.add(samuraiModel);
      logTerminal("Cyber Samurai model loaded successfully.", 'success');
      
      isSamuraiLoaded = true;
      setupGSAPAnimations();
    },
    (xhr) => {
      if (xhr.total > 0) {
        const percent = Math.floor((xhr.loaded / xhr.total) * 100);
        if (loaderFill) loaderFill.style.width = `${percent * 0.4}%`; 
        const subtext = document.getElementById('loader-subtext');
        if (subtext) subtext.textContent = `DECRYPTING SAMURAI CORE [${percent}%]`;
      }
    },
    (error) => {
      logTerminal(`Error loading Cyber Samurai: ${error.message}`, 'error');
      console.error(error);
    }
  );
}

// ==========================================================================
// RENDER LOOP
// ==========================================================================
const clock = new THREE.Clock();

function animate() {
  currentFrameId = requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();
  
  mouse.x += (targetMouse.x - mouse.x) * 0.05;
  mouse.y += (targetMouse.y - mouse.y) * 0.05;
  
  if (samuraiRenderer) {
    if (samuraiParticles) {
      samuraiParticles.rotation.y = elapsedTime * 0.02;
      samuraiParticles.rotation.x = elapsedTime * 0.01;
    }
    
    // AFTER
    if (samuraiModel) {
      // Body stays still — only subtle idle sway
      samuraiModel.rotation.y += (mouse.x * 0.08 - samuraiModel.rotation.y) * 0.04;
      samuraiModel.rotation.x += (mouse.y * 0.06 - samuraiModel.rotation.x) * 0.04;
      samuraiModel.rotation.z = 0;
    }
    
    samuraiRenderer.render(samuraiScene, samuraiCamera);
  }
}

// ==========================================================================
// GSAP SCROLLTRIGGER ARCHITECTURE
// ==========================================================================
function setupGSAPAnimations() {
  if (!isSamuraiLoaded || isGSAPInitialized) return;
  isGSAPInitialized = true;
  
  // Timeline 1: Zoom in as user scrolls to About section
  gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
    }
  })
  .to(samuraiCamera.position, { z: 2.2, y: 0.1 })
  .to(samuraiModel.position, { y: 0.15 });

  // Timeline 2: Pull back camera as content sections scroll in
  gsap.timeline({
    scrollTrigger: {
      trigger: '#skills',
      start: 'top bottom',
      end: 'top center',
      scrub: 1,
    }
  })
  .to(samuraiCamera.position, { z: 3.5, y: 0.2 })
  .to(samuraiModel.rotation, { y: Math.PI * 0.15 });

  // Animate skills cards entering sequentially
  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '#skills',
      start: 'top center+=150',
      toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });

  // Animate project cards entering sequentially
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '#projects',
      start: 'top center+=150',
      toggleActions: 'play none none reverse'
    },
    scale: 0.9,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  // Animate contact section
  gsap.from('#contact .glass-panel', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top center+=150',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out"
  });
}

// ==========================================================================
// INTERACTIVE CLICK EVENT: ENTER PORTFOLIO
// ==========================================================================
// AFTER
function enterPortfolio() {
  isInterfaceEntered = true;
  initSynth();
  toggleMute();

  loaderContainer.style.opacity = 0;
  setTimeout(() => { loaderContainer.style.visibility = 'hidden'; }, 800);
  document.body.classList.remove('locked');

  // Entry zoom: push camera in slightly, then pull back to rest
  if (samuraiCamera) {
    const startZ = samuraiCamera.position.z;
    gsap.timeline()
      .to(samuraiCamera.position, {
        z: startZ - 0.6,   // zoom in
        duration: 0.9,
        ease: 'power2.out'
      })
      .to(samuraiCamera.position, {
        z: startZ,          // settle back
        duration: 1.1,
        ease: 'power2.inOut'
      });
  }
}

enterBtn.addEventListener('click', () => {
  if (hasClickedEnter) return; // Prevent double trigger
  hasClickedEnter = true;
  enterPortfolio();
});

// Window Resize event
window.addEventListener('resize', () => {
  if (samuraiRenderer) {
    samuraiCamera.aspect = window.innerWidth / window.innerHeight;
    samuraiCamera.updateProjectionMatrix();
    samuraiRenderer.setSize(window.innerWidth, window.innerHeight);
  }
});

// ==========================================================================
// MAIN INITIALIZER
// ==========================================================================
function init() {
  logTerminal("Initializing System Core...");
  buildSamuraiScene();
  loadCyberSamurai();
  animate();
}

window.addEventListener('load', init);
