/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6EF',
          alt: '#F1EAD9',
        },
        emerald: {
          DEFAULT: '#0B3D2E',
          deep: '#062A20',
          light: '#155C45',
        },
        gold: {
          DEFAULT: '#C7A445',
          soft: '#E8DCB8',
          deep: '#9C7E2E',
        },
        charcoal: '#26231D',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'stitch-gold': "repeating-linear-gradient(90deg, #C7A445 0, #C7A445 6px, transparent 6px, transparent 12px)",
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
        fadeUp: 'fadeUp 0.7s ease-out both',
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
