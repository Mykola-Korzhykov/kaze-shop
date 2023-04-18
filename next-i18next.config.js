// next-i18next.config.js
module.exports = {
	i18n: {
		locales: ['ua', 'en', 'rs', 'ru'],
		defaultLocale:
			(typeof window !== 'undefined' &&
				localStorage.getItem('defaultLocale')) ||
			'ua',
	},
	// other next-i18next configuration options...
};
