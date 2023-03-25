import React from 'react'
//redux
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/redux/store'
import s from './roleSettings.module.scss'
import SpinnerLayout from '@/layouts/SpinnerLayout'
// import { UserRole } from '@/components/screens/Cabinet/CabinetOwner/UserAdmin/UserAdmin'

//icons
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg' 
import { NextPage } from 'next'
import { Api } from '@/services'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { findUsersRole, getUsersRole } from '@/redux/slices/admin'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '@/redux/hooks'
import { UserRole } from '@/components/screens/Cabinet/CabinetOwner/UsersRole/UserRole'

const RoleSettings: NextPage = () => {

    // UserRole

    const dispatch = useAppDispatch()
    const usersRoleUI = useSelector((state: RootState) => state.admin.usersRole)
    const [activePaginatoinRole, setActivePaginatoinRole] = React.useState<number>(1)
    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    const [paginationLendthRole, setPaginationLendthRole] = React.useState<any[]>([])

    React.useEffect(()=>{
        let countoRolePagination = Math.ceil(usersRoleUI.length / 10)
        let arrRolePagination : number[] = []
        for(let i = 1;  i <  countoRolePagination + 1; i++){
            arrRolePagination.push(i)
        }
        setPaginationLendthRole(arrRolePagination)
    }, [usersRoleUI])

    const debouncedSearchRole = debounce((term) => {
        dispatch(findUsersRole(term))
    }, 500);

    React.useEffect(()=>{

        // console.log('запыт getUsersRole')
            dispatch(getUsersRole(activePaginatoinRole))
        
    }, [activePaginatoinRole ])

    

    return (
        <SpinnerLayout>
            <main className='content'>
                <div className='container'> 

                    <div className='page_coordinator'>
                        <Link href='/cabinet'>.../Личный кабинет | </Link> <span>Выдать роль</span>
                    </div>

                    <label htmlFor="findUser" className={ s.input_wrapper_on }>
                        <span className={s.text}> Пользователь </span>
                        <div className={s.input_wrapper}>
                            <input onChange={(e)=>{
                            if (e.target.value === '' || e.target.value === ' ') {
                                dispatch(getUsersRole(activePaginatoinRole))
                            }else{
                                debouncedSearchRole(e.target.value.toLowerCase().split(' ').join(','))
                                console.log('debouncedSearchRole', e.target.value.toLowerCase().split(' ').join(','))
                            }
                        }} className={s.input} id='findUser' type="findUser" />
                            <Image src={findUser} alt='findUser' />
                        </div>
                    </label>

                    {usersRoleUI.map((el, ind)=>{
                    return <UserRole
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
                    />
                    })}

                    <div className={s.pagination_wrapper}>
                        {paginationLendthRole.map((el)=>{
                            return <span key={el} onClick={()=>{
                                setActivePaginatoinRole(el)
                                
                            }} className={ activePaginatoinRole === el ?  s.item_active : s.item}>{el}</span>
                        })}
                    </div> 

                </div>
            </main>
        </SpinnerLayout>
    )
}


export default RoleSettings