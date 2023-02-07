import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeUserPasswordDto } from '@/types/auth'
import { destroyCookie } from 'nookies'
import { ChangeUserPasswordShema } from '@/utils/validation'
import cl from '../../styles/cabinet.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import hidenIcon from '../../assets/icons/close_eye.svg'
import showIcon from '../../assets/icons/show_eye.svg'
import FormField from '../UI/FormField'
import { Api } from '@/services'
const ChangeUserPassword = () => {
	const router = useRouter()
	const [passwordShown, setPasswordShown] = useState(false)
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [requestLoading, setRequestLoading] = useState<boolean>(false)
	const changeUserPasswordForm = useForm<ChangeUserPasswordDto>({
		mode: 'onChange',
		resolver: yupResolver(ChangeUserPasswordShema),
	})
	const onSubmit = async (dto: ChangeUserPasswordDto) => {
		try {
			setRequestLoading(true)
			console.log(dto)
			await Api().user.changePassword(dto)
			destroyCookie(null, 'accessToken')
			// dispatch(addUserInfo(data.user))
			router.push('/login')
		} catch (err) {
			setRequestLoading(false)
			console.warn('Register error', err)
			if (err.response) {
				console.warn('Register error after response', err.response.data.message)
				setErrorMessage(err.response.data.message)
			} else {
				router.push('/404')
			}
		}
	}

	const togglePasswordShown = () => {
		setPasswordShown(prev => !prev)
	}

	const toggleConfirmPasswordShown = () => {
		setConfirmPasswordShown(prev => !prev)
	}

	return (
		<FormProvider {...changeUserPasswordForm}>
			<form
				onSubmit={changeUserPasswordForm.handleSubmit(onSubmit)}
				className={cl.cabinet_tabcontent}
			>
				{/* <div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Введите пароль
					</label>
					<div className='auth_input'>
						<input
							placeholder='Введите пароль'
							type={passwordShown ? 'text' : 'password'}
							{...changeUserPasswordForm.register('password')}
						/>
						<div onClick={togglePasswordShown} className='auth_hidden-icon'>
							<Image
								src={passwordShown ? showIcon : hidenIcon}
								alt='show password icon'
								width={24}
								height={24}
							/>
						</div>
					</div>
					<span className='auth_error'>
						{changeUserPasswordForm.formState.errors.password &&
							changeUserPasswordForm.formState.errors.password.message}
					</span>
				</div> */}
				<FormField
					type='password'
					name='password'
					label='Введите пароль'
					placeholder='Введите пароль'
					isPassword={true}
				/>
				<div className={cl.cabinet_field}>
					<label className='auth_label' htmlFor='email'>
						Повторите пароль
					</label>
					<div className='auth_input'>
						<input
							placeholder='Повторите пароль'
							type={confirmPasswordShown ? 'text' : 'password'}
							{...changeUserPasswordForm.register('confirmPassword')}
						/>
						<div
							onClick={toggleConfirmPasswordShown}
							className='auth_hidden-icon'
						>
							<Image
								src={confirmPasswordShown ? showIcon : hidenIcon}
								alt='show password icon'
								width={24}
								height={24}
							/>
						</div>
					</div>
					<span className='auth_error'>
						{changeUserPasswordForm.formState.errors.confirmPassword &&
							changeUserPasswordForm.formState.errors.confirmPassword.message}
					</span>
				</div>
				<button
					disabled={requestLoading}
					className={cl.cabinet_btn}
					type='submit'
				>
					Cохранить
				</button>
				<div>
					<p className='auth_error'>{errorMessage}</p>
				</div>
			</form>
		</FormProvider>
	)
}

export default ChangeUserPassword
