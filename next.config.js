/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ['ua', 'en'],
		defaultLocale: 'ua',
		localeDetection: false,
	},
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
