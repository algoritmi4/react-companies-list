/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'cross': "url('images/close-cross.svg')",
        'hatch': 'repeating-linear-gradient(-60deg, #555 0, #555 1px, transparent 1px, transparent 5px)'
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}
