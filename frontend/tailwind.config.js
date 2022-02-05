const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'pure-gray-66': '#424242',
    }),
  },
}
