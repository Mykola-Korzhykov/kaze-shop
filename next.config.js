/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ['ru'],
		defaultLocale: 'ru',
	},
	devIndicators: {
		buildActivity: false,
	},
	images: {
<<<<<<< HEAD
		// domains: ['[::1]'],
		loader: 'custom',
		loaderFile: './src/utils/customImgLoader.ts',
	},
};

=======
	domains: ['api.kaze-shop.online'],
},
>>>>>>> ae331c1bfab4ea5aeef3c7a4c18042ab9d0a803c


module.exports = nextConfig

