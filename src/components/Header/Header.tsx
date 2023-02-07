import React, { FC, RefObject } from "react";
import cl from "./Header.module.scss";
import { HeaderMenu, HeaderInfo, HeaderLogo } from "./index";

type Props = {
    isSticky: boolean,
    headerRef: RefObject<HTMLElement>
}

const Header: FC<Props> = ({isSticky, headerRef}) => {
  const [showBurgerMenu, setShowBurgerMenu] = React.useState<boolean>(false);
  const toogleBurgerMenu = React.useCallback(() => {
    setShowBurgerMenu((prev) => !prev);
  }, []);

  return (
    <header className={`${cl.header} ${isSticky ? cl.sticky : ''}`}>
      <div className="container">
        <div className={cl.header__body}>
          <HeaderLogo />
          <HeaderMenu classNameToggle={showBurgerMenu} />
          <HeaderInfo toggleBurgerFunc={toogleBurgerMenu} showBurgerMenu={showBurgerMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
