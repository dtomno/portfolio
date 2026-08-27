/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // Compile `hover:` to `@media (hover: hover)` so hover styles never stick on
  // touch devices after a tap. (Default in Tailwind v4.)
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0b0d',
          soft: '#131316',
          card: '#17171b',
          line: '#26262c',
        },
        bone: {
          DEFAULT: '#f4f1ea',
          soft: '#e9e5db',
          card: '#fbfaf6',
          line: '#d9d4c6',
        },
        signal: {
          DEFAULT: '#23ce6b',
          bright: '#3df08a',
          dim: '#149a4c',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Clash Display"', '"Space Grotesk"', 'sans-serif'],
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
