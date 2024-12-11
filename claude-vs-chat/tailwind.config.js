/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt': {
          light: '#202123',
          dark: '#343541',
        },
        'claude': {
          light: '#FFFFFF',
          dark: '#0C0C0D',
        }
      }
    },
  },
  plugins: [],
}

