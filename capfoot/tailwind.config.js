
    const withMT = require("@material-tailwind/react/utils/withMT");
    const defaultTheme = require('tailwindcss/defaultTheme');

    module.exports = withMT({
    //   darkMode: false, // or 'media' or 'class'
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
            // screens: {
            //     'xs': {'max': '570px'}, // This sets the maximum width for the custom breakpoint
            //   },
            width: {
                'auto-plus-50': 'calc(auto - 30px)',
              },
          colors: {
            primary: '#3490dc',
            navy: '#000080',
            'primary-accent-300': '#6cb2eb',
            'primary-600': '#1c7ed6',
            red: {
              400: '#ff3333',
            },
            gray: {
              900: '#151617',
              200: '#eeeeee',
              500: '#818181',
            },
          },
          boxShadow: {
            'primary-3': '0 4px 6px rgba(52, 144, 220, 0.3)',
            'primary-2': '0 2px 4px rgba(52, 144, 220, 0.2)',
            'dark-strong': '0 4px 6px rgba(0, 0, 0, 0.5)',
          },
          fontFamily: {
            broken: ['Broken', 'sans-serif'],
            SoccerManFIFA: ['SoccerManFIFA', 'sans-serif'],
            'sans': ['Inter', ...defaultTheme.fontFamily.sans],
          },
          letterSpacing: {
            wider: '0.095em', // Custom letter spacing
          },
          borderWidth: {
            '3': '3px',
          },
          zIndex: {
            '1000': '1000',
          },
        },
      },
      variants: {
        extend: {
          borderWidth: ['hover', 'focus'],
        },
      },
      plugins: [
            // require('@material-tailwind/react/plugin')
        require('@tailwindcss/forms'),
      ],
    });

