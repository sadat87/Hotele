/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1437', // deep navy
        accent: {
          DEFAULT: '#b89b6a', // muted gold
          light: '#f6ecd9',
        },
        glow: '#8ab4ff',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'glass-lg': '0 10px 30px rgba(2,6,23,0.6)',
      },
    },
  },
  plugins: [],
}
