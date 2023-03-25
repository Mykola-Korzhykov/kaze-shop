//redux
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/redux/store'
import s from './adminSettings.module.scss'
import SpinnerLayout from '@/layouts/SpinnerLayout'
//components 
import { NextPage } from 'next'
import { Api } from '@/services'
import Link from 'next/link'
//icons 
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg'
import { UserAdmin } from '@/components/screens/Cabinet/CabinetOwner/UsersRole/UserAdmin'

import React from "react";
import { useAppDispatch } from '@/redux/hooks'
import { getUsersAdmin } from '@/redux/slices/admin'
import { UserRole } from '@/components/screens/Cabinet/CabinetOwner/UserAdmin/UserRole'



const AdminSettings: React.FC = () => {

    const usersAdminUI = useSelector((state: RootState) => state.admin.usersAdmin)
    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    const [activePaginatoinRoleAdmin, setActivePaginatoinAdmin] = React.useState<number>(1)
    const [paginationLendthAdmin, setPaginationLendthAdmin] = React.useState<any[]>([])
    // const [paginationLendthRole, setPaginationLendthRole] = React.useState<any[]>([])
    const [activePaginatoinRole, setActivePaginatoinRole] = React.useState<number>(1)

    const dispatch = useAppDispatch()

    // get users
    // React.useEffect(()=>{
    //     console.log('пошел запрос1111')
    //         dispatch(getUsersAdmin(activePaginatoinRoleAdmin))
    // }, [ activePaginatoinRoleAdmin])

    React.useEffect(()=>{

        let countAdminPagination = Math.ceil(usersAdminUI.length / 10)
        let arrAdminPagination: number[] = [];
        for(let i = 1;  i <  countAdminPagination + 1; i++){
            arrAdminPagination.push(i)
        }

        setPaginationLendthAdmin(arrAdminPagination)

    }, [usersAdminUI])


    return (
        <SpinnerLayout>


            <div className={s.wrapper}>
                {usersAdminUI.map((el, ind) => <UserRole
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
                activePaginatoinRole={activePaginatoinRole}
                />)}
            </div>


            <div className={s.pagination_wrapper}>
                    {paginationLendthAdmin.map((el)=>{
                        return <span key={el} onClick={()=>{
                            setActivePaginatoinRole(el)

                        }} className={ activePaginatoinRoleAdmin === el ?  s.item_active : s.item}>{el}</span>
                    })}
                </div>

        </SpinnerLayout>
    )
}

export default AdminSettings
