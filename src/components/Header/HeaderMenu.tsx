import React, { FC } from 'react'
import Link from 'next/link'
import cl from './Header.module.scss'
const HeaderMenu: FC<{ classNameToggle: boolean }> = ({ classNameToggle }) => {
	return (
		<nav className={classNameToggle ? cl.header__menu_open : cl.header__menu}>
			<ul className={cl.header__list}>
				<li className={cl.header__list_account}>
					<Link href='/cabinet' className={cl.header__list_link}>
						Личный кабинет
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Лосины
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Костюмы
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Велосипедки
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Повседневное белье
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Сумки
					</Link>
				</li>
				<li>
					<Link href='#' className={cl.header__link}>
						Топы
					</Link>
				</li>
			</ul>
			<ul className={cl.header__menu_languages}>
				<li>Український</li>
				<li>Русский</li>
				<li>Serbskiy</li>
				<li>English</li>
			</ul>
		</nav>
	)
}

export default HeaderMenu
