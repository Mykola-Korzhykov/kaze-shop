import React, { FC, useState } from 'react'
import cl from './LogoutModal.module.scss'
import { Api } from '@/services'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
const LogoutModal: FC<{ closeModal: (tab: number) => void }> = ({
	closeModal,
}) => {
	const [requestLoading, setRequestLoading] = useState<boolean>(false)
	const router = useRouter()
	const closeModalFunc = () => {
		closeModal(1)
	}
	const logout = async () => {
		try {
			setRequestLoading(true)
			await Api().user.logout()
			destroyCookie(null, 'accessToken')
			router.push('/login')
		} catch (e) {
			setRequestLoading(false)
			router.push('/404')
		}
	}
	return (
		<div className={cl.modal}>
			<div className={cl.modal_body}>
				<h1 className={cl.modal_title}>Вы действительно хотите выйти?</h1>
				<p className={cl.modal_descr}>
					Нажмите на кнопку выйти, чтобы подтвердить действие
				</p>
				<div className={cl.modal_btns}>
					<button
						disabled={requestLoading}
						onClick={closeModalFunc}
						className={cl.modal_cancel}
					>
						Отмена
					</button>
					<button
						disabled={requestLoading}
						onClick={logout}
						className={cl.modal_confirm}
					>
						{requestLoading ? 'Loading' : 'Выйти'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default LogoutModal
