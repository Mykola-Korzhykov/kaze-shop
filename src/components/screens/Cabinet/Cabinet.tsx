import React, { FC } from 'react'
import { Api } from '@/services'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { addUserInfo } from '@/redux/slices/user'
import Link from 'next/link'
import { setCookie } from 'nookies'
import CabinetTabs from '@/components/screens/Cabinet/CabinetTabs'
//
import { CabinetAdmin } from './CabinetAdmin/CabinetOwner'

const Cabinet: FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const user = useSelector((state: RootState) => state.user)

	console.log('user', user)
	React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe()
				setCookie(null, 'accessToken', data.accessToken, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
				if (data.user) {
					dispatch(addUserInfo(data.user))
				}
				if (data.admin) {
					dispatch(addUserInfo(data.admin))
				}
				if (data.owner) {
					dispatch(addUserInfo(data.owner))
				}
			} catch (e) {
				//router.push('/404')
				console.log(e)
			}
		}

		fetchUserData()
	}, [dispatch])
	return (
		<main className='content'>
			<div className='container'>
				<div className='page_coordinator'>
					<Link href='#'>Главная</Link> | <span>Личный кабинет</span>
				</div>

			 	{/* {user && user.user?.type === 'USER'  ? <CabinetTabs /> : ''}
				{user?.user?.type === 'OWNER' && <CabinetAdmin />}
				{user?.user?.type === 'ADMIN' && <CabinetAdmin />}  */}
   
				<CabinetAdmin />
			</div>
		</main>
	)
}

export default Cabinet
