import React from "react";
import Image from 'next/image';
import ArrowUser from '../../../../../assets/icons/ArrowUser.svg'
import s from './UserAdmin.module.scss'
//icons
import userIcone from '../../../../../assets/icons/User/user_icon.svg'
import phoneIcone from '../../../../../assets/icons/User/phone_icon.svg'
import emailIcone from '../../../../../assets/icons/User/email_icon.svg'
import checkbox_icon from '../../../../../assets/icons/User/checkbox_icon.svg'

interface UserProps {
    idUserOpen?: number,
    id: number,
    setUserOpenOK?: (n: number) => void,
    addContent: boolean, 
    editContent: boolean,
    editWebSite:  boolean,
    isAdmin: boolean,
    email: string,
    phoneNumber: string,
    surname: string,
    name: string,

}

export const UserAdmin: React.FC<UserProps> = ({ setUserOpenOK, idUserOpen, id, addContent, editContent, editWebSite, isAdmin, email, phoneNumber , surname, name  }) => {

    const openUser = id === idUserOpen ? true : false
    const [activeCheckbox, setSctiveCheckbox] = React.useState<number | null>(null)

    const [UserAdmin, setUserAdmin] = React.useState<{
        addContent: boolean, 
        editContent: boolean,
        editWebSite:  boolean,
        isAdmin: boolean,
        email: string,
        phoneNumber: string,
        surname: string,
        name: string,
        id: number,
    }>(
       { id: id,
        name: name,
        surname: surname,
        email: email,
        phoneNumber: phoneNumber,
        isAdmin: isAdmin,
        addContent: addContent,
        editContent: editContent,
        editWebSite: editWebSite,}
    )
    

    function sendUserAdmin (role: any, bool: boolean){

        fetch('/admin/create_admin',{
            method: 'PUT',
            body: JSON.stringify({...UserAdmin, [role]: bool  })
        })
        setUserAdmin((prevState)=> ({...prevState, [role]: bool  }))
        // console.log(  'editContent',  UserAdmin.editContent)
        // console.log(  'addContent',  UserAdmin.addContent)

    }

    return (
        <div onClick={() => { setUserOpenOK(idUserOpen === id ? -1 : id) }} className={s.wrapper}>
            <div className={s.info}>
                <div className={s.user}>
                    <div className={s.user_id}>User {id}</div>
                    <Image onClick={() => {
                        setUserOpenOK(idUserOpen === id ? -1 : id)

                    }} className={openUser ? `${s.ArrowUser_open}` : `${s.ArrowUser_close}`} src={ArrowUser} alt='user' />
                </div>

                <div className={s.user_info}>
                    <span className={`${s.name} ${s.user_inner}`}>
                        <Image src={userIcone} alt='user' />
                       {surname} {name}
                    </span>

                    <span className={`${s.email} ${s.user_inner}`}>
                        <Image src={emailIcone} alt='phone' />
                        {email}
                    </span>

                    <span className={`${s.phone} ${s.user_inner}`}>
                        <Image src={phoneIcone} alt='email' />
                        {phoneNumber}
                    </span>
                </div>
            </div>


            <div className={openUser ? `${s.roles} ${s.roles__open}` : `${s.roles} ${s.roles__false}`}>
                <div className={s.checkbox_wrapper_first}>

                    <label htmlFor={`makeAdmin${id}`} className={s.checkbox_wrapper}>
                        <input onChange={()=>{
                           sendUserAdmin('isAdmin', !UserAdmin.isAdmin)
                           console.log(`user ${id}`, !UserAdmin.isAdmin)
                        }} onClick={() => setSctiveCheckbox(1)} id={`makeAdmin${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span  className={s.checkbox_text}> Сделать администратором</span>
                    </label>

                    {/* <label htmlFor={`editRpoduct${id}`} className={s.checkbox_wrapper}>
                        <input onClick={() => setSctiveCheckbox(2)} id={`editRpoduct${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span className={s.checkbox_text}> Редактирование товара</span>
                    </label> */}
                </div>

                {/* <div className={s.checkbox_wrapper_second}>
                    <label htmlFor={`addProduct${id}`} className={s.checkbox_wrapper}>
                        <input onClick={() => setSctiveCheckbox(3)} id={`addProduct${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span className={s.checkbox_text}> Добавление товара</span>
                    </label>

                    <label htmlFor={`editSite${id}`} className={s.checkbox_wrapper}>
                        <input onClick={() => setSctiveCheckbox(4)} id={`editSite${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span className={s.checkbox_text}> Редактирование сайта</span>
                    </label>
                </div> */}



            </div>
        </div>
    )
}