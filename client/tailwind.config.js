/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      addNewTrip: '#1ce2ee',
      addNewTripHover: '#30effb',
    }
  },
  plugins: [
    
  ],
});
