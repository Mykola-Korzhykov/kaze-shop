import React, { useState } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from '@/utils/validation'
import Link from 'next/link'
import { LoginDto } from '@/types/auth'
import { Api } from '@/services'
import { useAppDispatch } from '@/redux/hooks'
import { addUserInfo } from '@/redux/slices/user'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import FormField from '../UI/FormField'
import CheckBox from '../UI/CheckBox'
const LoginForm = () => {
	const loginForm = useForm({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	})
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [loginLoading, setLoginLoading] = useState<boolean>(false)
	const [isRemember, setIsRemember] = useState<boolean>(false)
	//if use LoginDto i have TS error((
	const onSubmit: SubmitHandler<any> = async (dto: LoginDto) => {
		try {
			setLoginLoading(true)
			const data = await Api().user.login(dto)
			setCookie(null, 'accessToken', data.accessToken, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			})
			if (data.user) {
				dispatch(addUserInfo(data.user))
			}
			router.push('/cabinet')
		} catch (err) {
			setLoginLoading(false)
			console.warn('Register error', err)
			if (err.response) {
				console.warn('Register error after response', err.response.data.message)
				setErrorMessage(err.response.data.message)
			} else {
				router.push('/404')
			}
		}
	}

	return (
		<FormProvider {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(onSubmit)}>
				<FormField
					type='text'
					name='email'
					label='E-mail'
					placeholder='Введите e-mail'
				/>
				<FormField
					type='password'
					name='password'
					label='Пароль'
					placeholder='Введите пароль'
					isPassword={true}
				/>
				<div className='auth_detail'>
					<CheckBox isChecked={isRemember} setIsChecked={setIsRemember} text="Запомнить меня" />
					<Link href={'/forgot'} className='auth_detail_link'>
						Забыл пароль
					</Link>
				</div>
				{errorMessage && <span className='auth_error'>{errorMessage}</span>}
				<button
					className='auth_btn'
					type='submit'
					disabled={loginForm.formState.isSubmitting}
				>
					{loginLoading ? 'Loading...' : 'Войти'}
				</button>

				<p className='auth_more'>
					<Link className='auth_link' href='/signup'>
						Все еще нет аккаунта? <span>Зарегистрироваться</span>
					</Link>
				</p>
			</form>
		</FormProvider>
	)
}

export default LoginForm
