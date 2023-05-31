/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
    colors: {
      addNewTrip: '#1ce2ee',
      addNewTripHover: '#30effb',
      button: '#43e8d8',
      hovered: '#43e8f8',
    }
  },
  plugins: [
    
  ],
});
