/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fami: {
          blue: '#2E3A8C',
          cyan: '#6C8CD5',
          orange: '#FF7F32',
          gray: '#F8F9FA',
          text: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};
