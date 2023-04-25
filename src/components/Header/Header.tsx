import React, { FC, RefObject } from 'react';
import cl from './Header.module.scss';
import { HeaderMenu, HeaderInfo, HeaderLogo } from './index';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

type Props = {
	isSticky?: boolean;
	headerRef: RefObject<HTMLElement>;
};

const Header: FC<Props> = ({ headerRef }) => {
	const [showBurgerMenu, setShowBurgerMenu] = React.useState<boolean>(false);
	const toogleBurgerMenu = React.useCallback(() => {
		setShowBurgerMenu((prev) => !prev);
	}, []);

	const router = useRouter();

	// const isSticky = useSelector(
	// 	(state: RootState) => state.admin.headerIsSticky
	// );
	const [startMain, setStartMain] = React.useState(false);

	React.useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 2 && router.asPath === '/') {
				setStartMain(true);
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={startMain ? `${cl.sticky} ${cl.header}` : `${cl.header}`}
		>
			<div className="container">
				<div className={cl.header__body}>
					<HeaderLogo />
					<HeaderMenu
						classNameToggle={showBurgerMenu}
						toggleBurgerFunc={toogleBurgerMenu}
					/>
					<HeaderInfo
						toggleBurgerFunc={toogleBurgerMenu}
						showBurgerMenu={showBurgerMenu}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
