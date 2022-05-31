const withTM = require("next-transpile-modules")(["ui"]);
const withPWA = require("next-pwa");

module.exports = withTM(
	withPWA({
		reactStrictMode: true,
		pwa: {
			dest: "public/pwa",
		},
	})
);
