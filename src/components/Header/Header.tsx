import React, { FC, RefObject } from 'react';
import cl from './Header.module.scss';
import { HeaderMenu, HeaderInfo, HeaderLogo } from './index';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { setStartMain } from '@/redux/slices/admin';

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
	const dispatch = useAppDispatch();

	const startMain = useSelector((state: RootState) => state.admin.startMain);

	React.useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 2 && router.asPath === '/') {
				dispatch(setStartMain(true));
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
