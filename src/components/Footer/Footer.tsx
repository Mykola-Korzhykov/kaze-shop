import { fetchGoodsByCategory } from '@/redux/slices/goods';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { HeaderLogo } from '../Header';
import s from './Footer.module.scss';
import { useEffect, useState } from 'react';
import { StrapiAxios } from '@/services/strapiAxios';
import { footersResT } from '@/types/mainPageRequest/footer';
import { useRouter } from 'next/router';
import { FooterFetchData } from './Footer.interface';
import { setHeaderCategory } from '@/redux/slices/goods';

import FormSpinner from '../screens/Order/FormSpinner/FormSpinner';


const mockData = [
	[
		{
			label: {
				ua: 'Лосини',
				en: 'Long sleeves',
				rs: 'Longslivovi',
				ru: 'Лосины',
			},

			link: '/catalog',
			id: 1,
		},
		{
			label: {
				ua: 'Костюми',
				en: 'Sets',
				rs: 'kompleti',
				ru: 'Костюмы',
			},
			link: '/catalog',
			id: 12,
		},
		{
			label: {
				ua: 'Велосипедки',
				en: 'Bicycles',
				rs: 'šorcevi',
				ru: 'Велосипедки',
			},

			link: '/catalog',
			id: 4,
		},
	],
	[
		{
			label: {
				ua: 'Худі/світшоти',
				en: 'Hoodies/sweatshirts',
				rs: 'Duksevi ',
				ru: 'Xуди/свитшоты',
			},

			link: '/catalog',
			id: 8,
		},
		{
			label: {
				ua: 'Сумки',
				en: 'Bags',
				rs: 'Torbe',
				ru: 'Сумки',
			},

			link: '/catalog',
			id: 5,
		},
		{
			label: {
				ua: 'Топи',
				en: 'Tops',
				rs: 'Topovi',
				ru: 'Топы',
			},
			link: '/catalog',
			id: 10,
		},
	],
	[
		{
			label: {
				ua: 'Доставка та повернення',
				ru: 'Доставка и возврат',
				en: ' Delivery and return',
				rs: 'Isporuke I povratak',
			},
			link: '/delivery',
			id: 645645647,
		},
		{
			label: {
				ua: 'Про бренд',
				ru: ' О бренде',
				en: ' About the brand',
				rs: 'O brendu',
			},
			link: '/#about',
			id: 86456456,
		},
		{
			label: {
				ua: 'FAQ',
				ru: 'FAQ',
				en: 'FAQ',
				rs: 'FAQ',
			},
			link: '/#faq',
			id: 645645649,
		},
	],
];

const Footer = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [footerData, setFooterData] = useState<null | FooterFetchData[]>(null);
	const { locale, pathname, push } = useRouter();
	const localeType = locale as 'ru' | 'ua' | 'rs' | 'en';
	let myLocale = locale === 'ua' ? 'uk' : locale;
	myLocale = myLocale === 'rs' ? 'sr' : myLocale;
	const footerItem = mockData.map((el) =>
		el.map((item) => ({ ...item, label: item.label[localeType] }))
	);
	const linkArray = [...footerItem, footerData];

	useEffect(() => {
		StrapiAxios.get<footersResT>(
			'/api/footers?populate=deep&locale=' + myLocale
		)
			.then((res) => {
				const sanitatedData = [
					res.data.data[0].attributes.field_1,
					res.data.data[0].attributes.field_2,
					res.data.data[0].attributes.field_3,
				];
				setFooterData(sanitatedData);
			})
			.catch((err) => {
				setFooterData([]);
				console.log(err);
			});
	}, []);

	const catalogHandler = (elLink: string, elId: number) => {
		if (elLink === '/catalog') {
			dispatch(setHeaderCategory(elId));
			if (pathname === '/catalog') {
				dispatch(fetchGoodsByCategory(elId));
			}
			push('/catalog');
		}
	};

	return (
		<footer className={s.footer}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.footer_title}>
						<HeaderLogo />
					</div>
					<nav>
						{!footerData && <FormSpinner />}
						{footerData &&
							linkArray.map((item, i) => {
								return (
									<div key={i}>
										{item.map(({ label, link, id }, i) => {
											if (link === '/catalog') {
												return (
													<Link
														href={link}
														onClick={() => catalogHandler(link, id)}
														key={i}
													>
														{label}
													</Link>
												);
											}
											if (
												['instagram', 'facebook', 'tiktok'].includes(
													label.toLocaleLowerCase()
												)
											) {
												return (
													<Link href={link} target="_blank" key={i}>
														{label}
													</Link>
												);
											}
											return (
												<Link href={link} key={i}>
													{label}
												</Link>
											);
										})}
									</div>
								);
							})}
					</nav>
					<div className={s.footer_about}>
						<div>© 2023 kazesport. Все права защищены</div>
						<div>Сайт разработан AlphaDigital</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
