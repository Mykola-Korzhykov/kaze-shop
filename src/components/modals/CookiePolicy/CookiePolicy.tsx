import { useRouter } from 'next/router';
import React, { FC } from 'react';
import s from './CookiePolicy.module.scss';

const CookiePolicy: FC<{ setCookiePolicyState: (state: boolean) => void }> = ({
	setCookiePolicyState,
}) => {
	const { locale } = useRouter();
	const changeAllowCookieStatus = () => {
		setCookiePolicyState(true);
		localStorage.setItem('allowCookie', JSON.stringify(true));
	};
	const text = [
		{
			locale: 'ua',
			text: 'Ми використовуємо файли «cookie», щоб покращити ваш досвід перегляду та персоналізувати контент та рекламу, яку ви бачите на нашому веб-сайті. Також, ми можемо використовувати файли «cookie» для аналізу того, як використовується наш веб-сайт, та відстежувати активність користувачів. Ми використовуємо як сесійні, так і постійні файли «cookie», а також файли «cookie», встановлені нами або третіми сторонами. Конкретні файли «cookie», які ми використовуємо, можуть змінюватися з часом, коли ми оновлюємо та покращуємо наш веб-сайт. Ви можете контролювати використання файлів «cookie» на нашому веб-сайті через налаштування вашого браузера. Більшість браузерів дозволяють блокувати або видаляти файли «cookie», а також налаштовувати ваші переваги для використання файлів «cookie».',
		},
		{
			locale: 'ru',
			text: 'Мы используем файлы «cookie», чтобы улучшить ваш опыт просмотра и персонализировать контент и рекламу, которую вы видите на нашем веб-сайте. Мы также можем использовать файлы «cookie», чтобы анализировать, как используется наш веб-сайт, и отслеживать активность пользователей. Мы используем как сессионные, так и постоянные файлы «cookie», а также файлы «cookie», установленные нами или третьими лицами. Конкретные файлы «cookie», которые мы используем, могут меняться со временем по мере обновления и улучшения нашего веб-сайта. Вы можете контролировать использование файлов «cookie» на нашем веб-сайте через настройки вашего браузера. Большинство браузеров позволяют блокировать или удалять файлы «cookie», а также настраивать ваши предпочтения для использования файлов «cookie».',
		},
		{
			locale: 'rs',
			text: 'Mi koristimo kolačiće kako bismo poboljšali Vaše iskustvo pregledanja i personalizovali sadržaj i reklame koje vidite na našem veb-sajtu. Takođe, možemo koristiti kolačiće kako bismo analizirali kako se naš veb-sajt koristi i pratili aktivnosti korisnika. Mi koristimo i privremene i trajne kolačiće, kao i kolačiće koje postavljaju mi ili druga strana. Konkretni kolačići koje koristimo mogu se promeniti tokom vremena dok ažuriramo i poboljšavamo naš veb-sajt. Možete kontrolisati upotrebu kolačića na našem veb-sajtu preko podešavanja vašeg pretraživača. Većina pretraživača dozvoljava blokiranje ili brisanje kolačića ili podešavanje vaših preferencija za upotrebu kolačića.',
		},
		{
			locale: 'en',
			text: 'We use cookies to improve your browsing experience and to personalize the content and advertisements that you see on our website. We may also use cookies to analyze how our website is used and to track user activity.	We use both session and persistent cookies, as well as first-party and third-party cookies. The specific cookies we use may change from time to time as we update and improve our website. You can control the use of cookies on our website through your browser settings. Most browsers allow you to block or delete cookies, or to configure your preferences for how cookies are used.',
		},
	];
	return (
		<div className={s.cookie_modal}>
			<div className={s.cookie_body}>
				<h3 className={s.cookie_title}>Cookie Policy</h3>
				<p className={s.cookie_descr}>
					{text.find((el) => el.locale === locale).text}
				</p>
				<button onClick={changeAllowCookieStatus} className={s.cookie_btn}>
					{locale === 'ua'
						? 'Прийняти'
						: locale === 'ru'
						? 'Принять'
						: locale === 'en'
						? 'Accept'
						: 'Прихвати'}
				</button>
			</div>
		</div>
	);
};

export default CookiePolicy;
