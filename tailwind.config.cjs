/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			primary: "#07A09B",
			background: "#202C2C",
			lightbackground: "#2A3636",
			text: "#FFFFFF",
			textdark: "#333333",
			error: "#903535",
			white: "#FFFFFF",
		},
		fontFamily: {
			body: ['"Josefin Sans"', "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
