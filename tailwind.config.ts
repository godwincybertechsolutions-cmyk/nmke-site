import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#DD5536',
          primaryDark: '#C44A2E',
          charcoal: '#030213',
          sand: '#F6F0EB',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        brand: '0 30px 80px -45px rgba(3, 2, 19, 0.55)',
        'brand-soft': '0 20px 45px -25px rgba(221, 85, 54, 0.35)',
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

export default config
