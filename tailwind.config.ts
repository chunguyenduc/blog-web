/** @type {import('tailwindcss').Config} */
module.exports = {
    // 1. Specifies the files Tailwind should scan for class names
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    // 2. Enables dark mode based on the 'class' attribute (required for dark:prose-invert)
    darkMode: 'class',

    // 3. Theme customization (optional, but a good starting point)
    theme: {
        extend: {
            // You can define custom colors, fonts, spacing, etc. here
            colors: {
                // Example custom color
                'primary': '#1d4ed8',
            },
        },
    },

    // 4. Plugins: This is essential for fixing your heading issue!
    plugins: [
        require('@tailwindcss/typography'), // 👈 You need this to make 'prose' work!
    ],
}