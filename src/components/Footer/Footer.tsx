import Link from 'next/link';
import { HeaderLogo } from '../Header';
import s from './footer.module.scss';

const mokLinkData = [
	[
		{
			name: 'Лосины',
			link: '#'
		},
		{
			name: 'Сумки',
			link: '#'
		},
		{
			name: 'Топы',
			link: '#'
		},
	],
	[
		{
			name: 'Повсегдневное белье',
			link: '#'
		},
		{
			name: 'Велосипедки',
			link: '#'
		},
		{
			name: 'Костюмы',
			link: '#'
		},
	],
	[
		{
			name: 'Доставка и возврат',
			link: '#'
		},
		{
			name: 'Про бренд',
			link: '#'
		}, {
			name: 'FAQ',
			link: '#'
		},
	],
	[
		{
			name: 'Instagram',
			link: '#'
		},
		{
			name: 'Facebook',
			link: '#'
		},
		{
			name: 'TikTok',
			link: '#'
		}
	]
]
const Footer = (): JSX.Element => {
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
									{item.map(({ name, link }, i) => {
										return (
											<Link key={i} href={link}>{name}</Link>
										)
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

export default Footer
