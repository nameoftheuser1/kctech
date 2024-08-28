/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'home': "url('/assets/img/edit.jpg')",
            }
        },
    },
    plugins: [],
}
