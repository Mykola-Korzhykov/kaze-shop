import React, { FC } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchGoodsByCategory } from "@/redux/slices/goods";
import Link from "next/link";
import cl from "./Header.module.scss";
const HeaderMenu: FC<{ classNameToggle: boolean }> = ({ classNameToggle }) => {
    const dispatch = useAppDispatch();
    const HeadersCategories = [
        {
            label: "Личный кабинет",
            link: "/cabinet",
            id: 1,
        },
        {
            label: "Лосины",
            link: "/catalog",
            id: 2,
        },
        {
            label: "Костюмы",
            link: "/catalog",
            id: 7,
        },
        {
            label: "Велосипедки",
            link: "/catalog",
            id: 3,
        },
        {
            label: "Повседневное белье",
            link: "/catalog",
            id: 4,
        },
        {
            label: "Сумки",
            link: "/catalog",
            id: 5,
        },
        {
            label: "Топы",
            link: "/catalog",
            id: 6,
        },
    ];

    const headerLinkHandler = (elLink: string, elId: number) => {
        if (elLink === "/catalog") {
            dispatch(fetchGoodsByCategory(elId));
        }
    };

    return (
        <nav
            className={classNameToggle ? cl.header__menu_open : cl.header__menu}
        >
            <ul className={cl.header__list}>
                {HeadersCategories.map((el) => {
                    return (
                        <li
                            key={el.id}
                            onClick={() => headerLinkHandler(el.link, el.id)}
                            className={
                                el.link === "/cabinet"
                                    ? `${cl.header__list_account}`
                                    : ""
                            }
                        >
                            <Link
                                href={el.link}
                                className={
                                    el.link === "/cabinet"
                                        ? `${cl.header__list_link}`
                                        : `${cl.header__link}`
                                }
                            >
                                {el.label}
                            </Link>
                        </li>
                    );
                })}
                {/* <li className={cl.header__list_account}>
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
				</li> */}
            </ul>
            <ul className={cl.header__menu_languages}>
                <li>Український</li>
                <li>Русский</li>
                <li>Serbskiy</li>
                <li>English</li>
            </ul>
        </nav>
    );
};

export default HeaderMenu;
