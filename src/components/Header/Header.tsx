import React, { FC, RefObject } from 'react';
import cl from './Header.module.scss';
import { HeaderMenu, HeaderInfo, HeaderLogo } from './index';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Props = {
	isSticky?: boolean;
	headerRef: RefObject<HTMLElement>;
};

const Header: FC<Props> = ({ headerRef }) => {
	const [showBurgerMenu, setShowBurgerMenu] = React.useState<boolean>(false);
	const toogleBurgerMenu = React.useCallback(() => {
		setShowBurgerMenu((prev) => !prev);
	}, []);

	const isSticky = useSelector(
		(state: RootState) => state.admin.headerIsSticky
	);
	console.log('isSticky', isSticky);
	return (
		<header
			className={!isSticky ? `${cl.header}` : `${cl.sticky} ${cl.header}`}
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
