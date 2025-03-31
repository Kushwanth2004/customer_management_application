/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-right': 'slide-right 1s ease-in-out forwards',
      },
    

    colors: {
        customRed: '#A04747',
        overRed :"#D26060",
        white :"#FFFFFF",
        secondwhite :"#F5FFFA",
        customgreen :"#228B22",
        mediumgreen :"#98FB98",
        lightgreen  :"#D3FFD3",
      },
      keyframes: {
        "0%": { transform: "translateX(100%)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      }

    },
    animation: {
      sweepIn: "sweepIn 1s ease-out forwards"
    }
  },
  plugins: [],
}

