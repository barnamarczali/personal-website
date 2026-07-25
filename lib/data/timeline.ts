export type TimelineEntry = {
  year: string;
  role: string;
  org: string;
  location: string;
  /** Founder and paid roles get a larger dot and heavier type. */
  featured?: boolean;
};

/** Shown by default, newest first. */
export const timeline: TimelineEntry[] = [
  { year: '2026', role: 'co-founder', org: 'scout', location: 'new york, ny', featured: true },
  { year: '2026', role: 'co-founder, cto/coo', org: 'dayli', location: 'baltimore, md', featured: true },
  { year: '2025', role: 'summer vc intern', org: 'day1 capital', location: 'budapest, hungary', featured: true },
  {
    year: '2025',
    role: 'co-founder & developer',
    org: 'johns hopkins algorithmic trading club',
    location: 'baltimore, md',
    featured: true,
  },
  { year: '2024', role: 'co-founder, cto', org: 'spark.ai', location: 'baltimore, md', featured: true },
  {
    year: '2024',
    role: 'python developer',
    org: 'johns hopkins sports analytics research group',
    location: 'baltimore, md',
  },
  { year: '2024', role: 'vp of consulting & board member', org: 'ama jhu, nest strategies', location: 'baltimore, md' },
  {
    year: '2023',
    role: 'team lead & board member',
    org: 'johns hopkins university economics club',
    location: 'baltimore, md',
  },
];

/** Folded behind a toggle so the default view stays scannable. */
export const earlierTimeline: TimelineEntry[] = [
  { year: '2022', role: 'private equity associate intern', org: 'asp group', location: 'vienna, austria' },
  { year: '2022', role: 'marketing intern', org: 'enpulsion gmbh', location: 'vienna, austria' },
  { year: '2022', role: 'co-founder & president', org: 'milestone business society', location: 'budapest, hungary' },
  { year: '2021', role: 'co-creator', org: 'tesztallomas.hu', location: 'budapest, hungary' },
  { year: '2020', role: 'co-founder', org: 'urban ai parking assistant', location: 'budapest, hungary' },
];

export type Education = {
  logo: string;
  alt: string;
  /** JHU's mark ships dark, so it needs inverting on the navy background. */
  invert?: boolean;
  wiki: string;
  line: string;
  years: string;
};

export const education: Education[] = [
  {
    logo: '/jhu.png',
    alt: 'Johns Hopkins University',
    invert: true,
    wiki: 'https://en.wikipedia.org/wiki/Johns_Hopkins_University',
    line: 'computer science & economics [at] johns hopkins university',
    years: '2023-2027',
  },
  {
    logo: '/nus.png',
    alt: 'National University of Singapore',
    wiki: 'https://en.wikipedia.org/wiki/National_University_of_Singapore',
    line: 'engineering exchange [at] national university of singapore',
    years: '2025',
  },
];
