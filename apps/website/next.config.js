const { APP_URL } = process.env;
const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/:path*",
				destination: `/:path*`,
			},
			{
				source: "/app",
				destination: `${APP_URL}/app`,
			},
			{
				source: "/app/:path*",
				destination: `${APP_URL}/app/:path*`,
			},
		];
	},
});
