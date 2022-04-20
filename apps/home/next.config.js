/** @type {import('next').NextConfig} */
const { APP_URL } = process.env;

module.exports = {
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
};
