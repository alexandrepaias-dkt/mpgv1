/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        decathlon: {
          blue: '#3643BA',
          'blue-dark': '#2a3599',
          orange: '#FF8946',
          bg: '#F5F4F5',
          'dark-grey': '#949494',
          'black': '#101010',
          'light-grey': '#616161',
          'green-health': '#34B78F',
          'green-light': '#7AFFA6',
          'red': '#D70321',
          'light-blue': '#8BABFE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}