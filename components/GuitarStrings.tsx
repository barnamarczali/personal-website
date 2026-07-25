'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from '@/lib/motion';

/** Standard tuning, low to high. */
const STRINGS = [
  { note: 'E', freq: 82.41 },
  { note: 'A', freq: 110.0 },
  { note: 'D', freq: 146.83 },
  { note: 'G', freq: 196.0 },
  { note: 'B', freq: 246.94 },
  { note: 'e', freq: 329.63 },
];

const DECAY_SECONDS = 2.2;

/**
 * Karplus-Strong: fill a delay line one period long with noise, then repeatedly
 * low-pass it against itself. Cheap, and it sounds like a plucked string.
 */
function pluck(context: AudioContext, frequency: number, destination: AudioNode) {
  const sampleRate = context.sampleRate;
  const period = Math.max(2, Math.round(sampleRate / frequency));
  const length = Math.floor(sampleRate * DECAY_SECONDS);

  const buffer = context.createBuffer(1, length, sampleRate);
  const output = buffer.getChannelData(0);

  const ring = new Float32Array(period);
  for (let i = 0; i < period; i += 1) ring[i] = Math.random() * 2 - 1;

  let index = 0;
  for (let i = 0; i < length; i += 1) {
    const current = ring[index];
    const next = ring[(index + 1) % period];
    const averaged = 0.5 * (current + next) * 0.996;
    ring[index] = averaged;
    output[i] = averaged;
    index = (index + 1) % period;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.3, context.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + DECAY_SECONDS);

  source.connect(gain);
  gain.connect(destination);
  source.start();
  source.stop(context.currentTime + DECAY_SECONDS);
}

export default function GuitarStrings({ open, onClose }: { open: boolean; onClose: () => void }) {
  const contextRef = useRef<AudioContext | null>(null);
  const lastStringRef = useRef<number | null>(null);
  const [ringing, setRinging] = useState<Record<number, number>>({});
  const [muted, setMuted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Tear the audio graph down when the overlay closes.
  useEffect(() => {
    if (open) return;
    lastStringRef.current = null;
    setRinging({});
    const context = contextRef.current;
    contextRef.current = null;
    context?.close().catch(() => undefined);
  }, [open]);

  const strike = useCallback(
    (stringIndex: number) => {
      setRinging((current) => ({ ...current, [stringIndex]: (current[stringIndex] ?? 0) + 1 }));
      if (muted) return;

      // Created inside the visitor's own gesture, so this is never autoplay.
      if (!contextRef.current) {
        const Ctor =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        contextRef.current = new Ctor();
      }
      const context = contextRef.current;
      if (context.state === 'suspended') void context.resume();
      pluck(context, STRINGS[stringIndex].freq, context.destination);
    },
    [muted]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relative = (event.clientY - bounds.top) / bounds.height;
    const band = Math.floor(relative * STRINGS.length);
    if (band < 0 || band >= STRINGS.length) return;
    if (lastStringRef.current === band) return;
    lastStringRef.current = band;
    strike(band);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          <div className="absolute inset-0 bg-brand-bg-deep/80 backdrop-blur-sm" />

          <div
            className="absolute inset-0 flex flex-col justify-center touch-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              lastStringRef.current = null;
            }}
          >
            {STRINGS.map((string, index) => (
              <div
                key={string.note + index}
                className="relative flex-1 flex items-center cursor-pointer"
                onPointerDown={() => strike(index)}
              >
                <motion.div
                  // Re-keying on the strike count restarts the wobble each pluck.
                  key={ringing[index] ?? 0}
                  initial={prefersReduced || !ringing[index] ? false : { scaleY: 3.5, opacity: 1 }}
                  animate={{ scaleY: 1, opacity: 0.55 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                  className="w-full origin-center bg-brand-text/55"
                  style={{ height: 1 + index * 0.35 }}
                />
                <span className="absolute left-4 md:left-8 -translate-y-4 font-mono text-[10px] tracking-widest text-brand-text/25">
                  {string.note}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-5 right-5 flex items-center gap-3">
            <button
              onClick={() => setMuted((value) => !value)}
              className="font-mono text-[10px] tracking-widest text-brand-text/45 hover:text-brand-accent transition-colors duration-300"
            >
              {muted ? 'sound off' : 'sound on'}
            </button>
            <button
              onClick={onClose}
              className="font-mono text-[10px] tracking-widest text-brand-text/45 hover:text-brand-accent transition-colors duration-300"
            >
              close
            </button>
          </div>

          <p className="absolute bottom-8 inset-x-0 text-center font-mono text-[10px] tracking-widest text-brand-text/35">
            drag across the strings
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
