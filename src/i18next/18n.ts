import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	fallbackLng: 'ua',
	debug: true,
	detection: {
		order: ['localStorage', 'queryString', 'cookie'],
		cache: ['localStorage', 'cookie'],
	},
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
