// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warna utama Weiiz.ink — Sky Blue Theme
        sky: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',  // ← Primary
          500: '#0ea5e9',  // ← Primary Dark
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        navy: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          900: '#040d1a',  // ← Background utama
          800: '#050f20',  // ← Panel
          700: '#071428',  // ← Card
          600: '#0a1a36',
          500: '#0d2147',
        },
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
        'gradient-navy':    'linear-gradient(135deg, #040d1a, #050f20)',
      },
    },
  },
  plugins: [],
}

export default config
