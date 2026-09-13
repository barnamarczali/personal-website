'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { earlierTimeline, education, timeline, type TimelineEntry } from '@/lib/data/timeline';
import { interests, skillGroups } from '@/lib/data/skills';
import { SPRING_POP } from '@/lib/motion';
import { useScrollContainer } from '@/lib/hooks';

const SECTIONS = [
  { id: 'longer', label: 'the longer version' },
  { id: 'education', label: 'education' },
  { id: 'experience', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'interests', label: 'interests' },
];

const pillClass =
  'px-2.5 py-0.5 rounded-md text-sm md:text-base font-light leading-relaxed ring-1 ring-brand-text/10 hover:ring-brand-accent/40 hover:text-brand-accent transition-all duration-300';

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-lg md:text-xl font-medium tracking-tight text-brand-text mb-5">
      {children}
    </h2>
  );
}

function TimelineRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const scrollRef = useScrollContainer();
  const prefersReduced = useReducedMotion();

  return (
    <div className={`flex gap-2 items-start ${entry.featured ? 'pb-7' : 'pb-4'}`}>
      <span
        className={`font-mono tabular-nums tracking-wider whitespace-nowrap w-12 md:w-14 text-right pt-[0.35rem] ${
          entry.featured ? 'text-xs md:text-sm text-brand-text/55' : 'text-[11px] md:text-xs text-brand-text/40'
        }`}
      >
        {entry.year}
      </span>

      <span className="w-3 shrink-0 flex justify-center pt-[0.5rem] md:pt-[0.6rem]">
        <motion.span
          initial={prefersReduced ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, root: scrollRef ?? undefined, amount: 0.5 }}
          transition={{ ...SPRING_POP, delay: Math.min(index, 6) * 0.03 }}
          className={
            entry.featured
              ? 'block w-3 h-3 rounded-full bg-brand-accent ring-4 ring-brand-accent/15'
              : 'block w-2 h-2 rounded-full border border-brand-accent/60 bg-brand-bg'
          }
        />
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={
            entry.featured
              ? 'text-base md:text-lg leading-relaxed font-medium text-brand-text'
              : 'text-sm md:text-base leading-relaxed font-light text-brand-text/80'
          }
        >
          <span className="text-brand-accent">{entry.role}</span>{' '}
          <span className="font-light text-brand-text/85">at {entry.org}</span>
        </p>
        <p className="text-xs md:text-sm font-light text-brand-text/45 mt-0.5">{entry.location}</p>
      </div>
    </div>
  );
}

