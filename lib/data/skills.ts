export type Skill = { name: string; url: string };

export type SkillGroup = {
  /** Short row label rendered in the left column of the skills grid. */
  label: string;
  /** Tailwind background utility for this group's pills. */
  tint: string;
  skills: Skill[];
};

const wiki = (path: string) => `https://en.wikipedia.org/wiki/${path}`;

export const skillGroups: SkillGroup[] = [
  {
    label: 'code',
    tint: 'bg-brand-accent/15',
    skills: [
      { name: 'react', url: wiki('React_(software)') },
      { name: 'next.js', url: wiki('Next.js') },
      { name: 'html', url: wiki('HTML') },
      { name: 'css', url: wiki('CSS') },
      { name: 'java', url: wiki('Java_(programming_language)') },
      { name: 'javascript', url: wiki('JavaScript') },
      { name: 'python', url: wiki('Python_(programming_language)') },
      { name: 'pytorch', url: wiki('PyTorch') },
      { name: 'c/c++', url: wiki('C%2B%2B') },
      { name: 'sql', url: wiki('SQL') },
      { name: 'r', url: wiki('R_(programming_language)') },
      { name: 'solidity', url: wiki('Solidity') },
      { name: 'solidworks', url: wiki('SolidWorks') },
    ],
  },
  {
    label: 'finance',
    tint: 'bg-slate-300/15',
    skills: [
      { name: 'financial analysis', url: wiki('Financial_analysis') },
      { name: 'algorithmic trading', url: wiki('Algorithmic_trading') },
      { name: 'quantconnect', url: wiki('QuantConnect') },
    ],
  },
  {
    label: 'languages',
    tint: 'bg-sky-300/15',
    skills: [
      { name: 'hungarian', url: wiki('Hungarian_language') },
      { name: 'english', url: wiki('English_language') },
      { name: 'spanish', url: wiki('Spanish_language') },
      { name: 'hebrew', url: wiki('Hebrew_language') },
    ],
  },
  {
    label: 'music',
    tint: 'bg-amber-300/15',
    skills: [
      { name: 'electric guitar', url: wiki('Electric_guitar') },
      { name: 'acoustic guitar', url: wiki('Acoustic_guitar') },
      { name: 'flamenco guitar', url: wiki('Flamenco_guitar') },
      { name: 'salsa', url: wiki('Salsa_(dance)') },
    ],
  },
  {
    label: 'play',
    tint: 'bg-emerald-300/15',
    skills: [
      { name: 'football', url: wiki('Association_football') },
      { name: 'tennis', url: wiki('Tennis') },
      { name: 'scuba diving', url: wiki('Scuba_diving') },
    ],
  },
];

export const interests: Skill[] = [
  { name: 'startups', url: wiki('Startup_company') },
  { name: 'chess', url: wiki('Chess') },
  { name: 'ai', url: wiki('Artificial_intelligence') },
  { name: 'ml', url: wiki('Machine_learning') },
  { name: 'social entrepreneurship', url: wiki('Social_entrepreneurship') },
  { name: 'mixing', url: wiki('Audio_mixing') },
  { name: 'padel', url: wiki('Padel') },
  { name: 'cooking', url: wiki('Cooking') },
  { name: 'spy-fictions', url: wiki('Spy_fiction') },
  { name: 'classics', url: wiki('Classic_book') },
  { name: 'defense/security tech', url: wiki('Defense_technology') },
  { name: 'consumer tech', url: wiki('Consumer_electronics') },
  { name: 'robotics', url: wiki('Robotics') },
  { name: 'writing', url: wiki('Writing') },
];

export type Playlist = { emoji: string; title: string; url: string };

export const playlists: Playlist[] = [
  { emoji: '🏠', title: 'house', url: 'https://music.apple.com/hu/playlist/pl.u-zPyLLRXFZJ2pYz9' },
  { emoji: '🍸', title: 'bar', url: 'https://music.apple.com/hu/playlist/pl.u-4Jomm9DIav1Z5B2' },
  { emoji: '🎶', title: 'scores', url: 'https://music.apple.com/hu/playlist/scores/pl.u-zPyLmjRtZJ2pYz9' },
  { emoji: '🇭🇺', title: 'hungarian', url: 'https://music.apple.com/hu/playlist/pl.u-pMyllkMc4zkZl8a' },
  { emoji: '🇮🇹', title: 'italian', url: 'https://music.apple.com/hu/playlist/pl.u-qxylK7BT2PxRBzY' },
  { emoji: '🎸', title: 'rock', url: 'https://music.apple.com/hu/playlist/pl.u-qxylK7BT2PxRBzY' },
  { emoji: '🎼', title: 'classical', url: 'https://music.apple.com/hu/playlist/class/pl.u-qxylKqDI2PxRBzY' },
  { emoji: '🥃', title: 'golden', url: 'https://music.apple.com/hu/playlist/pl.u-XkD04XpHDzLBqVb' },
  { emoji: '🎷', title: '(some) jazz', url: 'https://music.apple.com/hu/playlist/pl.u-zPyLm03TZJ2pYz9' },
  { emoji: '🦇', title: '(some) opera', url: 'https://music.apple.com/hu/playlist/opera/pl.u-qxylK46t2PxRBzY' },
];

/**
 * Placeholder titles for the writing view. Replace with real drafts, or empty
 * the array to fall back to the plain "still typing" state.
 */
export const draftTitles: string[] = [
  'exchange semester: singapore',
  'global life & being "homeless"',
];
