/**
 * AudioEngine — Web Audio API cyberpunk drone synthesizer.
 * Pure utility, no React. Call initSynth() on first user gesture,
 * then toggleMute() to switch.
 */

let audioCtx  = null;
let osc1, osc2, osc3, lfo;
let filterNode = null;
let gainNode   = null;
let isMuted    = true;

/** Initialise the synth (call once, on user gesture). */
export function initSynth() {
  if (audioCtx) return;
  try {
    audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
    osc1       = audioCtx.createOscillator();
    osc2       = audioCtx.createOscillator();
    osc3       = audioCtx.createOscillator();
    gainNode   = audioCtx.createGain();
    filterNode = audioCtx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc3.type = 'triangle';

    osc1.frequency.setValueAtTime(55,  audioCtx.currentTime);
    osc2.frequency.setValueAtTime(110, audioCtx.currentTime);
    osc3.frequency.setValueAtTime(165, audioCtx.currentTime);

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

    gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
    osc1.start(); osc2.start(); osc3.start();
  } catch (e) {
    console.warn('Audio initialization failed:', e);
  }
}

/** Toggle mute/unmute. Returns the new isMuted state. */
export function toggleMute() {
  if (!audioCtx) initSynth();

  if (isMuted) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 1);
    isMuted = false;
  } else {
    gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.5);
    isMuted = true;
  }
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}
