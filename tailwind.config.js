/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f0',
          100: '#fde4df',
          200: '#fbcdc4',
          300: '#f7ac9c',
          400: '#f07e65',
          500: '#e45234',
          600: '#c42906',
          700: '#a12309',
          800: '#84200f',
          900: '#6d1f12',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        }
      }
    },
  },
  plugins: [],
};
