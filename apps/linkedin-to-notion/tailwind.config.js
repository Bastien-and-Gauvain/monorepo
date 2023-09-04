/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./**/*.tsx'],
  plugins: [],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      sans: ['Roboto', 'sans-serif'],
    },
    fontSize: {
      3.5: '0.875rem', // 14px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
      11: '2.75rem', // 44px
      12: '3rem', // 48px
      13: '3.25rem', // 52px
      14: '3.5rem', // 56px
      15: '3.75rem', // 60px
      16: '4rem', // 64px
      18: '4.5rem', // 72px
      20: '5rem', // 80px
    },
    lineHeight: {
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
      11: '2.75rem', // 44px
      12: '3rem', // 48px
      13: '3.25rem', // 52px
      14: '3.5rem', // 56px
      15: '3.75rem', // 60px
      16: '4rem', // 64px
      18: '4.5rem', // 72px
      20: '5rem', // 80px
    },
    extend: {},
  },
};
