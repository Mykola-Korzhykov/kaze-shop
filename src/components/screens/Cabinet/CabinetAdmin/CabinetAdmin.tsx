import React from "react";
import { useSelector } from "react-redux";
import s from './CabinetAdmine.module.scss'
import { Button } from './Buttons/Button'
import { UserRole } from './UsersRole/UserRole'
import { UserAdmin } from './UserAdmin/UserAdmin'
import { RootState } from "@/redux/store";
import Link from "next/link";

import Image from 'next/image';
//icons
import icon1 from '../../../../assets/icons/cabinetAdmin/icon1_grey.svg'
import icon2 from '../../../../assets/icons/cabinetAdmin/icon2_grey.svg'
import icon3 from '../../../../assets/icons/cabinetAdmin/icon3_grey.svg'
import icon4 from '../../../../assets/icons/cabinetAdmin/icon4_grey.svg'
import icon5 from '../../../../assets/icons/cabinetAdmin/icon5_grey.svg'
import icon6 from '../../../../assets/icons/cabinetAdmin/icon6_gray.svg'
import icon7 from '../../../../assets/icons/cabinetAdmin/icon7_grey.svg'
//white
import icon_white1 from '../../../../assets/icons/cabinetAdmin/icon1_white.svg'
import icon_white2 from '../../../../assets/icons/cabinetAdmin/icon2_white.svg'
import icon_white3 from '../../../../assets/icons/cabinetAdmin/icon3_white.svg'
import icon_white4 from '../../../../assets/icons/cabinetAdmin/icon4_white.svg'
import icon_white5 from '../../../../assets/icons/cabinetAdmin/icon5_white.svg'
import icon_white6 from '../../../../assets/icons/cabinetAdmin/icon6_white.svg'
import icon_white7 from '../../../../assets/icons/cabinetAdmin/icon7_white.svg'
//types
import { ButtonType } from '../../../../types/auth'


const buttonsObj: ButtonType[] = [
    { id: 1, img_grey: icon1, img_white: icon_white1, text: 'Выдать роль', url: '/adminSettings/roleSettings' },
    { id: 2, img_grey: icon2, img_white: icon_white2, text: 'Администраторы', url: '/adminSettings/adminSettings' },
    // { id: 3, img_grey: icon3, img_white: icon_white3, text: 'Редактировать сайт' },
    { id: 4, img_grey: icon4, img_white: icon_white4, text: 'Добавить товар' },
    { id: 5, img_grey: icon5, img_white: icon_white5, text: 'Редактировать товар' },
    { id: 6, img_grey: icon6, img_white: icon_white6, text: 'Настройки' },
    { id: 7, img_grey: icon7, img_white: icon_white7, text: 'Выход' }
]

export const CabinetAdmin: React.FC = () => {

    const users = useSelector((state: RootState) => state.admin.users)
    console.log('users', users)

    // const [openUserMy, setOpenUserMy] = React.useState<number>(0)
    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    const [displayActive, setDisplayActive] = React.useState<number>(1)

    const usersRole = users.map((el) => <UserRole key={el.id} setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} id={el.id} />)
    const usersAdmin = users.map((el) => <UserAdmin key={el.id} setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} id={el.id} />)
    return (
        <div className={s.wrapper}>

            <div className={s.nav_dekstop}>
                {buttonsObj.map((obj, ind) => {
                    return <Button chengeDisplayOK={setDisplayActive} key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
                })}
            </div>

            <div className={s.nav_mobile}>
                {buttonsObj.map((obj, ind) => {

                    return <Link className={s.link} href={`${obj.url}`} key={ind}>
                        <Button chengeDisplayOK={setDisplayActive} key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
                    </Link>
                })}
            </div>

            <div className={s.display}>
                {displayActive === 1 ? usersRole : ''}
                {displayActive === 2 ? usersAdmin : ''}
            </div>

        </div>
    )
}

