const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
	reactStrictMode: true,
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Important: return the modified config
		config.module.rules.push({
			test: /\.(glb|gltf)$/,
			use: {
				loader: "file-loader",
				options: {
					publicPath: "/_next/static/images",
					outputPath: "static/images/",
				},
			},
		});
		return config;
	},
});
