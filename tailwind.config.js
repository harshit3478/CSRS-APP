/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content:['./App.tsx' , './src/**/*.{js,ts,tsx}','./src/screens/**/*.{js,tsx}'],
  theme: {
    fontFamily: {
      'urbanist-black': ['UrbanistBlack', 'sans-serif'],
        'urbanist-black-italic': ['UrbanistBlackItalic', 'sans-serif'],
        'urbanist-bold': ['UrbanistBold', 'sans-serif'],
        'urbanist-bold-italic': ['UrbanistBoldItalic', 'sans-serif'],
        'urbanist-extrabold': ['UrbanistExtraBold', 'sans-serif'],
        'urbanist-extrabold-italic': ['UrbanistExtraBoldItalic', 'sans-serif'],
        'urbanist-extralight': ['UrbanistExtraLight', 'sans-serif'],
        'urbanist-extralight-italic': ['UrbanistExtraLightItalic', 'sans-serif'],
        'urbanist-italic': ['UrbanistItalic', 'sans-serif'],
        'urbanist-light': ['UrbanistLight', 'sans-serif'],
        'urbanist-light-italic': ['UrbanistLightItalic', 'sans-serif'],
        'urbanist-medium': ['UrbanistMedium', 'sans-serif'],
        'urbanist-medium-italic': ['UrbanistMediumItalic', 'sans-serif'],
        'urbanist': ['UrbanistRegular', 'sans-serif'],
        'urbanist-semibold': ['UrbanistSemiBold', 'sans-serif'],
        'urbanist-semibold-italic': ['UrbanistSemiBoldItalic', 'sans-serif'],
        'urbanist-thin': ['UrbanistThin', 'sans-serif'],
        'urbanist-thin-italic': ['UrbanistThinItalic', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};

