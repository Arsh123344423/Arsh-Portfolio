import './AudioControl.css';

/**
 * AudioControl Component
 * Renders the audio toggle button and owns the Web Audio API synthesizer.
 */

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let audioCtx  = null;
let osc1, osc2, osc3, lfo;
let filterNode = null;
let gainNode   = null;
let isMuted    = true;

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

/** Returns the audio toggle button HTML string. */
export function createAudioControl() {
  return /* html */ `
    <button class="audio-control" id="audio-toggle" aria-label="Toggle ambient audio">
      <!-- Playing icon -->
      <svg class="audio-icon" id="icon-playing" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
      <!-- Muted icon -->
      <svg class="audio-icon hidden" id="icon-muted" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9"  x2="17" y2="15"></line>
        <line x1="17" y1="9"  x2="23" y2="15"></line>
      </svg>
    </button>
  `;
}

// ---------------------------------------------------------------------------
// Synth
// ---------------------------------------------------------------------------

/** Initialises the Web Audio API synthesizer (call once, on first user gesture). */
export function initSynth() {
  if (audioCtx) return; // already initialized
  try {
    audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
    osc1       = audioCtx.createOscillator();
    osc2       = audioCtx.createOscillator();
    osc3       = audioCtx.createOscillator();
    gainNode   = audioCtx.createGain();
    filterNode = audioCtx.createBiquadFilter();

    // Cyberpunk drone — fat detuned saw waves
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc3.type = 'triangle';

    osc1.frequency.setValueAtTime(55,  audioCtx.currentTime); // A1
    osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // A2
    osc3.frequency.setValueAtTime(165, audioCtx.currentTime); // E3

    osc1.detune.setValueAtTime(-12, audioCtx.currentTime);
    osc2.detune.setValueAtTime( 12, audioCtx.currentTime);
    osc3.detune.setValueAtTime(  0, audioCtx.currentTime);

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(220, audioCtx.currentTime);
    filterNode.Q.setValueAtTime(4, audioCtx.currentTime);

    lfo = audioCtx.createOscillator();
    const lfoGain     = audioCtx.createGain();
    lfo.frequency.value = 0.15;
    lfoGain.gain.value  = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();

    osc1.connect(filterNode);
    osc2.connect(filterNode);
    osc3.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime); // muted initially
    osc1.start(); osc2.start(); osc3.start();
  } catch (e) {
    console.warn('Audio initialization failed:', e);
  }
}

/** Toggles mute/unmute state. */
export function toggleMute() {
  if (!audioCtx) initSynth();

  const playingIcon = document.getElementById('icon-playing');
  const mutedIcon   = document.getElementById('icon-muted');

  if (isMuted) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 1);
    isMuted = false;
    playingIcon?.classList.remove('hidden');
    mutedIcon?.classList.add('hidden');
  } else {
    gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.5);
    isMuted = true;
    playingIcon?.classList.add('hidden');
    mutedIcon?.classList.remove('hidden');
  }
}

/** Wires up the click listener on the rendered toggle button. */
export function bindAudioControl() {
  document.getElementById('audio-toggle')?.addEventListener('click', toggleMute);
}
