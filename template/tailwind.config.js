module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../ada/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      '10': '10px',
      '11': '11px',
      '12': '12px',
      '13': '13px',
      '14': '14px',
      '15': '15px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '22': '22px',
      '24': '24px'
    },
    extend: {
      spacing: {
        1: '1px',
        2: '2px',
        4: '4px',
        5: '5px',
        6: '6px',
        8: '8px',
        10: '10px',
        14: '14px',
        15: '15px',
        16: '16px',
        20: '20px',
        24: '24px',
        30: '30px',
        32: '32px',
        36: '36px',
        40: '40px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
