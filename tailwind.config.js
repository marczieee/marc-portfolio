/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: '#E63946', red2: '#FF6B6B', red3: '#C1121F',
        gold: '#FFD166', bg: '#0C0C0E', bg2: '#141418', bg3: '#1C1C22',
      },
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        display: ['Space Grotesk','sans-serif'],
      },
    },
  },
  plugins: [],
};
