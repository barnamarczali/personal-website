'use client';

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from 'react';

/* -------------------------------------------------------------------------- */
/*  Scroll container                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Views scroll inside <main>, not the window, so scroll-linked animation needs
 * a handle on that element rather than reaching for the document.
 */
export const ScrollContainerContext = createContext<RefObject<HTMLElement> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

/* -------------------------------------------------------------------------- */
/*  Time of day                                                               */
/* -------------------------------------------------------------------------- */

type Phase = 'dawn' | 'day' | 'dusk' | 'night';

/** RGB channel triplets so Tailwind opacity modifiers keep working. */
const PALETTES: Record<Phase, { lift: string; base: string; deep: string }> = {
  dawn: { lift: '18 80 143', base: '10 60 116', deep: '6 31 61' },
  day: { lift: '10 74 140', base: '6 57 112', deep: '4 31 61' },
  dusk: { lift: '14 62 120', base: '8 50 95', deep: '4 24 47' },
  night: { lift: '6 48 92', base: '4 38 75', deep: '2 15 34' },
};

function phaseFor(hour: number): Phase {
  if (hour >= 5 && hour < 9) return 'dawn';
  if (hour >= 9 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'dusk';
  return 'night';
}

/**
 * Shifts the navy with the visitor's clock. Runs after mount so server and
 * client agree on first paint, then re-checks every ten minutes.
 */
export function useTimeOfDay() {
  useEffect(() => {
    const apply = () => {
      const palette = PALETTES[phaseFor(new Date().getHours())];
      const root = document.documentElement;
      root.style.setProperty('--brand-bg-lift', palette.lift);
      root.style.setProperty('--brand-bg', palette.base);
      root.style.setProperty('--brand-bg-deep', palette.deep);
    };

    apply();
    const id = window.setInterval(apply, 10 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Input capabilities                                                        */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/** Magnetic hover is desktop-only: it has nothing to track on touch. */
export function useIsFinePointer() {
  return useMediaQuery('(pointer: fine)');
}

/* -------------------------------------------------------------------------- */
/*  Key sequence                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Fires when the visitor types `sequence` outside of a text field. The callback
 * is held in a ref so passing an inline function does not resubscribe the
 * listener on every render.
 */
export function useKeySequence(sequence: string, onMatch: () => void) {
  const handler = useRef(onMatch);
  handler.current = onMatch;

  useEffect(() => {
    let buffer = '';

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-sequence.length);
      if (buffer === sequence) {
        buffer = '';
        handler.current();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sequence]);
}
