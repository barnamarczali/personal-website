/**
 * One easing family for the whole site. The CSS mirror of these lives in
 * globals.css as --ease-out-expo / --duration-*; keep both in sync.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Loose, toy-like. Used for emoji and anything that should feel like a toy. */
export const SPRING_SOFT = { type: 'spring' as const, stiffness: 300, damping: 20, mass: 0.5 };

/** The same feel, in the shape useSpring() wants. */
export const SPRING_SOFT_OPTIONS = { stiffness: 300, damping: 20, mass: 0.5 };

/** Tight and decisive. Used for the nav indicator, which tracks state. */
export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };

/** Slight overshoot, for things that should pop into place. */
export const SPRING_POP = { type: 'spring' as const, stiffness: 300, damping: 18 };
