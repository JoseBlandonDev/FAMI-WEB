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
          primary: '#354093',      // Primary blue - Brand Base
          secondary: '#545ea8',    // Secondary blue
          accent: '#829eb3',       // Accent cyan grayish
          lavender: '#9fa4d3',     // Soft purple/lavender
          light: '#ccd1eb',        // Light background
          text: '#2e2d2c',         // Dark text (never pure black)
          white: '#FFFFFF',        // Pure white
          // Aliases for backwards compatibility
          blue: '#354093',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        gobold: ['var(--font-gobold)'],
        bebas: ['var(--font-bebas)'],
      },
    },
  },
  plugins: [],
};
