import React, { FC } from 'react'
import { Api } from '@/services'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/router'
import { addUserInfo } from '@/redux/slices/user'
import Link from 'next/link'
import { setCookie } from 'nookies'
import CabinetTabs from '@/components/screens/Cabinet/CabinetTabs'
const Cabinet: FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
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
			} catch (e) {
				// router.push('/404')
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
				<CabinetTabs />
			</div>
		</main>
	)
}

export default Cabinet
