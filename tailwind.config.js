/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B0E17",
        pitch: "#00FF85",
        violet: "#7928CA",
        amber: "#FFB800",
        crimson: "#FF0055",
        surface: "#141926",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
