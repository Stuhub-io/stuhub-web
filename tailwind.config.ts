import type { Config } from 'tailwindcss'
import { ThemeColors, nextui } from '@nextui-org/react'
import { colors } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      fontSize: {
        xxs: '11px',
        '3.5xl': '32px',
        '4.5xl': '40px',
      },
      container: {
        center: true,
        screens: {
          DEFAULT: '100%',
          sm: '100%',
          md: '100%',
          lg: '1224px',
          xl: '1480px',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    nextui({
      themes: {
        light: {
          colors: {
            text: {
              primary: colors.zinc[800],
              secondary: colors.zinc[600],
              tertiary: colors.zinc[500],
            },
          } as Partial<ThemeColors>,
        },
        dark: {
          colors: {
            text: {
              primary: colors.zinc['100'],
              secondary: colors.zinc['200'],
              tertiary: colors.zinc['400'],
            },
          } as Partial<ThemeColors>,
        },
      },
    }),
  ],
}
export default config
