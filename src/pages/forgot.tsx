import React, { useState } from 'react'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import { ForgotPasswordDto, GetCodeDto } from '@/types/auth'
import Link from 'next/link'
import {
	ForgotPasswordSchema,
	GetForgotPasswordCodeSchema,
} from '@/utils/validation'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'
import { NotAuthorized } from '@/hoc/OnlyNotAuthorized'
import { Api } from '@/services'
import { useRouter } from 'next/router'
import AuthImg from '../assets/images/auth_photo.png'
const ForgotPassword:NextPage = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [loginLoading, setLoginLoading] = useState<boolean>(false)
	const [getCodeform, setGetFormCode] = useState<boolean>(false)
	const getForgotPasswordCodeForm = useForm<GetCodeDto>({
		mode: 'onChange',
		resolver: yupResolver(GetForgotPasswordCodeSchema),
	})
	const forgotPasswordForm = useForm<{
		code: string
		password: string
		confirmPassword: string
	}>({
		mode: 'onChange',
		resolver: yupResolver(ForgotPasswordSchema),
	})
	const getPasswordCodeAgain = async () => {
		const emailValue = getForgotPasswordCodeForm.getValues('email')
		await Api().user.getForgotPasswordCode({ email: emailValue })
	}
	const onSubmitGetCode = async (dto: GetCodeDto) => {
		try {
			setLoginLoading(true)
			await Api().user.getForgotPasswordCode(dto)
			setLoginLoading(false)
			setGetFormCode(true)
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

	const onSubmitForgotPassword = async (dto: {
		code: string
		password: string
		confirmPassword: string
	}) => {
		const emailValue = getForgotPasswordCodeForm.getValues('email')
		const data = { ...dto, email: emailValue }
		try {
			setLoginLoading(true)
			await Api().user.forgotPassword(data)
			router.push('/login')
			setLoginLoading(false)
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
		<SpinnerLayout>
			<main className='content'>
				<div className='container'>
					<div className='page_coordinator'>
						<Link href={'/'}> Главная</Link> |{' '}
						<span>Забыли пароль</span>
					</div>
					<div className='auth_block forgot_block'>
						<div className='auth_image'>
							<Image
								src={AuthImg}
								alt='link to user basket'
								width={390}
								height={550}
								quality={90}
								priority={true}
							/>
						</div>
						<div className='auth_form forgot_form'>
							{!getCodeform ? (
								<>
								<form
									onSubmit={getForgotPasswordCodeForm.handleSubmit(
										onSubmitGetCode
									)}
								>
									<div>
									<h3 className='auth_title'>Забыли пароль</h3>
									<div className='register_form'>
										<div className='auth_field'>
											<label className='auth_label' htmlFor='email'>
												E-mail
											</label>
											<div className='auth_input'>
												<input
													placeholder='Введите e-mail'
													type='text'
													{...getForgotPasswordCodeForm.register('email')}
												/>
											</div>
											<span className='auth_error'>
												{getForgotPasswordCodeForm.formState.errors.email &&
													getForgotPasswordCodeForm.formState.errors.email
														.message}
											</span>
										</div>
									</div>
									{errorMessage && (
										<span className='auth_error'>{errorMessage}</span>
									)}
									</div>
									<button
										className='auth_btn'
										type='submit'
										disabled={loginLoading}
									>
									{loginLoading ? 'Loading...' : 'Восстановить пароль'}
								</button>
								</form>
								</>
							) : (
								<>
								<form
									onSubmit={forgotPasswordForm.handleSubmit(
										onSubmitForgotPassword
									)}
								>
									<div>
									<h3 className='auth_title'>Забыли пароль</h3>
										<div className='register_form  w-100'>
											<div className='auth_field'>
												<label className='auth_label' htmlFor='email'>
													E-mail
												</label>
												<div className='auth_input'>
													<input
														disabled={true}
														placeholder='Введите e-mail'
														type='text'
														{...getForgotPasswordCodeForm.register('email')}
													/>
												</div>
												<span className='auth_error'>
													{getForgotPasswordCodeForm.formState.errors.email &&
														getForgotPasswordCodeForm.formState.errors.email
															.message}
												</span>
											</div>
											<div className='auth_field'>
												<label className='auth_label' htmlFor='email'>
													8-ти значный код
												</label>
												<div className='auth_input'>
													<input
														placeholder='Введите 8-ти значный код'
														type='text'
														{...forgotPasswordForm.register('code')}
													/>
												</div>
												<span className='auth_error'>
													{forgotPasswordForm.formState.errors.code &&
														forgotPasswordForm.formState.errors.code.message}
												</span>
												<span onClick={getPasswordCodeAgain}>Не получили код? Отправить еще раз</span>
											</div>
											<div className='auth_field'>
												<label className='auth_label' htmlFor='email'>
													Придумайте пароль
												</label>
												<div className='auth_input'>
													<input
														placeholder='Введите пароль'
														type='text'
														{...forgotPasswordForm.register('password')}
													/>
												</div>
												<span className='auth_error'>
													{forgotPasswordForm.formState.errors.password &&
														forgotPasswordForm.formState.errors.password.message}
												</span>
											</div>
											<div className='auth_field'>
												<label className='auth_label' htmlFor='email'>
													Повторите пароль
												</label>
												<div className='auth_input'>
													<input
														placeholder='Повторите пароль'
														type='text'
														{...forgotPasswordForm.register('confirmPassword')}
													/>
												</div>
												<span className='auth_error'>
													{forgotPasswordForm.formState.errors.confirmPassword &&
														forgotPasswordForm.formState.errors.confirmPassword
															.message}
												</span>
											</div>
										</div>
										{errorMessage && (
											<span className='auth_error'>{errorMessage}</span>
										)}
									</div>
									<button
										className='auth_btn'
										type='submit'
										disabled={loginLoading}>
										{loginLoading ? 'Loading...' : 'Восстановить пароль'}
									</button>
							</form>
							</>
							)}
						</div>
					</div>
				</div>
			</main>
		</SpinnerLayout>
	)
}
export const getServerSideProps = NotAuthorized(async context => {
	return { props: {} }
})

export default ForgotPassword
