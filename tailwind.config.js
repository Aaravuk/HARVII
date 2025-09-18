/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",   // Tailwind green-600
        secondary: "#facc15", // Tailwind yellow-400
        accent: "#3b82f6",    // Tailwind blue-500
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(34, 197, 94, 0.4)",
      },
    },
  },
  plugins: [],
}
