import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

const { transparent, current, white, black } = colors;

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      transparent,
      current,
      white,
      black,
      gray: colors.slate,
      textClr: colors.slate,
      surface: colors.slate,
      primary: colors.cyan,
      secondary: colors.amber,
      warning: colors.rose,
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        pageWidth: '68rem', // 1088px
        headerHeightDesktop: '4rem', // 64px
        headerHeightMobile: '3.25rem', // 48px
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'scale(0.96)',
          },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms ease',
        contentShow: 'contentShow 200ms ease',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addVariant }) {
      addVariant('hocusv', ['&:hover', '&:focus-visible']);
      addVariant('group-hocusv', [
        ':merge(.group):hover &',
        ':merge(.group):focus-visible &',
      ]);
      addVariant('peer-hocusv', [
        ':merge(.peer):hover ~ &',
        ':merge(.peer):focus-visible ~ &',
      ]);
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
      });
    }),
  ],
};

export default config;
