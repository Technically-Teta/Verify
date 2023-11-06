/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/flowbite-react/**/*../src/**/*.{js,jsx,ts,tsx}' /* src folder, for example */],
  theme: {
    extend: {},
  },
  plugins: [..., require('flowbite/plugin')],
};

