module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      '12': '12px',
      '10': '10px'
    },
    flex: {
      '20': '0 0 20%',
      '50': '0 0 50%',
      '60': '0 0 60%'
    },
    extend: {
      lineHeight: {
        '24': '24px'
      },
      spacing: {
        1: '1px',
        2: '2px',
        4: '4px',
        5: '5px',
        6: '6px',
        8: '8px',
        12: '12px',
        10: '10px',
        15: '15px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
