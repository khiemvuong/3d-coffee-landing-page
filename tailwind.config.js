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
          400: '#c07030',
          500: '#a85a24',
          600: '#8e4a1c',
          700: '#763e18',
          800: '#5e3216',
          900: '#4a2812',
          950: '#2c1810',
        },
        cream: {
          50: '#faf5ef',
          100: '#f5ebe0',
          200: '#eedccc',
          300: '#e0c8ad',
          400: '#c8a882',
        },
        warm: {
          50: '#fefcf9',
          100: '#fdf6ed',
          200: '#f8e8d4',
          300: '#f0d4b0',
          400: '#e0b080',
          500: '#c89058',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
