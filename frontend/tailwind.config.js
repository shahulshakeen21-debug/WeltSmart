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
          950: '#0c0f14', // Exact dark canvas from reference image
          900: '#121620', // Card surface
          850: '#161c28', // Raised card surface
          800: '#1c2332', // Borders / subtle contrast
          750: '#232c3f', // Crisp dividers
          700: '#2e3950', // Highlighted borders
          600: '#465573', // Dim icons
          500: '#64748b', // Muted text
          400: '#94a3b8', // Secondary text
          300: '#cbd5e1', // Primary body text
          200: '#e2e8f0', // High contrast text
          100: '#f8fafc', // Bright white text
          50: '#ffffff',
        },
        forge: {
          500: '#ea580c', // Industrial safety orange
          600: '#c2410c',
          400: '#f97316', // Bright vivid orange from reference
          300: '#fb923c',
          glow: 'rgba(249, 115, 22, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'orange-glow': '0 0 25px rgba(249, 115, 22, 0.25)',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '14px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
