/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        primary: '#ef4444',     // Red-500
        secondary: '#3b82f6',   // Blue-500
        accent: '#f59e0b',      // Amber-500
        dark: '#1e293b',        // Slate-800
        light: '#f8fafc',       // Slate-50
      }
    },
  },
  plugins: [],
}
