/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["ru"],
		defaultLocale: "ru",
	},
	devIndicators: {
		buildActivity: false,
	},
}

module.exports = nextConfig
