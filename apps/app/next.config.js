const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
	basePath: "/app",
	reactStrictMode: true,
});
