/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#14231F',
        paper: '#FBFAF7',
        moss: {
          50: '#F1F6F2',
          100: '#DDEBDF',
          200: '#B9D6BE',
          300: '#8FBB96',
          400: '#5F9A6A',
          500: '#3D7C49',
          600: '#2E6339',
          700: '#254E2E',
          800: '#1E3E26',
          900: '#18321F',
        },
        clay: '#B5622A',
        sand: '#E8DFC8',
        alert: '#B23A2E',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
