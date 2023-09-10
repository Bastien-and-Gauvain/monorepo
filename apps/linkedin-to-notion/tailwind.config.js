const designSystemConfig = require('../../libs/design-system/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: designSystemConfig.theme,
  content: ['./**/*.tsx'],
  plugins: [],
};
