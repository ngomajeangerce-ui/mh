import { useRef, useCallback, useEffect } from 'react';

export type DrumSound = 'kick' | 'snare' | 'hihat' | 'clap';

export interface AudioEngineConfig {
  bpm: number;
  steps: number;
}

export function useAudioEngine(config: AudioEngineConfig) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerIdRef = useRef<number | null>(null);
  const currentStepRef = useRef(0);
  const nextNoteTimeRef = useRef(0);
  const isPlayingRef = useRef(false);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playKick = useCallback((time: number) => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);

    gainNode.gain.setValueAtTime(1, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.5);
  }, [getAudioContext]);

  const playSnare = useCallback((time: number) => {
    const ctx = getAudioContext();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 200;
    
    oscGain.gain.setValueAtTime(0.7, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(time);
    osc.start(time);
    noise.stop(time + 0.2);
    osc.stop(time + 0.1);
  }, [getAudioContext]);

  const playHiHat = useCallback((time: number) => {
    const ctx = getAudioContext();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 10000;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.5, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    noise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(time);
    noise.stop(time + 0.05);
  }, [getAudioContext]);

  const playClap = useCallback((time: number) => {
    const ctx = getAudioContext();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    for (let i = 0; i < 3; i++) {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 2000;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.7, time + i * 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + i * 0.01 + 0.1);

      noise.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(ctx.destination);

      noise.start(time + i * 0.01);
      noise.stop(time + i * 0.01 + 0.1);
    }
  }, [getAudioContext]);

  const playSynth = useCallback((frequency: number, time: number, duration: number = 0.3) => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.Q.setValueAtTime(5, time);

    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.3, time + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }, [getAudioContext]);

  const playDrumSound = useCallback((sound: DrumSound, time: number) => {
    switch (sound) {
      case 'kick':
        playKick(time);
        break;
      case 'snare':
        playSnare(time);
        break;
      case 'hihat':
        playHiHat(time);
        break;
      case 'clap':
        playClap(time);
        break;
    }
  }, [playKick, playSnare, playHiHat, playClap]);

  useEffect(() => {
    return () => {
      if (schedulerIdRef.current !== null) {
        cancelAnimationFrame(schedulerIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    getAudioContext,
    playDrumSound,
    playSynth,
    isPlayingRef,
    currentStepRef,
    nextNoteTimeRef,
    schedulerIdRef,
  };
}
