/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
