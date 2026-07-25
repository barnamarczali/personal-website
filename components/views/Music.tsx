'use client';

import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import RecommendationInput from '@/components/RecommendationInput';
import { playlists } from '@/lib/data/skills';
import { NowPlaying, type Song } from '@/components/ui';
import { SPRING_SOFT } from '@/lib/motion';

export default function Music({ song }: { song: Song }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 stagger">
      <h2
        style={{ '--i': 0 } as CSSProperties}
        className="text-lg md:text-xl font-medium tracking-tight mb-4 flex items-center gap-3 flex-wrap"
      >
        <span>currently listening to</span>
        <NowPlaying song={song} variant="heading" />
      </h2>

      <p
        style={{ '--i': 1 } as CSSProperties}
        className="text-sm md:text-base font-light leading-relaxed text-brand-text/75 mb-8"
      >
        here, i try to curate some recommendations, display my playlists, and hopefully share some of my own music in
        the future.
      </p>

      <div
        style={{ '--i': 2 } as CSSProperties}
        className="flex flex-wrap gap-3 md:gap-5 mb-10 justify-center md:justify-start"
      >
        {playlists.map((playlist) => (
          <div key={playlist.title} className="group flex flex-col items-center w-[48px]">
            <motion.a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${playlist.title} playlist`}
              whileHover={prefersReduced ? undefined : { scale: 1.25, rotate: -8 }}
              whileTap={prefersReduced ? undefined : { scale: 0.9 }}
              transition={SPRING_SOFT}
              className="text-3xl inline-block"
            >
              {playlist.emoji}
            </motion.a>
            <span className="mt-2 text-xs font-light text-brand-text/70 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {playlist.title}
            </span>
          </div>
        ))}
      </div>

      <div style={{ '--i': 3 } as CSSProperties} className="flex justify-center gap-10">
        <div className="group relative">
          <a
            href="https://music.apple.com/profile/barnamarczali"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:scale-110 transition-transform duration-300 ease-out-expo"
          >
            <img src="/Apple_Music_icon.svg.png" alt="Apple Music profile" className="h-8 w-8 object-contain" />
          </a>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-sm font-light text-brand-text/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            follow me for more
          </span>
        </div>

        <div className="group relative">
          <a
            href="https://on.soundcloud.com/yb21Ek8VYdppd2MFGM"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:scale-110 transition-transform duration-300 ease-out-expo"
          >
            <img src="/soundcloud.png" alt="SoundCloud profile" className="h-8 w-8 object-contain" />
          </a>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 text-sm font-light text-brand-text/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            send me gems on soundcloud
          </span>
        </div>
      </div>

      <div style={{ '--i': 4 } as CSSProperties} className="flex justify-center mt-8">
        <div className="w-full max-w-[24rem] min-w-[12rem]">
          <RecommendationInput placeholder="send me a song" type="song" width="full" />
        </div>
      </div>
    </div>
  );
}
