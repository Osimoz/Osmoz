/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F0EDE5',
        ink: '#1A1A1A',
        muted: '#777065',
        bordeaux: '#6B1228',
        bordeauxHover: '#8C1A38',
        navy: '#01142A',
        border: '#E8E4DC',
        success: '#2D6A4F',
        danger: '#6B1228',
        loft: '#6B1228',
        duplex: '#01142A',
        penthouse: '#C8C2B8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
