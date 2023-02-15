import React from "react";
import s from './CabinetAdmine.module.scss'
import { Button } from './Buttons/Button'
import { User } from '../CabinetAdmin/Users/User'
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
    { id: 1, img_grey: icon1, img_white: icon_white1, text: 'Выдать роль' },
    { id: 2, img_grey: icon2, img_white: icon_white2, text: 'Администраторы' },
    { id: 3, img_grey: icon3, img_white: icon_white3, text: 'Редактировать сайт' },
    { id: 4, img_grey: icon4, img_white: icon_white4, text: 'Добавить товар' },
    { id: 5, img_grey: icon5, img_white: icon_white5, text: 'Редактировать товар' },
    { id: 6, img_grey: icon6, img_white: icon_white6, text: 'Настройки' },
    { id: 7, img_grey: icon7, img_white: icon_white7, text: 'Выход' }
]

export const CabinetAdmin: React.FC = () => {

    const [openUserMy, setOpenUserMy] = React.useState<number>(0)
    const [idUserOpen, setUserOpen] = React.useState<number>(0)

    return (
        <div className={s.wrapper}>

            <div className={s.nav}>
                {buttonsObj.map((obj) => {
                    return <Button key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
                })}
            </div>

            <div className={s.users}>
                <User setUserOpenOK={setUserOpen} id={1} idUserOpen={idUserOpen} />
                <User setUserOpenOK={setUserOpen} id={2} idUserOpen={idUserOpen} />
                <User setUserOpenOK={setUserOpen} id={3} idUserOpen={idUserOpen} />
                <User setUserOpenOK={setUserOpen} id={4} idUserOpen={idUserOpen} />
            </div>

        </div>
    )
}

