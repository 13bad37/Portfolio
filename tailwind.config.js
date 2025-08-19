/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'animate-spin',
    'animate-pulse',
    'animate-bounce',
    'opacity-0',
    'opacity-100',
    'translate-y-0',
    'translate-y-4',
    'transform',
    'transition-all',
    'duration-300',
    'ease-in-out'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        secondary: {
          300: '#a5b4fc',
          500: '#6366f1',
        },
        accent: {
          500: '#f97316',
        },
        dark: {
          400: '#414664',
          500: '#111827',
          600: '#0e131f',
          700: '#0a0e17',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};