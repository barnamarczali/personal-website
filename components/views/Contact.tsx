'use client';

import type { CSSProperties } from 'react';
import { CALENDLY, contactOnlySocials, EMAIL, socials } from '@/lib/data/socials';
import { DiagonalArrowIcon, MagneticLink } from '@/components/ui';

/** Recolouring lives in globals.css under .contact-icon so it sits in a transition. */
const iconSocials = [...socials.filter((social) => social.icon), ...contactOnlySocials];

function UnderlinedLink({ href, children, external }: { href: string; children: string; external?: boolean }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-1 md:gap-2"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="relative break-all">
        {children}
        <span className="absolute left-0 bottom-0 w-full h-px bg-brand-text/70" />
        <span className="absolute left-0 bottom-0 w-full h-px bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out-expo" />
      </span>
      <DiagonalArrowIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-brand-text/70 group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out-expo" />
    </a>
  );
}

export default function Contact() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 stagger">
      <h2 style={{ '--i': 0 } as CSSProperties} className="text-lg md:text-xl font-medium tracking-tight mb-4">
        reach out!
      </h2>

      <p
        style={{ '--i': 1 } as CSSProperties}
        className="text-sm md:text-base font-light leading-relaxed text-brand-text/80 mb-8"
      >
        if you are thinking about reaching out, just do it. about anything, anytime, anywhere
      </p>

      <div
        style={{ '--i': 2 } as CSSProperties}
        className="flex justify-center items-center gap-5 md:gap-7 mb-10 flex-wrap"
      >
        {iconSocials.map((social) => (
          <MagneticLink
            key={social.name}
            href={social.url}
            title={social.name}
            strength={6}
            className={`contact-icon flex items-center justify-center ${social.iconClass ?? 'w-7 h-7'}`}
          >
            <img src={social.icon} alt={social.name} className="w-full h-full object-contain" />
          </MagneticLink>
        ))}
      </div>

      <div style={{ '--i': 3 } as CSSProperties} className="space-y-4">
        <p className="text-sm md:text-base font-light leading-relaxed break-words text-brand-text/80">
          best way to make sure your message gets to me {'->'}{' '}
          <UnderlinedLink href={`mailto:${EMAIL}`}>{EMAIL}</UnderlinedLink>
        </p>
        <p className="text-sm md:text-base font-light leading-relaxed text-brand-text/80">
          or{' '}
          <UnderlinedLink href={CALENDLY} external>
            schedule a call with me
          </UnderlinedLink>
        </p>
      </div>
    </div>
  );
}
