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
          950: '#0a0c10', // Deepest background
          900: '#11141a', // Panel base
          850: '#161a22', // Card & table header
          800: '#1d222c', // Surface raised
          750: '#252b37', // Border / separator
          700: '#2e3645', // Highlight border
          600: '#434d61', // Dim text / disabled
          500: '#627087', // Muted text
          400: '#8e9eb5', // Secondary text
          300: '#b8c5d6', // Body text
          200: '#dce3ec', // High contrast text
          100: '#f1f5f9', // Bright text
          50: '#ffffff',
        },
        forge: {
          500: '#ea580c', // Industrial safety orange
          600: '#c2410c',
          400: '#f97316',
          300: '#fb923c',
          glow: 'rgba(234, 88, 12, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'panel': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'panel-raised': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
        'inner-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
        '2xl': '12px',
      }
    },
  },
  plugins: [],
}
