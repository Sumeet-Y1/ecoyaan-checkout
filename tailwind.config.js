/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        forest: {
          50: "#f0f7f0",
          100: "#dceddc",
          200: "#bcdabc",
          300: "#8fc08f",
          400: "#5fa05f",
          500: "#3d823d",
          600: "#2d672d",
          700: "#255225",
          800: "#1f421f",
          900: "#193619",
        },
        earth: {
          50: "#faf6f0",
          100: "#f2e9d8",
          200: "#e5d0b0",
          300: "#d4b282",
          400: "#c4925a",
          500: "#b5793e",
          600: "#9a6133",
          700: "#7e4d2b",
          800: "#683f27",
          900: "#573424",
        },
      },
    },
  },
  plugins: [],
};
