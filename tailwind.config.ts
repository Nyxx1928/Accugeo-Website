import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sansation', 'var(--font-sans)', ...fontFamily.sans],
      },
      spacing: {
        touch: '2.75rem',
        'section-mobile': '4rem',
        'section-desktop': '6rem',
      },
      fontSize: {
        'body-mobile': ['1rem', { lineHeight: '1.6' }],
        'body-desktop': ['1.0625rem', { lineHeight: '1.65' }],
        'heading-1': ['clamp(2rem, 6vw, 3.75rem)', { lineHeight: '1.05' }],
        'heading-2': ['clamp(1.625rem, 4.8vw, 2.75rem)', { lineHeight: '1.1' }],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: 'var(--destructive)',
        'brand-red': '#C41E3A',
      },
    },
  },
  plugins: [],
}
export default config
