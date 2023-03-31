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
	images: {
	domains: ['api.kaze-shop.online'],
},

}

module.exports = nextConfig

