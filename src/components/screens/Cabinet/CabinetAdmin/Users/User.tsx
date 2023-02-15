import React from "react";
import Image from 'next/image';
import ArrowUser from '../../../../../assets/icons/ArrowUser.svg'
import s from './User.module.scss'
//icons
import userIcone from '../../../../../assets/icons/User/user_icon.svg'
import phoneIcone from '../../../../../assets/icons/User/phone_icon.svg'
import emailIcone from '../../../../../assets/icons/User/email_icon.svg'

interface UserProps {
    idUserOpen: number,
    id: number,
    setUserOpenOK: (n: number) => void
}

export const User: React.FC<UserProps> = ({ setUserOpenOK, idUserOpen, id }) => {

    const [openUserMy, setOpenUserMy] = React.useState<boolean>(false)
    const openUser = id === idUserOpen ? true : false

    return (
        <div className={s.wrapper}>
            <div className={s.info}>
                <div className={s.user}>
                    <div className={s.user_id}>User 948</div>
                    <Image onClick={() => {
                        setUserOpenOK(id)
                        setOpenUserMy(!openUserMy)
                    }} className={openUser && openUserMy ? `${s.ArrowUser_open}` : `${s.ArrowUser_close}`} src={ArrowUser} alt='user' />
                </div>

                <div className={s.user_info}>
                    <span className={`${s.name} ${s.user_inner}`}>
                        <Image src={userIcone} alt='user' />
                        Артур Копча
                    </span>

                    <span className={`${s.email} ${s.user_inner}`}>
                        <Image src={phoneIcone} alt='phone' />
                        arturkopcha@icloud.com
                    </span>

                    <span className={`${s.phone} ${s.user_inner}`}>
                        <Image src={emailIcone} alt='email' />
                        +38094049949595
                    </span>
                </div>

            </div>


            <div className={openUser ? `${s.roles} ${s.roles__open}` : `${s.roles} ${s.roles__false}`}>

                <label className={s.done_wrapper}>
                    <input className={s.checkbox} type="checkbox" />
                    <span className={s.done_text}> Сделать администратором</span>
                </label>

                <label className={s.done_wrapper}>
                    <input className={s.checkbox} type="checkbox" />
                    <span className={s.done_text}> Редактирование товара</span>
                </label>

                <label className={s.done_wrapper}>
                    <input className={s.checkbox} type="checkbox" />
                    <span className={s.done_text}> Добавление товара</span>
                </label>

                <label className={s.done_wrapper}>
                    <input className={s.checkbox} type="checkbox" />
                    <span className={s.done_text}> Редактирование сайта</span>
                </label>

            </div>
        </div>
    )
}