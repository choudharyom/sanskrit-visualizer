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
        background: '#111827',
        panel: '#1F2937',
        primary: {
          indigo: '#4F46E5',
          purple: '#7C3AED',
        },
        accent: {
          gold: '#F59E0B',
          cyan: '#06B6D4',
          blue: '#3B82F6',
        },
        gradient: {
          start: '#4F46E5',
          end: '#7C3AED',
        }
      },
      fontFamily: {
        sanskrit: ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
