/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color': 'var(--ion-text-color)',
        'text-color-step-400': 'var(--ion-text-color-step-400)',
        'bg-datetime-customized-color-light': '#F4F5F8',
        'bg-datetime-customized-color-dark': '#222428',
        'accent-color': 'var(--ion-color-accent)',
        'primary-color-shade': 'var(--ion-color-primary-shade)',
        'primary-color': 'var(--ion-color-primary)',
      },
    },
  },
  plugins: [],
}
