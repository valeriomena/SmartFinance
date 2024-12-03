/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out',
                slideIn: 'slideIn 1s ease-out',
                bounce: 'bounce 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                slideIn: {
                    '0%': { transform: 'translateY(-50px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
            },
        },
    },
    plugins: [],
};
/* eslint-enable no-undef */
