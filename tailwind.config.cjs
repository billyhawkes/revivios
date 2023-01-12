/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#07A09B",
        background: "#1F2727",
        lightbackground: "#2A3636",
        error: "#903535",
      },
    },
  },
  plugins: [],
};
