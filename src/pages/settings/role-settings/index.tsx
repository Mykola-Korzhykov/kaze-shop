import React from 'react'
//redux
import SpinnerLayout from '@/layouts/SpinnerLayout'
//icons
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg' 
import { NextPage } from 'next'
import Link from 'next/link'
import {UsersRole} from '../../../components/screens/Cabinet/CabinetOwner/Display/UsersRole'

const RoleSettings: NextPage = () => {

    // UserRole


    return (
        <SpinnerLayout>
            <main className='content'>
                <div className='container'> 

                    <div className='page_coordinator'>
                        <Link href='/cabinet'>.../Личный кабинет | </Link> <span>Выдать роль</span>
                    </div>

                    <UsersRole />

                </div>
            </main>
        </SpinnerLayout>
    )
}


export default RoleSettings