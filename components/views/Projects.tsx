'use client';

import type { CSSProperties } from 'react';
import { featuredProject, projectGroups, upcomingProjects, type Project, type ProjectLink } from '@/lib/data/projects';
import { ExternalIcon, GithubIcon } from '@/components/ui';

/* Flat surfaces only: the cards read as tinted panels with a hairline, not as
   floating glass. box-shadow is in the transition because Tailwind rings are
   box-shadows; no shadow-* utilities exist here, so nothing glows. */
const LIFT =
  'transition-[transform,background-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.995]';

function LinkIcons({ links, size = 'w-5 h-5' }: { links: ProjectLink[]; size?: string }) {
  return (
    <div className="flex gap-2.5 shrink-0">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="text-brand-text/70 hover:text-brand-accent transition-[color,transform] duration-300 ease-out-expo hover:-translate-y-[1px] hover:translate-x-[1px]"
        >
          {link.kind === 'github' ? <GithubIcon className={size} /> : <ExternalIcon className={size} />}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group relative flex flex-col h-full rounded-md p-4 md:p-5 bg-brand-accent/[0.06] ring-1 ring-brand-text/[0.06] hover:bg-brand-accent/[0.10] hover:ring-brand-accent/25 ${LIFT}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base md:text-lg font-medium text-brand-accent leading-snug">{project.title}</h3>
        <LinkIcons links={project.links} />
      </div>
      <p className="mt-2 text-sm font-light leading-relaxed text-brand-text/75">{project.description}</p>
    </article>
  );
}

export default function Projects() {
  return (
    <div className="w-full max-w-2xl mx-auto stagger">
      <h2 style={{ '--i': 0 } as CSSProperties} className="text-lg md:text-xl font-medium tracking-tight mb-6">
        some of the things i&apos;ve built...
      </h2>

      {/* Featured: the startup gets the whole width and the loudest surface. */}
      <article
        style={{ '--i': 1 } as CSSProperties}
        className={`group relative rounded-md p-5 md:p-6 mb-8 bg-brand-accent/[0.12] ring-1 ring-brand-accent/25 hover:bg-brand-accent/[0.16] hover:ring-brand-accent/40 ${LIFT}`}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
            {featuredProject.badge}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-brand-text/45">{featuredProject.period}</span>
        </div>
        <div className="flex items-start justify-between gap-4 mt-2">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-brand-text">{featuredProject.title}</h3>
          <LinkIcons links={featuredProject.links} size="w-6 h-6" />
        </div>
        <p className="mt-3 text-sm md:text-base font-light leading-relaxed text-brand-text/80 max-w-[46ch]">
          {featuredProject.description}
        </p>
      </article>

      {projectGroups.map((group, groupIndex) => (
        <section key={group.id} style={{ '--i': 2 + groupIndex } as CSSProperties} className="mb-8">
          <h3 className="text-sm font-light text-brand-text/45 mb-3">{group.label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {group.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ))}

      {upcomingProjects.length > 0 && (
        <p
          style={{ '--i': 2 + projectGroups.length } as CSSProperties}
          className="text-sm font-light text-brand-text/40 border-t border-brand-text/10 pt-4"
        >
          {upcomingProjects.map((project) => (
            <span key={project.slug}>
              {project.title}, {project.note}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
