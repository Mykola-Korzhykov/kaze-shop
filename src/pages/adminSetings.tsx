import Cabinet from '@/components/screens/Cabinet/Cabinet'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import { wrapper } from '@/redux/store'
import { addUserInfo } from '@/redux/slices/user'
import { withAuth } from '@/hoc/RequiredAuth'
import { NextPage } from 'next'
import { Api } from '@/services'
import axios from 'axios'
import AdminSetings from '@/components/screens/Cabinet/CabinetAdmin/AdminSetingsModile/AdminSetings'


const adminSetings: NextPage = () => {
    return (
        <SpinnerLayout>
            <AdminSetings />
        </SpinnerLayout>
    )
}

export default adminSetings