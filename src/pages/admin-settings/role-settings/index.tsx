// import Cabinet from '@/components/screens/Cabinet/Cabinet'

//redux
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/redux/store'
import s from './roleSettings.module.scss'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import { UserRole } from '@/components/screens/Cabinet/CabinetAdmin/UsersRole/UserRole'

//icons 
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg'

//components 

// import { wrapper } from '@/redux/store'
// import { addUserInfo } from '@/redux/slices/user'
// import { withAuth } from '@/hoc/RequiredAuth'
import { NextPage } from 'next'
import { Api } from '@/services'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'



const GiveRole: React.FC = () => {

    const Selector = useSelector

    const [idUserOpen, setUserOpen] = useState<number>(0)

    const users = Selector((state: RootState) => state.admin.users).map((el, ind) => <UserRole setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} key={ind} id={el.id} />)

    return (
        <SpinnerLayout>
            <main className='content'>
                <div className='container'>
                    <div className='page_coordinator'>
                        <Link href='/cabinet'>.../Личный кабинет | </Link> <span>Выдать роль</span>
                    </div>

                    <label htmlFor="findUser" className={s.input_wrapper_on}>
                        Пользователь
                        <div className={s.input_wrapper}>
                            <input className={s.input} id='findUser' type="findUser" />
                            <Image src={findUser} alt='findUser' />
                        </div>

                    </label>

                    {users}
                </div>
            </main>
        </SpinnerLayout>
    )
}

export default GiveRole