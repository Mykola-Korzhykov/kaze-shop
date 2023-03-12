import React from "react";
import Image from 'next/image';
import ArrowUser from '../../../../../assets/icons/ArrowUser.svg'
import s from './UserAdmin.module.scss'
//icons
import userIcone from '../../../../../assets/icons/User/user_icon.svg'
import phoneIcone from '../../../../../assets/icons/User/phone_icon.svg'
import emailIcone from '../../../../../assets/icons/User/email_icon.svg'
import checkbox_icon from '../../../../../assets/icons/User/checkbox_icon.svg'
import {API_URL} from '../../../../../services/index'
import axios from 'axios'
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import {getUsersAdmin, getUsersRole} from '../../../../../redux/slices/admin'
// import { useWhyDidYouUpdate } from 'ahooks';

interface UserProps {
    idUserOpen?: number,
    id: number,
    setUserOpenOK?: (n: number) => void,
    addContent: boolean, 
    editContent: boolean,
    editWebsite:  boolean,
    isAdmin: boolean,
    email: string,
    phoneNumber: string,
    surname: string,
    name: string,
    activePaginatoinRoleAdmin: number
}

export const UserAdmin: React.FC<UserProps> = ({ activePaginatoinRoleAdmin, setUserOpenOK, idUserOpen, id, addContent, editContent, editWebsite, isAdmin, email, phoneNumber , surname, name  }) => {

    const openUser = id === idUserOpen ? true : false
    const [activeCheckbox, setSctiveCheckbox] = React.useState<number | null>(null)
   
    const [UserAdmin, setUserAdmin] = React.useState<{
        addContent: boolean, 
        editContent: boolean,
        editWebsite:  boolean,
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
        editWebsite: editWebsite,}
    )
    
    console.log('UserAdmin', UserAdmin)
    const dispatch = useAppDispatch()
    // console.log(useWhyDidYouUpdate('UserAdmin',{ activePaginatoinRoleAdmin, setUserOpenOK, idUserOpen, id, addContent, editContent, editWebSite, isAdmin, email, phoneNumber , surname, name  }))
    
    // function changeUserRole (role: string, bool: boolean){
        
    // }
       
    function sendUserAdmin(role: string, bool: boolean) {
        const cookies = Cookies.get()
        const token = cookies.accessToken
      
        const instance = axios.create({
          baseURL: API_URL,
          withCredentials: true,
          headers: {
            Authorization: 'Bearer ' + (token || ''),
          },
        })

        
        setUserAdmin({
            ...UserAdmin,
            [role]: bool,
        })
      
        instance.put('/admin/create_admin', {
            ...UserAdmin,
            [role]: bool,
        })
        
          .then(response => {

           
            // dispatch(getUsersAdmin(activePaginatoinRoleAdmin))
            // setUserAdmin(prevState => ({
            //   ...prevState,
            //   [role]: bool,
            // }))
          })
          .catch(error => {
            console.error('Error updating user admin:', error)
          })

        //   setUserAdmin(prevState => ({ ...prevState, [role]: bool, }))
      }

    //  React.useEffect(()=>{
    //    dispatch(getUsersRole(activePaginatoinRoleAdmin))
    //   }, [])

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

                    <label htmlFor={`isAdmin${id}`} className={s.checkbox_wrapper}>
                        <input checked={UserAdmin.isAdmin ? true : false} onChange={()=>{
                        //    changeUserRole('isAdmin', !UserAdmin.isAdmin)

                           sendUserAdmin('isAdmin', !UserAdmin.isAdmin)
                        //    setUserAdmin(prevState => ({
                        //     ...prevState,
                        //     'isAdmin': !UserAdmin.isAdmin,
                        //   }))

                        }} onClick={() => setSctiveCheckbox(1)} id={`isAdmin${id}`} className={s.checkbox} type="checkbox" />
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

            {/* <div onClick={()=> {
                // console.log('UserAdmin', UserAdmin)
                sendUserAdmin()
            }} className={ openUser ?  s.btn_save : s.btn_save_off }>
                Сохранить
            </div> */}
        </div>
    )
}