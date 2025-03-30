/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        progressBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        progressBar: 'progressBar 2s ease-in-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}; 