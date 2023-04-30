import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeUserInfoDto } from '@/types/auth';
import { ChangeUserInfoShema } from '@/utils/validation';
import cl from '../../../styles/cabinet2.module.scss';
import { Api } from '@/services';
import { setCookie } from 'nookies';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserInfo } from '@/redux/slices/user';
import { useRouter } from 'next/router';
import { addUserInfo } from '@/redux/slices/user';
import { setLoadingStatus } from '@/redux/slices/goods';
import { useTranslation } from 'next-i18next';
const ChangeUserInfo = () => {
	const { t: commonT } = useTranslation('common');
	const { t } = useTranslation('cabinet');
	const { t: signupT } = useTranslation('signup');
	const dispatch = useAppDispatch();
	const router = useRouter();
	const userInfo = useAppSelector(selectUserInfo);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [requestLoading, setRequestLoading] = useState<boolean>(false);

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
	});

	const onSubmit = async (dto: ChangeUserInfoDto) => {
		try {
			setRequestLoading(true);

			const data = await Api().user.changeInfo(dto);
			setCookie(null, 'accessToken', data?.accessToken, {
				expires: data?.maxAge,
				path: '/',
			});
			if (data?.user) {
				dispatch(addUserInfo(data?.user));
			} else if (data?.admin) {
				dispatch(addUserInfo(data?.admin));
			}
			setErrorMessage(t('successChangedInfo'));
			setRequestLoading(false);
			dispatch(setLoadingStatus('idle'));
		} catch (err) {
			setRequestLoading(false);
			dispatch(setLoadingStatus('error'));
			if (err?.response) {
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
		<>
			<form
				onSubmit={changeUserInfoForm.handleSubmit(onSubmit)}
				className={cl.cabinet_tabcontent}
			>
				<div className={cl.cabinet_field}>
					<label className="auth_label" htmlFor="email">
						{signupT('name')}
					</label>
					<div className="auth_input">
						<input
							placeholder={signupT('enter_name')}
							type="text"
							{...changeUserInfoForm.register('name')}
						/>
					</div>
					<span className="auth_error">
						{changeUserInfoForm.formState.errors.name &&
							signupT(changeUserInfoForm.formState.errors.name.message)}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className="auth_label" htmlFor="email">
						{signupT('surname')}
					</label>
					<div className="auth_input">
						<input
							placeholder={signupT('enter_surname')}
							type="text"
							{...changeUserInfoForm.register('surname')}
						/>
					</div>
					<span className="auth_error">
						{changeUserInfoForm.formState.errors.surname &&
							signupT(changeUserInfoForm.formState.errors.surname.message)}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className="auth_label" htmlFor="email">
						{commonT('country')}
					</label>
					<div className="auth_input">
						<input
							placeholder={signupT('enter_country')}
							type="text"
							{...changeUserInfoForm.register('country')}
						/>
					</div>
					<span className="auth_error">
						{changeUserInfoForm.formState.errors.country &&
							signupT(changeUserInfoForm.formState.errors.country.message)}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className="auth_label" htmlFor="email">
						{commonT('city')}
					</label>
					<div className="auth_input">
						<input
							placeholder={signupT('enter_city')}
							type="text"
							{...changeUserInfoForm.register('city')}
						/>
					</div>
					<span className="auth_error">
						{changeUserInfoForm.formState.errors.city &&
							signupT(changeUserInfoForm.formState.errors.city.message)}
					</span>
				</div>
				<div className={cl.cabinet_field}>
					<label className="auth_label" htmlFor="email">
						{commonT('postal_office')}
					</label>
					<div className="auth_input">
						<input
							placeholder={signupT('enter_postOffice')}
							type="text"
							{...changeUserInfoForm.register('postOffice')}
						/>
					</div>
					<span className="auth_error">
						{changeUserInfoForm.formState.errors.postOffice &&
							signupT(changeUserInfoForm.formState.errors.postOffice.message)}
					</span>
					<div>
						{errorMessage && (
							<div>
								<p className="auth_error">{errorMessage}</p>
							</div>
						)}

						<button
							disabled={requestLoading}
							className={cl.cabinet_btn}
							type="submit"
						>
							{requestLoading ? signupT('loading') : t('save')}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default ChangeUserInfo;
