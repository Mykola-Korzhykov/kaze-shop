import { fetchGoodsByCategory } from '@/redux/slices/goods';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { HeaderLogo } from '../Header';
import s from './Footer.module.scss';
import { setHeaderCategory } from '@/redux/slices/goods';
import { useRouter } from 'next/router';
const mokLinkData = [
	[
		{
			name: 'Лосины',
			link: '/catalog',
			id: 1,
		},
		{
			name: 'Сумки',
			link: '/catalog',
			id: 2,
		},
		{
			name: 'Топы',
			link: '/catalog',
			id: 3,
		},
	],
	[
		{
			name: 'Повсегдневное белье',
			link: '/catalog',
			id: 4,
		},
		{
			name: 'Велосипедки',
			link: '/catalog',
			id: 5,
		},
		{
			name: 'Костюмы',
			link: '/catalog',
			id: 6,
		},
	],
	[
		{
			name: 'Доставка и возврат',
			link: '/delivery',
			id: 7,
		},
		{
			name: 'Про бренд',
			link: '/about',
			id: 8,
		},
		{
			name: 'FAQ',
			link: '/faq',
			id: 9,
		},
	],
];

const Footer = (): JSX.Element => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const footer = useAppSelector((store) => store.strapiValues.footer);
	const strapiSocial = footer.field.map((el) => {
		const { id, link, text } = el;
		return { id, link, name: text };
	});

	const linkArray = [...mokLinkData, strapiSocial];

	const categoryHandler = (id: number, link: string) => {
		if (link === '/catalog') {
			dispatch(setHeaderCategory(id));
			if (router.pathname === '/catalog') {
				dispatch(fetchGoodsByCategory(id));
			}
			router.push('/catalog');
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
						{linkArray.map((item, i) => {
							return (
								<div key={i}>
									{item.map(({ name, link, id }, i) => {
										if (name === '/catalog') {
											return (
												<Link
													href={link}
													onClick={() => categoryHandler(id, link)}
													key={i}
												>
													{name}
												</Link>
											);
										}
										if (['Instagram', 'Facebook', 'TikTok'].includes(name)) {
											return (
												<Link href={link} target="_blank" key={i}>
													{name}
												</Link>
											);
										}
										return (
											<Link href={link} key={i}>
												{name}
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
