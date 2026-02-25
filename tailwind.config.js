/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#1e40af',
        'game-red': '#dc2626',
        'game-gold': '#fbbf24',
      },
      fontFamily: {
        'game': ['Impact', 'Arial Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
