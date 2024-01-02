/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1144px",
      },
      colors: {
        primary: "#5F35F5",
        transparent: "transparent",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
      },
      fontFamily: {
        nuni: ["Nunito Sans", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        popi: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
