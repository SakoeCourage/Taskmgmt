/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.tsx","./src/*/*.tsx","./src/*/*/*.tsx","./src/Pages/Components/*/*.tsx","./src/Pages/Components/*.tsx","./src/Pages/*/*/*.tsx","./src/Context/*.tsx",".*.html"],
  theme: {
    extend: {
      colors:{
        'primary-deep-blue': '#1e40af',
        'primary-deep-pink': '#831843',
      }
    },
  },
  plugins: [],
}

