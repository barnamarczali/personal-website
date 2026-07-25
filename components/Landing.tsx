'use client';

import type { CSSProperties } from 'react';
import { socials } from '@/lib/data/socials';
import { ArrowIcon, MagneticLink, NowPlaying, type Song } from '@/components/ui';

const NAME = 'barna marczali';

/** Beat after which the sub-elements start arriving, in ms. */
const AFTER_LETTERS = NAME.length * 35 + 320;

type Props = {
  onExpand: () => void;
  song: Song | null;
};

export default function Landing({ onExpand, song }: Props) {
  return (
    <div className="flex flex-col items-start max-w-[min(92vw,44rem)]">
      <button
        onClick={onExpand}
        aria-label="open the site"
        className="group flex items-baseline gap-3 md:gap-5 cursor-pointer bg-transparent border-none p-0 text-left"
      >
        <h1
          className="font-extralight tracking-[-0.035em] leading-[0.95] text-brand-text group-hover:text-brand-accent transition-colors duration-300"
          style={{ fontSize: 'clamp(2.75rem, 8vw + 0.5rem, 6.5rem)' }}
        >
          {NAME.split('').map((character, index) => (
            <span key={`${character}-${index}`} className="letter" style={{ '--i': index } as CSSProperties}>
              {character}
            </span>
          ))}
        </h1>
        <ArrowIcon className="soft-in w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0 text-brand-text/70 group-hover:text-brand-accent group-hover:translate-x-1.5 transition-all duration-300 ease-out-expo" />
      </button>

      <p
        className="soft-in mt-5 md:mt-7 text-sm md:text-base font-light leading-relaxed text-brand-text/60"
        style={{ '--delay': `${AFTER_LETTERS}ms` } as CSSProperties}
      >
        building{' '}
        <a
          href="https://scoutnow.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent hover:text-brand-accent/75 transition-colors duration-300"
        >
          scout
        </a>
        , studying cs + econ at johns hopkins, playing guitar and football (the real one).
      </p>

      <nav
        aria-label="social links"
        className="soft-in mt-7 md:mt-9 flex flex-wrap gap-x-6 gap-y-3 md:gap-x-10"
        style={{ '--delay': `${AFTER_LETTERS + 140}ms` } as CSSProperties}
      >
        {socials.map((social) => (
          <MagneticLink
            key={social.name}
            href={social.url}
            external={!social.url.startsWith('mailto:')}
            className="text-brand-text/85 hover:text-brand-accent transition-colors duration-300 text-xs md:text-sm font-light"
          >
            {social.name}
          </MagneticLink>
        ))}
      </nav>

      {song && (
        <div className="soft-in mt-8 md:mt-10" style={{ '--delay': `${AFTER_LETTERS + 300}ms` } as CSSProperties}>
          <NowPlaying song={song} />
        </div>
      )}
    </div>
  );
}
