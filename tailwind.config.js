/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          indigo: {
            light: '#4F46E5',
            dark: '#7C3AED'
          },
          purple: {
            light: '#7C3AED',
            dark: '#9333EA'
          },
          blue: '#3B82F6'
        },
        accent: {
          gold: '#F59E0B',
          cyan: '#06B6D4'
        },
        background: {
          dark: '#111827',  // gray-900
          panel: '#1F2937', // gray-800
        }
      },
      fontFamily: {
        sanskrit: ['Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      gridTemplateColumns: {
        'visualization': 'repeat(auto-fit, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [],
}
