//redux
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/redux/store'
import s from './adminSettings.module.scss'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import Image from 'next/image'
//components 
import { NextPage } from 'next'
import { Api } from '@/services'
import Link from 'next/link'
//icons 
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg'
// import findUser from '../../assets/icons/cabinetAdmin/findUser.svg'
// import { UserAdmin } from '@/components/screens/Cabinet/CabinetOwner/UsersRole/UserAdmin'

import React from "react";
import { useAppDispatch } from '@/redux/hooks'
import { findUsersAdmin, getUsersAdmin } from '@/redux/slices/admin'
import { UserAdmin } from '@/components/screens/Cabinet/CabinetOwner/UserAdmin/UserAdmin'
import debounce from 'lodash.debounce'



const AdminSettings: React.FC = () => {

    const usersAdminUI = useSelector((state: RootState) => state.admin.usersAdmin)
    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    const [activePaginatoinAdmin, setActivePaginatoinAdmin] = React.useState<number>(1)
    const [paginationLendthAdmin, setPaginationLendthAdmin] = React.useState<any[]>([])

    const dispatch = useAppDispatch()

    // get users
    React.useEffect(()=>{
        // console.log('пошел запрос1111')
            dispatch(getUsersAdmin(activePaginatoinAdmin))
    }, [ activePaginatoinAdmin])

    React.useEffect(()=>{

        let countAdminPagination = Math.ceil(usersAdminUI.length / 10)
        let arrAdminPagination: number[] = [];
        for(let i = 1;  i <  countAdminPagination + 1; i++){
            arrAdminPagination.push(i)
        }

        setPaginationLendthAdmin(arrAdminPagination)

    }, [usersAdminUI])

    const debouncedSearchAdmin = debounce((term) => {
        dispatch(findUsersAdmin(term))
    }, 500);


    return (
        <SpinnerLayout>

    <main className='content'>
        <div className='container'>

            <div className='page_coordinator'>
                <Link href='/cabinet'>.../Личный кабинет |</Link> <span>Выдать роль</span>
            </div>

            <label htmlFor="findUser" className={ s.input_wrapper_on }>
                   <span className={s.text}> Пользователь </span> 
                    <div className={s.input_wrapper}>
                        <input onChange={(e)=>{
                          if (e.target.value === '' || e.target.value === ' ') {
                            dispatch(getUsersAdmin(activePaginatoinAdmin))
                          }else{
                            debouncedSearchAdmin(e.target.value.toLowerCase().split(' ').join(','))
                            
                            console.log('debouncedSearchAdmin', e.target.value.toLowerCase().split(' ').join(','))
                          }
                           
                        }} className={s.input} id='findUser' type="findUser" />
                        <Image src={findUser} alt='findUser' />
                    </div>

                </label>

                {usersAdminUI.map((el, ind) => <UserAdmin
                name={el.name}
                editContent={el.editContent} 
                surname={el.surname}
                phoneNumber={el.phoneNumber}
                email={el.email}
                isAdmin={el.isAdmin}
                editWebsite={el.editWebsite}
                addContent={el.addContent}
                key={ind} 
                setUserOpenOK={setUserOpen} 
                idUserOpen={idUserOpen} 
                id={el.id}
                />)}

            <div className={s.pagination_wrapper}>
                    {paginationLendthAdmin.map((el)=>{
                        return <span key={el} onClick={()=>{
                            setActivePaginatoinAdmin(el)

                        }} className={ activePaginatoinAdmin === el ?  s.item_active : s.item}>{el}</span>
                    })}
            </div>
        </div>
    </main>

        </SpinnerLayout>
    )
}

export default AdminSettings
