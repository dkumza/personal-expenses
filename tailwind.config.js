/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["*.{html,js}"],
   theme: {
      extend: {},
      screens: {
         // cutting out TWCSS default values
         sm: { min: "1023px", max: "1023px" },
         // => @media (min-width: 640px and max-width: 767px) { ... }

         md: { min: "1023px", max: "1023px" },
         // => @media (min-width: 768px and max-width: 1023px) { ... }

         lg: { min: "1023px", max: "1023px" },
         // => @media (min-width: 1024px and max-width: 1279px) { ... }

         xl: { min: "1023px", max: "1023px" },
         // => @media (min-width: 1280px and max-width: 1535px) { ... }

         "2xl": { min: "1536px" },
         // => @media (min-width: 1536px) { ... }
      },
   },
   plugins: [],
};
