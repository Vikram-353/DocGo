/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#34a1eb",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmax(230px,1fr))",
      },
    },
  },
  plugins: [],
};
