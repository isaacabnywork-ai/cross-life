/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071A31',
          900: '#0B294B', // Deep Navy
          850: '#0F3158', // Primary Navy
          800: '#143C6B',
          700: '#1E4F85', // CrossLife Blue
          600: '#2A66A8',
          100: '#DCE8F5',
          50: '#EEF4FB',  // Light Blue
        },
        gold: {
          50: '#FEFDF8',
          100: '#FDF7E7',
          200: '#FBECBA',
          300: '#F7DF8D',
          400: '#F4C34E', // Gold
          500: '#E9AD2E', // Warm Gold
          600: '#C88D1B',
          700: '#9C6C10',
        },
        surface: {
          white: '#FFFFFF',
          offwhite: '#F7F9FC', // Off White
          subtle: '#F0F4F8',
          border: '#E2E8F0',
          darkborder: '#1B3F6E',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
        serif: ['"Merriweather"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(11, 41, 75, 0.06), 0 1px 4px -1px rgba(11, 41, 75, 0.04)',
        'card': '0 8px 30px rgba(11, 41, 75, 0.08)',
        'modal': '0 25px 60px -15px rgba(11, 41, 75, 0.35)',
        'glow-gold': '0 0 24px rgba(244, 195, 78, 0.35)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
