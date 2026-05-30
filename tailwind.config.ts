import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a14',
          soft: '#11111d',
          card: '#15172480',
        },
        neon: {
          purple: '#a855f7',
          blue: '#3b82f6',
          pink: '#ec4899',
          cyan: '#22d3ee',
        },
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(168,85,247,0.15) 0%, rgba(10,10,20,0) 100%)',
      },
      boxShadow: {
        neon: '0 0 24px rgba(168, 85, 247, 0.35)',
        glow: '0 0 40px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
