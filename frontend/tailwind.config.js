/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#0b0d10',
          900: '#12151a',
          850: '#171b22',
          800: '#1e242d',
          750: '#252d38',
          700: '#2e3744',
          600: '#434f62',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        weld: {
          orange: '#ff6b00',
          amber: '#f59e0b',
          gold: '#eab308',
          blue: '#0284c7',
          glow: 'rgba(255, 107, 0, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'weld-glow': '0 0 25px -5px rgba(255, 107, 0, 0.35)',
        'weld-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

