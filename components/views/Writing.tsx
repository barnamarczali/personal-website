'use client';

import type { CSSProperties } from 'react';
import RecommendationInput from '@/components/RecommendationInput';
import { draftTitles } from '@/lib/data/skills';

export default function Writing() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-0 stagger">
      <div style={{ '--i': 0 } as CSSProperties} className="flex items-center gap-2 mb-6">
        <p className="text-base md:text-lg font-light leading-relaxed">still typing...</p>
        <img
          src="/beachball.svg"
          alt=""
          aria-hidden="true"
          className="w-5 h-5 animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>

      {draftTitles.length > 0 && (
        <div style={{ '--i': 1 } as CSSProperties} className="mb-8">
          <h2 className="text-sm font-light text-brand-text/45 mb-3">drafts currently fighting for my attention</h2>
          <ul className="space-y-2">
            {draftTitles.map((title, index) => (
              <li key={title} className="flex gap-3 text-sm md:text-base font-light text-brand-text/70">
                <span className="font-mono tabular-nums text-xs text-brand-text/30 pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ '--i': 2 } as CSSProperties}>
        <RecommendationInput placeholder="what should i write about next?" type="writing" width="full" />
      </div>
    </div>
  );
}
