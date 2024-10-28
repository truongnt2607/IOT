/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-custom": "pulse-custom 1.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-custom": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.2 },
          "100%": { opacity: 1 },
        },
      },
      translate: {
        "2/1": "-50%",
      },
      backgroundColor: {
        F0F7FF: "#F0F7FF",
      },
      textColor: {
        C7C7C7: "#C7C7C7",
        xanh: "rgb(25, 123, 189)",
        title: "404040",
        AEAEAE: "#AEAEAE",
        "040404": "rgb(64, 64, 64)",
      },
      fontFamily: {
        lato: "Lato, sans-serif",
        be: "Be Vietnam Pro, sans-serif",
      },
      fontWeight: {
        regular: "400",
      },
      boxShadow: {
        full: "2px 2px 6px 0px rgba(0, 0, 0, 0.1),-2px -2px 6px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
