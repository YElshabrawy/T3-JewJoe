/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#A18A68",
        my_darkGray: "#707070",
        my_gray: "#D8D8D8",
        my_lightGray: "#EFEFEF",
        my_errors: "#D82700",
      },
      fontSize: {
        h1: [
          "37px",
          {
            fontWeight: "500",
          },
        ],
        h2: [
          "30px",
          {
            fontWeight: "400",
            lineHeight: "35px",
          },
        ],
        h3: [
          "24px",
          {
            fontWeight: "400",
            lineHeight: "26px",
          },
        ],
        h4: [
          "24px",
          {
            fontWeight: "500",
            lineHeight: "20px",
          },
        ],
        h5: [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "16px",
            // letterSpacing: '10px',
          },
        ],
        Bl: [
          "20px",
          {
            fontWeight: "700",
          },
        ],
        Bm: [
          "18px",
          {
            fontWeight: "400",
          },
        ],
        Bs: [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "20px",
            // letterSpacing: '10px',
          },
        ],
      },
      screens: {
        md: "900px",
        // => @media (min-width: 820px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
