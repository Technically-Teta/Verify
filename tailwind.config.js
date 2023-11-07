/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [     require('@tailwindcss/forms'),
  require('preline/plugin'),],
}