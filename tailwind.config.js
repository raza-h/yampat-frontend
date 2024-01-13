/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
       Green: '#007352',
       Gray:'#ABABAB',
       Gray1:'#999999',
       Blue1: '#2C79C7',
       background:"#F9F9F9",
       Gray2:'#878787',
       Gray3:'#DEDEDE',
       Black1:'##23272A',
       Blue3:'#454545',
       Black1:'#000000',
       myWhite:'#FFFFFF',
       Gray4:'#454545',
       Gray5:'#999999',
       Purple5:'#8D435E',
       Gray6:'#9B9A9A',
       Gray7:'#A1A1A1',
       Gray8:'#898989',
       Gray9:'#626262'
       
      //  Gray4:'##878787'
     

      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #2D484087, #007352, #074835)',
      }
    },
  },
  plugins: [],
}

