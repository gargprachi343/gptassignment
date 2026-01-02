/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#DC2626', // Warm red from header
          'red-light': '#FEE2E2', // Light red
          'red-dark': '#B91C1C',
          'red-bright': '#EF4444',
        },
        secondary: {
          orange: '#F97316', // Warm orange
          'orange-light': '#FFEDD5', // Light orange/peach
          'orange-dark': '#EA580C',
          'orange-bright': '#FB923C',
        },
        accent: {
          peach: '#FDBA74', // Warm peach
          coral: '#FF8A80', // Coral accent
        },
        neutral: {
          white: '#FFFFFF',
          gray: '#F9FAFB',
          'gray-light': '#F3F4F6',
          'gray-medium': '#E5E7EB',
          'gray-dark': '#6B7280',
          'gray-darker': '#374151',
        }
      },
    },
  },
  plugins: [],
}

