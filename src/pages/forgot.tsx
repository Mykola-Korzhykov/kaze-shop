import React, { useState } from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { ForgotPasswordDto, GetCodeDto } from '@/types/auth';
import Link from 'next/link';
import {
	ForgotPasswordSchema,
	GetForgotPasswordCodeSchema,
} from '@/utils/validation';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotAuthorized } from '@/hoc/OnlyNotAuthorized';
import { Api } from '@/services';
import { useRouter } from 'next/router';
import AuthImg from '../assets/images/auth_photo.png';
import MetaHead from '@/components/MetaHead';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
const ForgotPassword: NextPage = () => {
	const { t } = useTranslation('forgot');
	const { t: commonT } = useTranslation('common');
	const { t: validationT } = useTranslation('signup');
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [loginLoading, setLoginLoading] = useState<boolean>(false);
	const [getCodeform, setGetFormCode] = useState<boolean>(false);
	const [sendCodeAgain, setSendCodeAgain] = useState<boolean>(false);
	const getForgotPasswordCodeForm = useForm<GetCodeDto>({
		mode: 'onChange',
		resolver: yupResolver(GetForgotPasswordCodeSchema),
	});
	const forgotPasswordForm = useForm<{
		code: string;
		password: string;
		confirmPassword: string;
	}>({
		mode: 'onChange',
		resolver: yupResolver(ForgotPasswordSchema),
	});
	const getPasswordCodeAgain = async () => {
		const emailValue = getForgotPasswordCodeForm.getValues('email');
		await Api().user.getForgotPasswordCode(
			{ email: emailValue },
			router.locale
		);
		setSendCodeAgain(true);
	};
	const onSubmitGetCode = async (dto: GetCodeDto) => {
		try {
			setLoginLoading(true);
			await Api().user.getForgotPasswordCode(dto, router.locale);
			setLoginLoading(false);
			setGetFormCode(true);
		} catch (err) {
			setLoginLoading(false);

			if (err?.response) {
				setErrorMessage(err?.response?.data?.message);
			} else {
				router.push('/404');
			}
		}
	};

	const onSubmitForgotPassword = async (dto: {
		code: string;
		password: string;
		confirmPassword: string;
	}) => {
		const emailValue = getForgotPasswordCodeForm.getValues('email');
		const data = { ...dto, email: emailValue };
		try {
			setLoginLoading(true);
			await Api().user.forgotPassword(data);
			router.push('/login');
			setLoginLoading(false);
		} catch (err) {
			setLoginLoading(false);

			if (err.response) {
				const text = err?.response?.data?.rawErrors?.find(
					(error: { locale: string; error: string }) =>
						error?.locale === router?.locale
				).text;
				setErrorMessage(
					err?.response?.data?.rawErrors?.length > 0
						? text
						: err?.response?.data?.message
				);
			} else {
				router.push('/404');
			}
		}
	};
	return (
		<SpinnerLayout>
			<MetaHead
				pageTitle="Forgot"
				title="Forgot Password"
				description="Forgot Password - page"
				preview="https://kaze-shop.online/previews/forgot-preview.png"
			/>
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href={'/'}> {commonT('Main')}</Link> |{' '}
						<span>{t('forgot')}</span>
					</div>
					<div className="auth_block forgot_block">
						<div className="auth_image">
							<Image
								src={AuthImg}
								alt="link to user basket"
								width={390}
								height={550}
								quality={90}
								priority={true}
							/>
						</div>
						<div className="auth_form forgot_form">
							{!getCodeform ? (
								<>
									<form
										onSubmit={getForgotPasswordCodeForm.handleSubmit(
											onSubmitGetCode
										)}
									>
										<div>
											<h3 className="auth_title">{t('forgot')}</h3>
											<div className="register_form">
												<div className="auth_field">
													<label className="auth_label" htmlFor="email">
														E-mail
													</label>
													<div className="auth_input">
														<input
															className="input_forgot"
															placeholder={validationT('enter_email')}
															type="text"
															{...getForgotPasswordCodeForm.register('email')}
														/>
													</div>
													<span className="auth_error">
														{getForgotPasswordCodeForm.formState.errors.email &&
															validationT(
																getForgotPasswordCodeForm.formState.errors.email
																	.message
															)}
													</span>
												</div>
											</div>
											{errorMessage && (
												<span className="auth_error">{errorMessage}</span>
											)}
										</div>
										<button
											className="auth_btn"
											type="submit"
											disabled={loginLoading}
										>
											{loginLoading ? t('loading') : t('reset_pass')}
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
											<h3 className="auth_title">{t('forgot')}</h3>
											<div className="register_form  w-100">
												<div className="auth_field">
													<label className="auth_label" htmlFor="email">
														E-mail
													</label>
													<div className="auth_input">
														<input
															disabled={true}
															placeholder={validationT('enter_email')}
															type="text"
															{...getForgotPasswordCodeForm.register('email')}
														/>
													</div>
													<span className="auth_error">
														{getForgotPasswordCodeForm.formState.errors.email &&
															validationT(
																getForgotPasswordCodeForm.formState.errors.email
																	.message
															)}
													</span>
												</div>
												<div className="auth_field">
													<label className="auth_label" htmlFor="email">
														{t('code')}
													</label>
													<div className="auth_input">
														<input
															placeholder={t('enter_code')}
															type="text"
															{...forgotPasswordForm.register('code')}
														/>
													</div>
													<span className="auth_error">
														{forgotPasswordForm.formState.errors.code &&
															t(
																forgotPasswordForm.formState.errors.code.message
															)}
													</span>
													<span
														style={{ cursor: 'pointer' }}
														onClick={getPasswordCodeAgain}
													>
														{sendCodeAgain
															? t('sendCheckEmail')
															: t('sendAgain')}
													</span>
												</div>
												<div className="auth_field">
													<label className="auth_label" htmlFor="email">
														{t('new_pass')}
													</label>
													<div className="auth_input">
														<input
															placeholder={validationT('enter_password')}
															type="text"
															{...forgotPasswordForm.register('password')}
														/>
													</div>
													<span className="auth_error">
														{forgotPasswordForm.formState.errors.password &&
															validationT(
																forgotPasswordForm.formState.errors.password
																	.message
															)}
													</span>
												</div>
												<div className="auth_field">
													<label className="auth_label" htmlFor="email">
														{validationT('repeat_pass')}
													</label>
													<div className="auth_input">
														<input
															placeholder={validationT('repeat_pass')}
															type="text"
															{...forgotPasswordForm.register(
																'confirmPassword'
															)}
														/>
													</div>
													<span className="auth_error">
														{forgotPasswordForm.formState.errors
															.confirmPassword &&
															validationT(
																forgotPasswordForm.formState.errors
																	.confirmPassword.message
															)}
													</span>
												</div>
											</div>
											{errorMessage && (
												<span className="auth_error">{errorMessage}</span>
											)}
										</div>
										<button
											className="auth_btn"
											type="submit"
											disabled={loginLoading}
										>
											{loginLoading ? t('loading') : t('reset_pass')}
										</button>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</SpinnerLayout>
	);
};
export const getServerSideProps = NotAuthorized(async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale,
				['common', 'forgot', 'signup'],
				require('../i18next.config')
			)),
		},
	};
});

export default ForgotPassword;
