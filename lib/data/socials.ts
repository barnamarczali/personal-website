export type Social = {
  name: string;
  url: string;
  /** Path under /public. Only the contact view renders icons. */
  icon?: string;
  /** Size classes for the contact-view icon, which differ per logo artwork. */
  iconClass?: string;
};

export const socials: Social[] = [
  { name: 'github', url: 'https://github.com/barnamarczali', icon: '/github-icon.svg', iconClass: 'w-7 h-7' },
  { name: 'linkedin', url: 'https://linkedin.com/in/barnamarczali', icon: '/linkedin-icon-logo-svg-vector.svg', iconClass: 'w-9 h-9' },
  { name: 'x', url: 'https://x.com/barnamarczali', icon: '/X_logo_2023_original.svg', iconClass: 'w-5 h-5' },
  { name: 'email', url: 'mailto:marczali.barna@gmail.com' },
  { name: 'discord', url: 'https://discord.com/users/189419600000188416', icon: '/discord-icon.svg', iconClass: 'w-7 h-7' },
  { name: 'telegram', url: 'https://t.me/barnamarczali', icon: '/telegram.svg', iconClass: 'w-9 h-9' },
];

/** Threads appears in the contact view only, not in the compact landing/footer row. */
export const contactOnlySocials: Social[] = [
  { name: 'threads', url: 'https://www.threads.net/@barnamarczali', icon: '/threads.svg', iconClass: 'w-6 h-6' },
];

export const EMAIL = 'marczali.barna@gmail.com';
export const CALENDLY = 'https://calendly.com/barnamarczali/demo';
