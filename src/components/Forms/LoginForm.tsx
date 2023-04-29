import React, { useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '@/utils/validation';
import Link from 'next/link';
import { LoginDto } from '@/types/auth';
import { Api } from '@/services';
import { useAppDispatch } from '@/redux/hooks';
import { addUserInfo } from '@/redux/slices/user';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import FormField from '../UI/FormField';
import CheckBox from '../UI/CheckBox';
import { setAuthState } from '@/redux/slices/user';
import { useTranslation } from 'next-i18next';
const LoginForm = () => {
	const { t } = useTranslation('login');
	const loginForm = useForm({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	});
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [loginLoading, setLoginLoading] = useState<boolean>(false);
	const [isRemember, setIsRemember] = useState<boolean>(false);
	//if use LoginDto i have TS error((
	const onSubmit: SubmitHandler<any> = async (dto: LoginDto) => {
		try {
			setLoginLoading(true);
			const data = await Api().user.login(dto, router.locale);

			setCookie(null, 'accessToken', data?.accessToken, {
				expires: data?.maxAge,
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
		} catch (err) {
			setLoginLoading(false);
			if (err.response) {
				const text = err?.response?.data?.rawErrors?.find(
					(error: { locale: string; error: string }) =>
						error.locale === router?.locale
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
		<FormProvider {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(onSubmit)}>
				<FormField
					type="text"
					name="email"
					label="E-mail"
					placeholder={t('enter_email')}
				/>
				<FormField
					type="password"
					name="password"
					label={t('password')}
					placeholder={t('enter_password')}
					isPassword={true}
				/>
				<div className="auth_detail">
					<CheckBox
						isChecked={isRemember}
						setIsChecked={setIsRemember}
						text={t('remember_me')}
					/>
					<Link href={'/forgot'} className="auth_detail_link">
						{t('forgot_pass')}
					</Link>
				</div>
				{errorMessage && <span className="auth_error">{errorMessage}</span>}
				<button
					className="auth_btn"
					type="submit"
					disabled={loginForm.formState.isSubmitting}
				>
					{loginLoading ? t('loading') : t('sign_in')}
				</button>

				<p className="auth_more">
					<Link className="auth_link" href="/signup">
						{t('no_acc')} <span>{t('sign_up')}</span>
					</Link>
				</p>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
