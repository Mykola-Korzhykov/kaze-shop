import { useAppDispatch } from '@/redux/hooks';
import { fetchGoodsByCategory } from '@/redux/slices/goods';
import { Goods } from '@/types/goods';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import Link from 'next/link';
import { HeaderLogo } from '../Header';
import s from './Footer.module.scss';

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
			id: 8
		},
		{
			name: 'FAQ',
			link: '/faq',
			id: 9
		},
	],
	[
		{
			name: 'Instagram',
			link: 'https://instagram.com',
			id: 9,
		},
		{
			name: 'Facebook',
			link: 'https://facebook.com',
			id: 10,
		},
		{
			name: 'TikTok',
			link: 'https://tiktok.com',
			id: 11,
		}
	]
]
const Footer = (): JSX.Element => {
	const dispatch = useAppDispatch();
	return (
		<footer className={s.footer}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.footer_title}>
						<HeaderLogo />
					</div>
					<nav>
						{mokLinkData.map((item, i) => {
							return (
								<div key={i}>
									{item.map(({ name, link, id }, i) => {
										if (name === '/catalog') {
											return <Link href={link}
												onClick={() => dispatch(fetchGoodsByCategory(id))}
												key={i}>
												{name}
											</Link>	
										}
										if (['Instagram', 'Facebook', 'TikTok'].includes(name)) {
											return <Link href={link} target='_blank' key={i}>{name}</Link>
										}
										return <Link href={link} key={i}>{name}</Link>
									})}
								</div>
							)
						})}
					</nav>
					<div className={s.footer_about}>
						<div>© 2023 kazesport. Все права защищены</div>
						<div>Сайт разработан AlphaDigital</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer;


