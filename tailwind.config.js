/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color': 'var(--ion-text-color)',
        'bg-datetime-customized-color-light': '#F4F5F8',
        'bg-datetime-customized-color-dark': '#222428',
        'accent-color': 'var(--ion-color-accent)',
      },
    },
  },
  plugins: [],
}
