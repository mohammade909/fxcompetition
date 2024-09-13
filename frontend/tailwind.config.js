/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      boxShadow: {
        'custom': 'inset 2px 2px 5px rgba(70, 70, 70, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',
        'custom-focus': 'inset 1px 1px 2px rgba(70, 70, 70, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',
      },
      // fontSize: {
      // 'xs': '0.5rem',    // 8px
      //   'sm': '0.625rem',  // 10px
      //   'base': '0.6875rem', // 11px
      //   'lg': '0.75rem',   // 12px
      //   'xl': '0.875rem',  // 14px
      //   '2xl': '1rem',     // 16px
      //   '3xl': '1.125rem', // 18px 
      //   '4xl': '1.25rem',  // 20px
      //   '5xl': '1.375rem', // 22px
      //   '6xl': '1.5rem',   // 24px
      //   '7xl': '1.75rem',  // 28px  
      // },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.shadow-custom': {
            boxShadow: 'inset 2px 2px 5px rgba(70, 70, 70, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease-in-out',
            appearance: 'none',
            WebkitAppearance: 'none',
          },
          '.shadow-custom-focus:focus': {
            boxShadow: 'inset 1px 1px 2px rgba(70, 70, 70, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',
          },
          '.no-scrollbar::-webkit-scrollbar': {
            display: 'none',
          },
          '.no-scrollbar': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
        },
        
        ['responsive', 'hover', 'focus']
      );
    },
  
   
  ],
}
