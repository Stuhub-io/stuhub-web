import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '11px',
        xxxs: '10px',
        '3.5xl': '32px',
        '4.5xl': '40px',
      },
      container: {
        center: true,
        screens: {
          DEFAULT: '100%',
          landing: '1120px',
        },
      },
    },
    
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
