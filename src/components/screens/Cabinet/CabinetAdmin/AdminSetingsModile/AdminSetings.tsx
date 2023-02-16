import React, { FC } from 'react'
import { Api } from '@/services'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/router'
import { addUserInfo } from '@/redux/slices/user'
import Link from 'next/link'
import { setCookie } from 'nookies'
import CabinetTabs from '@/components/screens/Cabinet/CabinetTabs'
//

const AdminSetingsMobile: FC = () => {

    return (
        <main className='content'>
            <div className='container'>

            </div>
        </main>
    )
}

export default AdminSetingsMobile