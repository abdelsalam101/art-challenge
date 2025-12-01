/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        cursive: ['Cinzel Decorative', 'cursive'],
      },
      colors: {
        renaissance: {
          gold: '#C9A227',
          darkGold: '#8B7014',
          cream: '#F5E6C8',
          parchment: '#E8D4A8',
          brown: '#4A3728',
          darkBrown: '#2C1810',
          red: '#8B2323',
          green: '#2E5A1C',
        }
      }
    },
  },
  plugins: [],
}