export default function About() {
  const scrollRef = useScrollContainer();
  const prefersReduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [showEarlier, setShowEarlier] = useState(false);

  const { scrollYProgress } = useScroll({
    container: scrollRef ?? undefined,
    target: timelineRef,
    offset: ['start 0.9', 'end 0.65'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const root = scrollRef?.current ?? null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { root, rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [scrollRef]);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="w-full mx-auto max-w-[62rem]">
      <div className="xl:grid xl:grid-cols-[minmax(0,16rem)_minmax(0,38rem)] xl:gap-16">
        {/* Identity rail: sticky on large screens, a normal intro block below that. */}
        <div className="w-full max-w-[40rem] mx-auto xl:max-w-none xl:mx-0 xl:sticky xl:top-24 xl:self-start stagger">
          <div style={{ '--i': 0 } as CSSProperties} className="flex items-center gap-4 mb-5">
            <img
              src="/git_pfp.png"
              alt="barna marczali"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-1 ring-brand-text/15"
            />
            <h2 className="text-lg md:text-xl font-medium tracking-tight text-brand-text">whoami?</h2>
          </div>

          <p
            style={{ '--i': 1 } as CSSProperties}
            className="text-base md:text-lg font-light leading-relaxed text-brand-text/85"
          >
            hi! i&apos;m barna, currently building{' '}
            <a
              href="https://tryscouty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-accent hover:text-brand-accent/75 transition-colors duration-300"
            >
              scouty
            </a>
            , a platform for ugc creator sourcing. before that i co-founded dayli, a social app. i study{' '}
            <span className="font-medium text-brand-text">cs + econ at johns hopkins</span>, spent a semester on
            exchange at nus in singapore, and i love to read, play football and the guitar.
          </p>

          <nav
            style={{ '--i': 2 } as CSSProperties}
            aria-label="sections"
            className="hidden xl:flex flex-col gap-2 mt-10 pt-6 border-t border-brand-text/10"
          >
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => goToSection(section.id)}
                className={`text-left text-sm font-light transition-colors duration-150 ${
                  activeSection === section.id ? 'text-brand-accent' : 'text-brand-text/40 hover:text-brand-text/75'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main column */}
        <div className="w-full max-w-[40rem] mx-auto xl:max-w-none xl:mx-0 mt-14 xl:mt-0 stagger">
          <section style={{ '--i': 3 } as CSSProperties} className="mb-14">
            <SectionHeading id="longer">the longer version</SectionHeading>
            <p className="text-base md:text-lg font-light leading-relaxed mb-4 text-brand-text/85">
              my countless interests include startups, ai, ml, web dev ui/ux, fintech, reading, music, football (the real one)
              and more. always looking for new challenges and opportunities to learn and grow, i am determined to make
              a positive impact on the world with technology that will make the difference.
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-brand-text/85">
              so welcome to my site, i hope you find it useful! please feel free to reach out on any of
              the platforms if you think we can learn together, build something cool, or just to chat. i love to
              connect with anyone :)
            </p>
          </section>

          <section style={{ '--i': 4 } as CSSProperties} className="mb-14">
            <SectionHeading id="education">education</SectionHeading>
            <div className="space-y-6">
              {education.map((school) => (
                <div key={school.alt} className="flex items-center gap-4">
                  <a
                    href={school.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity duration-300 shrink-0"
                  >
                    <img
                      src={school.logo}
                      alt={school.alt}
                      className="h-11 w-11 object-contain"
                      style={school.invert ? { filter: 'brightness(0) invert(1)', opacity: 0.95 } : undefined}
                    />
                  </a>
                  <p className="text-sm md:text-base font-light leading-relaxed text-brand-text/85">
                    {school.line}
                    <br />
                    <span className="font-mono tabular-nums text-xs md:text-sm text-brand-text/45">{school.years}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ '--i': 5 } as CSSProperties} className="mb-14">
            <SectionHeading id="experience">experience</SectionHeading>

            <div ref={timelineRef} className="relative">
              {/* Faded track, always visible, so the column reads even before the
                  drawn line catches up. */}
              <div className="absolute left-[3.875rem] md:left-[4.375rem] top-2 bottom-2 w-px bg-brand-accent/20" />
              <motion.div
                style={{ scaleY: prefersReduced ? 1 : lineScale }}
                className="absolute left-[3.875rem] md:left-[4.375rem] top-2 bottom-2 w-px bg-brand-accent/70 origin-top"
              />

              <div className="relative">
                {timeline.map((entry, index) => (
                  <TimelineRow key={`${entry.year}-${entry.org}`} entry={entry} index={index} />
                ))}

                {showEarlier &&
                  earlierTimeline.map((entry, index) => (
                    <TimelineRow key={`${entry.year}-${entry.org}`} entry={entry} index={index} />
                  ))}
              </div>
            </div>

            <button
              onClick={() => setShowEarlier((open) => !open)}
              className="mt-2 ml-[4.65rem] md:ml-[5.1rem] text-sm font-light text-brand-text/45 hover:text-brand-accent transition-colors duration-300"
            >
              {showEarlier ? 'hide the origin story' : 'the origin story (2020-2022)'}
              <span
                className={`inline-block ml-1.5 transition-transform duration-300 ease-out-expo ${
                  showEarlier ? 'rotate-180' : ''
                }`}
              >
                ↓
              </span>
            </button>
          </section>

          <section style={{ '--i': 6 } as CSSProperties} className="mb-14">
            <SectionHeading id="skills">skills</SectionHeading>
            <div className="grid grid-cols-[4.25rem_1fr] md:grid-cols-[5.5rem_1fr] gap-x-4 md:gap-x-6 gap-y-5 items-baseline">
              {skillGroups.map((group) => (
                <Fragment key={group.label}>
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.18em] text-brand-text/40 text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${pillClass} ${group.tint}`}
                      >
                        {skill.name}
                      </a>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </section>

          <section style={{ '--i': 7 } as CSSProperties}>
            <SectionHeading id="interests">interests</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <a
                  key={interest.name}
                  href={interest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pillClass} bg-brand-accent/10`}
                >
                  {interest.name}
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm md:text-base font-light leading-relaxed text-brand-text/60">
              if you share any of these interests or found my site useful, feel free to reach out!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
