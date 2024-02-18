/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'cross': "url('src/images/close-cross.svg')",
        'edit-icon': "url('src/images/edit-icon.png')"
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}
