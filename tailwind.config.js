// tailwind.config.js
module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DEB52D: "#DEB52D",
        D161616: "#161616",
        D838383: "#838383",
      },
      dropShadow: {
        "3xl": "0 0 0 rgba(196,196,196 0.5)",
        "4xl": ["0 35px 35px rgba(0, 0, 0, 0.25)", "0 45px 65px rgba(0, 0, 0, 0.15)"],
      },
    },
  },
  plugins: [],
}
