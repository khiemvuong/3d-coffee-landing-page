/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b0',
          300: '#e9bc7e',
          400: '#df9a4a',
          500: '#d4802e',
          600: '#c06624',
          700: '#a04e20',
          800: '#833f21',
          900: '#6c351e',
          950: '#3a1a0e',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf8ee',
          200: '#f9edd4',
          300: '#f4deb3',
          400: '#edc98a',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
