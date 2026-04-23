import { colors, fontFamilies } from './src/styles/tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: fontFamilies,
    },
  },
  plugins: [],
};
