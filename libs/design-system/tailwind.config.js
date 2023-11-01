/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'plasmo-',
  theme: {
    fontFamily: {
      'sf-pro': ['SF Pro Display', 'sans-serif'],
    },
    fontSize: {
      3: '0.7rem',
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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'ocean-blue': '#00011d',
      cyan: '#acd8ff',
      pink: '#fcb2d9',
      green: '#2ee59d',
      red: '#d84848',
      gray: {
        light: '#798186',
        DEFAULT: '#212529',
      },
      main: {
        DEFAULT: '#738AFF',
        100: '#E6E9FF',
        200: '#CDD4FF',
        300: '#B4BEFF',
        400: '#9BA9FF',
        500: '#738AFF',
        600: '#4F5CFF',
        700: '#2B3AFF',
        800: '#0719FF',
        900: '#0000E6',
      },
      secondary: '#232536',
      white: {
        DEFAULT: '#ffffff',
        transparent90: 'rgba(255, 255, 255, 0.9)',
        transparent70: 'rgba(255, 255, 255, 0.7)',
      },
      black: '#0E0F16',
      grey: {
        dark: '#22242A',
        medium: '#2E3038',
        light: '#5C5F70',
        transparent: 'rgba(115, 119, 140, 0.5)',
      },
      success: '#478E56',
      error: '#8D484F',
      info: '#475C94',
      background: {
        light: '#FFFDF9',
        dark: '#1B1D2A',
      },
    },
    extend: {},
  },
  plugins: [],
};
