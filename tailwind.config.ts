import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#063970',
          accent: '#E58F65',
          text: '#F1F1E7',
        }
      },
    }
  },
  plugins: []
};

export default config;

