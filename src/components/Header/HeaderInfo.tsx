import Image from 'next/image';
import Link from 'next/link';
import cl from './Header.module.scss';
import shopingCartSVG from '../../assets/icons/ShoppingCart.svg';
import accountSVG from '../../assets/icons/User.svg';
import arrowSVG from '../../assets/icons/Arrow.svg';
import openLangSvg from '../../assets/icons/catalog/sortIconOpen.svg';
import { FC, useState } from 'react';

type Props = {
	toggleBurgerFunc: () => void;
	showBurgerMenu: boolean;
};

const HeaderInfo: FC<Props> = ({ toggleBurgerFunc, showBurgerMenu }) => {
	const [languageDropdown, setLanguageDropdown] = useState<boolean>(false);

	const languageHandler = () => {
		setLanguageDropdown((prev) => !prev);
	};
	return (
		<div className={cl.header__info}>
			<div
				onClick={languageHandler}
				className={`${cl.header_language} ${
					languageDropdown ? `${cl.header_language_open}` : ''
				}`}
			>
				<button className={cl.header_language_lang}>УКР</button>
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
						<button>RU</button>
						<button>SRP</button>
						<button>ENG</button>
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
				<a className={cl.icon}>
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
