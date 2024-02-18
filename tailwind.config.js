/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'cross': "url('images/close-cross.svg')",
        'edit-icon': "url('images/edit-icon.png')"
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}
