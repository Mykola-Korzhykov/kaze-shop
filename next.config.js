/** @type {import('next').NextConfig} */
const { i18n } = require('./i18next.config');
const nextConfig = {
	reactStrictMode: false,
	i18n,
	devIndicators: {
		buildActivity: false,
	},
	images: {
		// domains: ['[::1]'],
		loader: 'custom',
		loaderFile: './src/utils/customImgLoader.ts',
	},
};

module.exports = nextConfig;
