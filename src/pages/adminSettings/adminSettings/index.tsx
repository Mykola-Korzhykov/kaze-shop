// import Cabinet from '@/components/screens/Cabinet/Cabinet'

//redux
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/redux/store'
import s from './giveRole.module.scss'
import SpinnerLayout from '@/layouts/SpinnerLayout'


//components 

// import { wrapper } from '@/redux/store'
// import { addUserInfo } from '@/redux/slices/user'
// import { withAuth } from '@/hoc/RequiredAuth'
import { NextPage } from 'next'
import { Api } from '@/services'
import axios from 'axios'
import Image from 'next/image'
import { UserAdmin } from '@/components/screens/Cabinet/CabinetAdmin/UserAdmin/UserAdmin'



const AdminSettings: React.FC = () => {

    const Selector = useSelector

    const [idUserOpen, setUserOpen] = useState<number>(0)

    const users = Selector((state: RootState) => state.admin.users).map((el, ind) => <UserAdmin setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} key={ind} id={el.id} />)

    return (
        <SpinnerLayout>
            <main className='content'>
                <div className='container'>
                    {users}
                </div>
            </main>
        </SpinnerLayout>
    )
}

export default AdminSettings