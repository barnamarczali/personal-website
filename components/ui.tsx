'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { SPRING_SOFT_OPTIONS } from '@/lib/motion';
import { useIsFinePointer } from '@/lib/hooks';

export type Song = { title: string; url: string };

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

export function ExternalIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  );
}

export function ArrowIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export function DiagonalArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic link                                                             */
/* -------------------------------------------------------------------------- */

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Maximum pull toward the cursor, in pixels. */
  strength?: number;
  external?: boolean;
  title?: string;
  style?: CSSProperties;
};

/**
 * Pulls gently toward the cursor. Desktop pointers only, and inert when the
 * visitor asked for reduced motion.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 5,
  external = true,
  title,
  style,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const enabled = isFinePointer && !prefersReduced;

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, SPRING_SOFT_OPTIONS);
  const y = useSpring(offsetY, SPRING_SOFT_OPTIONS);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const reach = Math.max(rect.width, rect.height);
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    offsetX.set(clamp(dx / reach) * strength);
    offsetY.set(clamp(dy / reach) * strength);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      title={title}
      style={{ ...style, x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Now playing                                                               */
/* -------------------------------------------------------------------------- */

export function Bars({ small = false }: { small?: boolean }) {
  return (
    <span className={`flex items-end gap-[3px] h-5 ${small ? 'bars-sm' : ''}`} aria-hidden="true">
      <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-1" />
      <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-2" />
      <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-3" />
      <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-4" />
    </span>
  );
}

/**
 * `ambient` shows the title inline and is used on the landing page.
 * `heading` keeps the original reveal-on-hover behaviour inside the music view.
 */
export function NowPlaying({ song, variant = 'ambient' }: { song: Song; variant?: 'ambient' | 'heading' }) {
  if (variant === 'heading') {
    return (
      <span className="group inline-flex items-center gap-2">
        <a
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-end gap-[3px] h-5 hover:opacity-80 transition-opacity duration-300"
          aria-label={`currently listening to ${song.title}`}
        >
          <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-1" />
          <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-2" />
          <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-3" />
          <span className="w-[3px] bg-brand-accent rounded-full animate-music-bar-4" />
        </a>
        <span className="font-mono text-sm text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {song.title}
        </span>
      </span>
    );
  }

  return (
    <a
      href={song.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 text-brand-text/50 hover:text-brand-accent transition-colors duration-300"
    >
      <Bars small />
      <span className="font-mono text-[11px] md:text-xs tracking-wide">
        listening to <span className="text-brand-text/75 group-hover:text-brand-accent">{song.title}</span>
      </span>
    </a>
  );
}
