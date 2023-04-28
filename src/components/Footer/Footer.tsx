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

const mokLinkData = [
	[
		{
			text: 'Лосины',
			link: '/catalog',
			id: 1,
		},
		{
			text: 'Сумки',
			link: '/catalog',
			id: 5,
		},
		{
			text: 'Топы',
			link: '/catalog',
			id: 10,
		},
	],
	[
		{
			text: 'Повсегдневное белье',
			link: '/catalog',
			id: 8,
		},
		{
			text: 'Велосипедки',
			link: '/catalog',
			id: 4,
		},
		{
			text: 'Костюмы',
			link: '/catalog',
			id: 12,
		},
	],
	[
		{
			text: 'Доставка и возврат',
			link: '/delivery',
			id: 645645647,
		},
		{
			text: 'Про бренд',
			link: '#about',
			id: 86456456,
		},
		{
			text: 'FAQ',
			link: '/#faq',
			id: 645645649,
		},
	],
];

const Footer = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [footerData, setFooterData] = useState<null | FooterFetchData[]>(null);
	const { locale, pathname, push } = useRouter();

	const myLocale = locale === 'ua' ? 'uk' : locale;

	const linkArray = [...mokLinkData, footerData];

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
										{item.map(({ text, link, id }, i) => {
											if (link === '/catalog') {
												return (
													<Link
														href={link}
														onClick={() => catalogHandler(link, id)}
														key={i}
													>
														{text}
													</Link>
												);
											}
											if (
												['instagram', 'facebook', 'tiktok'].includes(
													text.toLocaleLowerCase()
												)
											) {
												return (
													<Link href={link} target="_blank" key={i}>
														{text}
													</Link>
												);
											}
											return (
												<Link href={link} key={i} scroll={false}>
													{text}
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
