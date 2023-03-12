/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["ru"],
		defaultLocale: "ru",
	},
	devIndicators: {
		buildActivity: false,
	},
	
	// webpack: (config) => {
	// 	config.module.rules.push({
	// 	  test: /\.s[ac]ss$/i,
	// 	  use: [
	// 		// ...
	// 		{
	// 		  loader: 'sass-loader',
	// 		  options: {
	// 			sourceMap: true,
	// 		  },
	// 		},
	// 	  ],
	// 	});
	// 	return config;
	//   },
	
}

module.exports = nextConfig

// const path = require('path');

// module.exports = {
//   // ...другие настройки
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// };


// const withSass = require('@zeit/next-sass')

// module.exports = withSass()
