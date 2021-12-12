module.exports = {
	mode: "jit",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			primary: "#07A09B",
			background: "#202C2C",
			lightbackground: "#2A3636",
			error: "#903535",
			white: "#FFFFFF",
		},
		fontFamily: {
			display: ['"Josefin Sans"', "sans-serif"],
			body: ['"Open Sans"', "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
