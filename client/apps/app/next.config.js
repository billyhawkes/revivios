const withTM = require("next-transpile-modules")(["ui"]);
const withPWA = require("next-pwa");

module.exports = withTM(
	withPWA({
		reactStrictMode: true,
		pwa: {
			dest: "public",
			register: true,
			skipWaiting: true,
			disable: process.env.NODE_ENV === "development",
		},
	})
);
