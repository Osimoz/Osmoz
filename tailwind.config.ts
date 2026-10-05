import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Les familles et l'échelle typographique sont définies une seule fois, en
// variables CSS (src/index.css) ; Tailwind ne fait que les exposer.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        hero: 'var(--text-hero)',
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
