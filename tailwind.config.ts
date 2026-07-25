import type { Config } from 'tailwindcss';

const config: Config = {
  // lib/ is scanned too: skill tints are class strings that live in lib/data.
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          // Channel triplets let opacity modifiers work while useTimeOfDay
          // repaints the site by rewriting the custom properties.
          bg: 'rgb(var(--brand-bg) / <alpha-value>)',
          'bg-lift': 'rgb(var(--brand-bg-lift) / <alpha-value>)',
          'bg-deep': 'rgb(var(--brand-bg-deep) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
          text: 'rgb(var(--brand-text) / <alpha-value>)',
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
