/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#020617', // Slate 950
        surface: '#0f172a', // Slate 900
        surfaceHighlight: '#1e293b', // Slate 800
        emerald: '#34d399', // Emerald 400
        emeraldDark: '#10b981', // Emerald 500
        purpleAurora: '#a78bfa', // Violet 400
        textMain: '#f8fafc', // Slate 50
        textMuted: '#94a3b8', // Slate 400
        dark: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(to right, #34d399, #a78bfa)',
        'dark-gradient': 'radial-gradient(circle at 50% 0%, #1e293b 0%, #020617 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(52, 211, 153, 0.3)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.5)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [],
}