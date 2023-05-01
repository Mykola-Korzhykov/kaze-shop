import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserDto } from '@/types/auth';
import { NotAuthorized } from '@/hoc/OnlyNotAuthorized';
import { RegisterFormSchema } from '@/utils/validation';
import { setCookie } from 'nookies';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import Image from 'next/image';
import AuthImg from '../assets/images/auth_photo.png';
import closeIcone from '../assets/icons/closeIcone.svg';
import showIcon from '../assets/icons/show_eye.svg';
import { useRouter } from 'next/router';
import { Api } from '@/services';
import { addUserInfo } from '@/redux/slices/user';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { NextPage } from 'next';
import CheckBox from '@/components/UI/CheckBox';
import MetaHead from '@/components/MetaHead';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { setAuthState } from '@/redux/slices/user';
import { useTranslation } from 'next-i18next';
const Signup: NextPage = () => {
	const router = useRouter();
	const { t } = useTranslation('signup');
	const { t: commonT } = useTranslation('common');
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
	const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
	const [phoneNumberError, setPhoneNumberError] = useState<string>('');
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
	const [privacyPolicyState, setPrivacyPolicyState] = useState<boolean>(false);
	const signupForm = useForm<CreateUserDto>({
		mode: 'onSubmit',
		resolver: yupResolver(RegisterFormSchema),
	});

	const [initialTop, setInitialTop] = useState(0);
	const [isStickyImage, setIsStickyImage] = useState<boolean>(false);

	const imageRef = useRef(null);
	const coordRef = useRef(null);

	const handleScroll = () => {
		const imageRect = imageRef?.current?.getBoundingClientRect();
		const shouldBeSticky = imageRect?.top <= 80 && window.pageYOffset > 100;

		setIsStickyImage(shouldBeSticky);
	};

	useEffect(() => {
		setInitialTop(imageRef.current.offsetTop);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handlePhoneNumberValue = (value: string) => {
		setPhoneNumberValue(value);
	};

	const onSubmit = async (dto: CreateUserDto) => {
		const registrationData = {
			...dto,
			phoneNumber: phoneNumberValue,
		};
		try {
			if (!phoneNumberError) {
				setPhoneNumberError('');
				setSignUpLoading(true);
				const data = await Api().user.registration(
					registrationData,
					router.locale
				);

				setCookie(null, 'accessToken', data?.accessToken, {
					maxAge: data?.maxAge,
					path: '/',
				});
				dispatch(setAuthState(!!data?.accessToken));
				if (data?.user) {
					dispatch(addUserInfo(data?.user));
				}
				if (data?.owner) {
					dispatch(addUserInfo(data?.owner));
				}
				if (data?.admin) {
					dispatch(addUserInfo(data?.admin));
				}

				router.push('/cabinet');
			}
		} catch (err) {
			setSignUpLoading(false);

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
	const togglePasswordShown = () => {
		setPasswordShown((prev) => !prev);
	};

	const toggleConfirmPasswordShown = () => {
		setConfirmPasswordShown((prev) => !prev);
	};

	return (
		<SpinnerLayout>
			<MetaHead
				pageTitle="Sign Up"
				title="Sign Up"
				description="Sign Up - page"
				preview="https://kaze-shop.online/previews/signup-preview.png"
			/>
			<main className="content">
				<div className="container">
					<div className="page_coordinator" ref={coordRef}>
						<Link href={'/'}>{commonT('Main')}</Link> |{' '}
						<span>{t('registration')}</span>
					</div>
					<div className="auth_block reg_block">
						<div className="auth_image none">
							<Image
								src={AuthImg}
								alt="link to user basket"
								width={390}
								height={550}
								quality={90}
								priority={true}
								ref={imageRef}
								style={{
									position: isStickyImage ? 'fixed' : 'relative',
									top: isStickyImage ? 0 : '',
									left: isStickyImage ? coordRef.current.offsetLeft : '',
									zIndex: 1,
									paddingTop: isStickyImage ? 80 : 0,
									height: isStickyImage ? 550 + 80 : 550,
								}}
							/>
						</div>
						<div
							className={`auth_form reg_form ${
								isStickyImage ? 'sticky_form' : ''
							}`}
						>
							<h3 className="auth_title">{t('registration')}</h3>
							<form onSubmit={signupForm.handleSubmit(onSubmit)}>
								<div className="register_form">
									<div className="auth_field">
										<label className="auth_label" htmlFor="name">
											{t('name')}
										</label>
										<div className="auth_input">
											<input
												placeholder={t('enter_name')}
												type="text"
												{...signupForm.register('name')}
											/>
										</div>
										<span className="auth_error">
											{signupForm.formState.errors.name &&
												t(signupForm.formState.errors.name.message)}
										</span>
									</div>
									<div className="auth_field">
										<label className="auth_label" htmlFor="surname">
											{t('surname')}
										</label>
										<div className="auth_input">
											<input
												placeholder={t('enter_surname')}
												type="text"
												{...signupForm.register('surname')}
											/>
										</div>
										<span className="auth_error">
											{signupForm.formState.errors.surname &&
												t(signupForm.formState.errors.surname.message)}
										</span>
									</div>

									<div className="auth_field">
										<label className="auth_label" htmlFor="email">
											E-mail
										</label>
										<div className="auth_input">
											<input
												placeholder={t('enter_email')}
												type="text"
												{...signupForm.register('email')}
											/>
										</div>
										<span className="auth_error">
											{signupForm.formState.errors.email &&
												t(signupForm.formState.errors.email.message)}
										</span>
									</div>
									<div className="auth_field">
										<label className="auth_label" htmlFor="phoneNumber">
											{t('phone')}
										</label>

										<PhoneInput
											specialLabel={''}
											autocompleteSearch={false}
											country={'ua'}
											onlyCountries={['ua', 'rs']}
											value={phoneNumberValue}
											onChange={(phone) => handlePhoneNumberValue(phone)}
											containerClass={'auth_input'}
											inputClass={'auth_phoneInput'}
											dropdownClass={'auth_dropdown'}
											inputProps={{
												name: 'phoneNumber',
												required: true,
											}}
											isValid={(value: string, country: any) => {
												const ukrainianRegex = /^380\d{9}$/;
												const serbianRegex = /^381\d{10,12}$/;
												if (
													country.name === 'Ukraine' &&
													!value.match(ukrainianRegex)
												) {
													setPhoneNumberError(t('invalid_phone'));
												} else if (
													country.name === 'Serbia' &&
													!value.match(serbianRegex)
												) {
													setPhoneNumberError(t('invalid_phone'));
													return false;
												} else {
													setPhoneNumberError('');
													return true;
												}
											}}
										/>
										<span className="auth_error">
											{phoneNumberError && phoneNumberError}
										</span>
									</div>
									<div className="auth_field">
										<label className="auth_label" htmlFor="password">
											{t('password')}
										</label>
										<div className="auth_input">
											<input
												placeholder={t('enter_password')}
												type={passwordShown ? 'text' : 'password'}
												{...signupForm.register('password')}
											/>
											<div
												onClick={togglePasswordShown}
												className="auth_hidden-icon"
											>
												<Image
													src={passwordShown ? showIcon : closeIcone}
													alt="show password icon"
													width={24}
													height={24}
												/>
											</div>
										</div>
										<span className="auth_error">
											{signupForm.formState.errors.password &&
												t(signupForm.formState.errors.password.message)}
										</span>
									</div>
									<div className="auth_field">
										<label className="auth_label" htmlFor="confirmPassword">
											{t('repeat_pass')}
										</label>
										<div className="auth_input">
											<input
												placeholder={t('repeat_pass')}
												type={confirmPasswordShown ? 'text' : 'password'}
												{...signupForm.register('confirmPassword')}
											/>
											<div
												onClick={toggleConfirmPasswordShown}
												className="auth_hidden-icon"
											>
												<Image
													src={confirmPasswordShown ? showIcon : closeIcone}
													alt="show password icon"
													width={24}
													height={24}
												/>
											</div>
										</div>
										<span className="auth_error">
											{signupForm.formState.errors.confirmPassword &&
												t(signupForm.formState.errors.confirmPassword.message)}
										</span>
									</div>
								</div>
								<CheckBox
									isChecked={privacyPolicyState}
									setIsChecked={setPrivacyPolicyState}
									text={t('privacy_policy')}
									linkText={t('privacy_link')}
									linkUrl="https://docs.google.com/document/d/1tHo2_05AP3DrhMG3_jjheWCNUKqCD8tMv7EKd_AYTFg/edit"
									customClass="privacy_checkbox"
								/>
								{errorMessage && (
									<span className="auth_error">{errorMessage}</span>
								)}
								<button
									disabled={!privacyPolicyState || !!signUpLoading}
									className="auth_btn w-93"
									type="submit"
								>
									{signUpLoading ? t('loading') : t('sign_up')}
								</button>
								<p className="auth_more">
									<Link className="auth_link" href="/login">
										{t('haveAcc')}
										<span>{t('sign_in')}</span>
									</Link>
								</p>
							</form>
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
				['common', 'signup'],
				require('../../i18next.config')
			)),
		},
	};
});
export default Signup;
