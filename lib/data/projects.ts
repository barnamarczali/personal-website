/** Project data. */

export type ProjectLink = {
  kind: 'site' | 'github';
  url: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  links: ProjectLink[];
  /** Shown instead of links when there is nothing to link to yet. */
  note?: string;
};

export type ProjectGroup = {
  id: string;
  label: string;
  projects: Project[];
};

/** The only thing still in progress. Everything below it has shipped or ended. */
export const featuredProject: Project & { badge: string; period: string } = {
  slug: 'scout',
  title: 'scout',
  badge: 'currently',
  period: '',
  description:
    'ugc creator sourcing built on trust. hand-picking creators for brands and brands for creators, because finding the right match should be done on a marketplace',
  links: [{ kind: 'site', url: 'https://scoutnow.me', label: 'visit scout' }],
};

export const projectGroups: ProjectGroup[] = [
  {
    id: 'startups',
    label: 'startups',
    projects: [
      {
        slug: 'dayli',
        title: 'dayli',
        description:
          'a social app to help everyone not lose their friends and people who are important to them, and to encourage real connection in a world where everyone is so preoccupied with work, "social" media, and the other millions of distractions',
        links: [{ kind: 'site', url: 'https://www.dayli.social', label: 'visit dayli' }],
      },
      {
        slug: 'spark-ai',
        title: 'spark.ai',
        description: 'an ai-powered "online yc" platform to guide founders from idea to mvp',
        links: [{ kind: 'site', url: 'https://www.usespark.ai', label: 'visit spark.ai' }],
      },
    ],
  },
  {
    id: 'hackathons',
    label: 'hackathons',
    projects: [
      {
        slug: 'robot-48hrs',
        title: 'building a robot in 48hrs',
        description:
          'we built a full stack, fully functional land robot in limited time, from 0 to 1, to launch the bme robotics club with its first successful project. read our blog for more',
        links: [{ kind: 'site', url: 'https://www.bmerobotics.hu/newsroom/1', label: 'read the blog' }],
      },
      {
        slug: 'tremolo',
        title: 'tremolo',
        description:
          'real-time speech coach overlay for video calls: tracks pace, filler words, eye contact, and star method responses... built for nexhacks at cmu',
        links: [{ kind: 'github', url: 'https://github.com/BigBoa19/NexHacks', label: 'tremolo on github' }],
      },
      {
        slug: 'terminail',
        title: 'i know where you live / terminail',
        description:
          'osint profiling tool built for the cursor hackathon singapore where you can look up anyone and get a detailed profile built on them based on publicly available information on the internet',
        links: [{ kind: 'github', url: 'https://github.com/budaic/i-know-where-you-live', label: 'terminail on github' }],
      },
    ],
  },
  {
    id: 'shipped',
    label: 'other stuff',
    projects: [
      {
        slug: 'studocu-on-chain',
        title: 'studocu on-chain',
        description:
          'a decentralized, open-source document-sharing platform built on ethereum, based on the popular platform studocu, with working minimal product deployed on vercel',
        links: [
          { kind: 'github', url: 'https://github.com/Arnie016/StudocuOnChain', label: 'studocu on-chain on github' },
          { kind: 'site', url: 'https://interface-demo-vert.vercel.app/', label: 'try the demo' },
        ],
      },
      {
        slug: 'bridgeway',
        title: 'bridgeway world',
        description:
          'building a community in higher education based on mentorship, collaboration, and professional opportunities',
        links: [{ kind: 'site', url: 'https://www.bridgewayworld.com', label: 'visit bridgeway world' }],
      },
      {
        slug: 'personal-website',
        title: 'personal website',
        description: 'this very site :) let me know how to improve it!',
        links: [
          { kind: 'github', url: 'https://github.com/barnamarczali/personal-website', label: 'this site on github' },
        ],
      },
    ],
  },
];

/** Not shipped yet, so it gets a footnote rather than a card. */
export const upcomingProjects: Project[] = [
  {
    slug: 'algo-trading',
    title: 'algorithmic trading services',
    description: 'algorithmic trading strategies as a service',
    links: [],
    note: 'coming soon',
  },
];
