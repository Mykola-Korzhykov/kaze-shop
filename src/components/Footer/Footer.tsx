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
			id: 2,
		},
		{
			text: 'Топы',
			link: '/catalog',
			id: 3,
		},
	],
	[
		{
			text: 'Повсегдневное белье',
			link: '/catalog',
			id: 4,
		},
		{
			text: 'Велосипедки',
			link: '/catalog',
			id: 5,
		},
		{
			text: 'Костюмы',
			link: '/catalog',
			id: 6,
		},
	],
	[
		{
			text: 'Доставка и возврат',
			link: '/delivery',
			id: 7,
		},
		{
			text: 'Про бренд',
			link: '/about',
			id: 8,
		},
		{
			text: 'FAQ',
			link: '/faq',
			id: 9,
		},
	],
];

const Footer = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [footerData, setFooterData] = useState<null | FooterFetchData[]>(null);
	const { locale } = useRouter();
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
											if (text === '/catalog') {
												return (
													<Link
														href={link}
														onClick={() => dispatch(fetchGoodsByCategory(id))}
														key={i}
													>
														{text}
													</Link>
												);
											}
											if (['Instagram', 'Facebook', 'TikTok'].includes(text)) {
												return (
													<Link href={link} target="_blank" key={i}>
														{text}
													</Link>
												);
											}
											return (
												<Link href={link} key={i}>
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
