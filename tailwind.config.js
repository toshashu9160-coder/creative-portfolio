// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#d4af37",
          DEFAULT: "#b8860b",
          dark: "#8b5c00",
        },
        secondary: {
          light: "#222222",
          DEFAULT: "#111111",
        },
        accent: "#ff9800",
      },
      fontFamily: {
        sans: ["Sanger Memo", "system-ui", "sans-serif"],
        display: ["Sanger Memo", "system-ui", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
