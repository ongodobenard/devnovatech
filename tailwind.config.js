export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:  '#0A2240',
        navy2: '#0d2d54',
        cyan:  '#00C8CC',
        red:   '#E8332A',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans:  ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}