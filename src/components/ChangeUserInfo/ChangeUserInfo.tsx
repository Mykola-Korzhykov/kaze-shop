import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeUserInfoDto } from '@/types/auth'
import { ChangeUserInfoShema } from '@/utils/validation'
import cl from '../../styles/cabinet.module.scss'
import { Api } from '@/services'
import { setCookie } from 'nookies'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUserInfo } from '@/redux/slices/user'
import { useRouter } from 'next/router'
import { addUserInfo } from '@/redux/slices/user'
const ChangeUserInfo = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const userInfo = useAppSelector(selectUserInfo)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [requestLoading, setRequestLoading] = useState<boolean>(false)
	const changeUserInfoForm = useForm<ChangeUserInfoDto>({
		mode: 'onChange',
		resolver: yupResolver(ChangeUserInfoShema),
		defaultValues: {
			name: userInfo?.name || '',
			surname: userInfo?.surname || '',
			country: userInfo?.country || '',
			city: userInfo?.city || '',
			postOffice: userInfo?.postOffice || '',
		},
	})

	const onSubmit = async (dto: ChangeUserInfoDto) => {
		try {
			setRequestLoading(true)
			const data = await Api().user.changeInfo(dto)
			setCookie(null, 'accessToken', data.accessToken, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			})
			if (data.user) {
				dispatch(addUserInfo(data.user))
			} else if (data.admin) {
				dispatch(addUserInfo(data.admin))
			}
			setRequestLoading(false)
		} catch (err) {
			console.warn('Register error', err)
			setRequestLoading(false)
			if (err.response) {
				console.warn('Register error after response', err.response.data.message)
				setErrorMessage(err.response.data.message)
			} else {
				router.push('/404')
			}
		}
	}

	return (
		<>
			<form
				onSubmit={changeUserInfoForm.handleSubmit(onSubmit)}
				className={cl.cabinet_tabcontent}
			>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Имя
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите имя'
							type='text'
							{...changeUserInfoForm.register('name')}
						/>
					</div>
					<span className='auth_error'>
						{changeUserInfoForm.formState.errors.name &&
							changeUserInfoForm.formState.errors.name.message}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Фамилия
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите фамилию'
							type='text'
							{...changeUserInfoForm.register('surname')}
						/>
					</div>
					<span className='auth_error'>
						{changeUserInfoForm.formState.errors.surname &&
							changeUserInfoForm.formState.errors.surname.message}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Страна
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите страну'
							type='text'
							{...changeUserInfoForm.register('country')}
						/>
					</div>
					<span className='auth_error'>
						{changeUserInfoForm.formState.errors.country &&
							changeUserInfoForm.formState.errors.country.message}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Город
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите город'
							type='text'
							{...changeUserInfoForm.register('city')}
						/>
					</div>
					<span className='auth_error'>
						{changeUserInfoForm.formState.errors.city &&
							changeUserInfoForm.formState.errors.city.message}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Отделение
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите отделение'
							type='text'
							{...changeUserInfoForm.register('postOffice')}
						/>
					</div>
					<span className='auth_error'>
						{changeUserInfoForm.formState.errors.postOffice &&
							changeUserInfoForm.formState.errors.postOffice.message}
					</span>
				</div>

				<button
					disabled={requestLoading}
					className={cl.cabinet_btn}
					type='submit'
				>
					{requestLoading ? 'Loading..' : 'Cохранить'}
				</button>
				<div>
					<p className='auth_error'>{errorMessage}</p>
				</div>
			</form>
		</>
	)
}

export default ChangeUserInfo
