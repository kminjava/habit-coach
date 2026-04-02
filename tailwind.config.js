/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        surface: '#FAFAF9',
        success: '#22C55E',
        accent: '#F59E0B',
      },
    },
  },
  plugins: [],
}
