/** @type {import('tailwindcss').Config} */
const {addDynamicIconSelectors} = require('@iconify/tailwind');
export default {
    content : [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
    ],
    theme : {
        fontFamily: {
            poppins: ["poppins"],
            Montserrat:['Montserrat', 'sans-serif']
        },
        letterSpacing: {
            wider: '0.04rem'
        },
        extend: {
            colors: {
                'Primary':'#32856E', // for button green color
                'Secondary': '#5351C7', // for text bule color
                'TextPrimary':'#202741', // for entered text , titles inside each modles
                'TextBgPrimary':'#F8F7FC', // for bg textbox
                'TextSecondary':'#A1A1A1', // for text placeholder
                'BreadcrumbText':'#6D6D6D', // for breadcrumb text , other label
                'BgPrimary':'#F7F4FA',  // highlight bg, table body bg
                'BgSecondary':'#75D9BD', // table header bg
                'BgDetailPage':'#F5F4FB',
                'TextViewDetail':'#266A57',
                'TextDisabled':'#C2C2C2',
                'BgDisabled':'#F5F5F5',
                'GreyText':'#8E8E8E',
                'TableRowBorder':'#D3D3D3'
            },
          
        }
    },
    plugins : [
        addDynamicIconSelectors(), require('@tailwindcss/forms'),require("tw-elements-react/dist/plugin.cjs")
    ],
    darkMode : "class"
};
