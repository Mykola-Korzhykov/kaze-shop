import React, { FC } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchGoodsByCategory, setHeaderCategory } from '@/redux/slices/goods';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cl from './Header.module.scss';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderMenu: FC<{
	classNameToggle: boolean;
	toggleBurgerFunc: () => void;
}> = ({ classNameToggle, toggleBurgerFunc }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const startMain = useSelector((state: RootState) => state.admin.startMain);

	const Languages = [
		{
			label: 'Український',
			locale: 'ua',
		},
		{
			label: 'Русский',
			locale: 'ru',
		},
		{
			label: 'Serbskiy',
			locale: 'rs',
		},
		{
			label: 'English',
			locale: 'en',
		},
	];

	let HeadersCategories = startMain
		? [
				{
					label: {
						ua: 'Особистий кабінет',
						en: 'Personal cabinet',
						rs: 'Лична канцеларија',
						ru: 'Личный кабинет',
					},
					link: '/cabinet',
					id: 14234234234,
				},
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
				// {
				// 	label: {
				// 		ua: 'Худі/світшоти',
				// 		en: 'Hoodies/sweatshirts',
				// 		rs: 'Duksevi ',
				// 		ru: 'Xуди/свитшоты',
				// 	},

				// 	link: '/catalog',
				// 	id: 8,
				// },
				// {
				// 	label: {
				// 		ua: 'Сумки',
				// 		en: 'Bags',
				// 		rs: 'Torbe',
				// 		ru: 'Сумки',
				// 	},

				// 	link: '/catalog',
				// 	id: 5,
				// },
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
		  ]
		: [
				{
					label: {
						ua: 'Особистий кабінет',
						en: 'Personal cabinet',
						rs: 'Лична канцеларија',
						ru: 'Личный кабинет',
					},
					link: '/cabinet',
					id: 14234234234,
				},
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
		  ];

	const headerLinkHandler = (elLink: string, elId: number) => {
		if (elLink === '/catalog') {
			dispatch(setHeaderCategory(elId));
			if (router.pathname === '/catalog') {
				dispatch(fetchGoodsByCategory(elId));
			}
			router.push('/catalog');
		}
		toggleBurgerFunc();
	};

	return (
		<nav className={classNameToggle ? cl.header__menu_open : cl.header__menu}>
			<ul className={cl.header__list}>
				{HeadersCategories.map((el) => {
					return (
						<li
							key={
								el?.id + el?.label?.[router.locale as 'ua' | 'en' | 'rs' | 'ru']
							}
							onClick={() => headerLinkHandler(el?.link, el?.id)}
							className={
								el?.link === '/cabinet' ? `${cl.header__list_account}` : ''
							}
						>
							<Link
								href={el?.link}
								className={
									el?.link === '/cabinet'
										? `${cl.header__list_link}`
										: `${cl.header__link}`
								}
							>
								{el?.label?.[router.locale as 'ua' | 'en' | 'rs' | 'ru']}
							</Link>
						</li>
					);
				})}
			</ul>
			<ul className={cl.header__menu_languages}>
				{Languages.map((el) => {
					return (
						<Link
							key={el.locale}
							style={{
								backgroundColor:
									el.locale === router.locale ? '#0b0b0b' : undefined,
								color: el.locale === router.locale ? '#fff' : undefined,
								transition: 'all 0.2s ease',
								borderColor:
									el.locale === router.locale ? '#0b0b0b' : undefined,
							}}
							href={router.pathname}
							locale={el.locale}
						>
							{el.label}
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default HeaderMenu;
