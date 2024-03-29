import Image from 'next/image';
import Link from 'next/link';
import cl from './Header.module.scss';
import shopingCartSVG from '../../assets/icons/ShoppingCart.svg';
import accountSVG from '../../assets/icons/User.svg';
import arrowSVG from '../../assets/icons/Arrow.svg';
import openLangSvg from '../../assets/icons/catalog/sortIconOpen.svg';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
type Props = {
	toggleBurgerFunc: () => void;
	showBurgerMenu: boolean;
};

const HeaderInfo: FC<Props> = ({ toggleBurgerFunc, showBurgerMenu }) => {
	const [languageDropdown, setLanguageDropdown] = useState<boolean>(false);
	const router = useRouter();
	const startMain = useSelector((state: RootState) => state.admin.startMain);

	// const [startMain, setStartMain] = React.useState(false);

	// React.useEffect(() => {
	// 	function handleScroll() {
	// 		if (window.scrollY > 2 && router.asPath === '/') {
	// 			setStartMain(true);
	// 		}
	// 	}

	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => window.removeEventListener('scroll', handleScroll);
	// }, []);
	const Languages = [
		{
			label: 'UA',
			locale: 'ua',
		},
		{
			label: 'RU',
			locale: 'ru',
		},
		{
			label: 'SRB',
			locale: 'rs',
		},
		{
			label: 'ENG',
			locale: 'en',
		},
	];

	const languageHandler = () => {
		setLanguageDropdown((prev) => !prev);
	};
	return (
		<div className={cl.header__info}>
			<div
				style={{
					border: startMain ? 'none' : '',
				}}
				onClick={languageHandler}
				className={`${cl.header_language} ${
					languageDropdown ? `${cl.header_language_open}` : ''
				}`}
			>
				<button
					style={{
						background: startMain ? 'transparent' : '',
					}}
					className={cl.header_language_lang}
				>
					{router.locale.toUpperCase()}
				</button>
				<Image
					src={languageDropdown ? openLangSvg : arrowSVG}
					alt="link to user basket"
					width={18}
					height={18}
				/>
				{languageDropdown && (
					<div
						className={cl.header_dropdown}
						onClick={(e) => {
							e.stopPropagation();
							languageHandler();
						}}
					>
						{Languages.filter((el) => el.locale !== router.locale).map((el) => {
							return (
								<Link key={el.locale} href={router.asPath} locale={el.locale}>
									{el.label}
								</Link>
							);
						})}
					</div>
				)}
			</div>
			<Link href={'/cart'} legacyBehavior>
				<a className={cl.icon}>
					<Image
						src={shopingCartSVG}
						alt="link to user basket"
						width={28}
						height={28}
					/>
				</a>
			</Link>
			<Link href={'/cabinet'} legacyBehavior>
				<a className={`${cl.icon} ${cl.icon_account}`}>
					<Image
						src={accountSVG}
						alt="link to user cabiner"
						width={28}
						height={28}
						className={cl.header__info_accountSVG}
					/>
				</a>
			</Link>
			<div
				onClick={toggleBurgerFunc}
				className={`${cl.header__burger} ${
					showBurgerMenu ? cl.header__burger_show : ''
				}`}
			>
				<span></span>
			</div>
		</div>
	);
};

export default HeaderInfo;
