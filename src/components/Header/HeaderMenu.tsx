import React, { FC } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchGoodsByCategory, setHeaderCategory } from '@/redux/slices/goods';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cl from './Header.module.scss';

const HeaderMenu: FC<{
	classNameToggle: boolean;
	toggleBurgerFunc: () => void;
}> = ({ classNameToggle, toggleBurgerFunc }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
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
	const HeadersCategories = [
		{
			label: 'Личный кабинет',
			link: '/cabinet',
			id: 14234234234,
		},
		{
			label: 'Лосины',
			link: '/catalog',
			id: 1,
		},
		{
			label: 'Костюмы',
			link: '/catalog',
			id: 12,
		},
		{
			label: 'Велосипедки',
			link: '/catalog',
			id: 4,
		},
		{
			label: 'Повседневное белье',
			link: '/catalog',
			id: 8,
		},
		{
			label: 'Сумки',
			link: '/catalog',
			id: 5,
		},
		{
			label: 'Топы',
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
							key={el?.id + el?.label}
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
								{el?.label}
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
