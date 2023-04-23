import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeUserPasswordDto } from '@/types/auth';
import { destroyCookie } from 'nookies';
import { ChangeUserPasswordShema } from '@/utils/validation';
import cl from '../../../styles/cabinet2.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import hidenIcon from '../../../assets/icons/closeIcone.svg';
import showIcon from '../../../assets/icons/show_eye.svg';
import FormField from '../../UI/FormField';
import { Api } from '@/services';
import Spinner from '@/components/Spinner/Spinner';
import { useAppDispatch } from '@/redux/hooks';
import { setLoadingStatus } from '@/redux/slices/goods';
const ChangeUserPassword = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [requestLoading, setRequestLoading] = useState(false);
	const changeUserPasswordForm = useForm<ChangeUserPasswordDto>({
		mode: 'onChange',
		resolver: yupResolver(ChangeUserPasswordShema),
	});
	const onSubmit = async (dto: ChangeUserPasswordDto) => {
		try {
			dispatch(setLoadingStatus('loading'));
			setRequestLoading(true);
			await Api().user.changePassword(dto);
			destroyCookie(null, 'accessToken');
			// dispatch(addUserInfo(data.user))
			router.push('/login');
		} catch (err) {
			dispatch(setLoadingStatus('error'));
			setRequestLoading(false);
			if (err?.response) {
				setErrorMessage(err?.response?.data?.message);
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
		<>
			<FormProvider {...changeUserPasswordForm}>
				<form
					onSubmit={changeUserPasswordForm.handleSubmit(onSubmit)}
					className={cl.cabinet_tabcontent + ' ' + cl.form}
				>
					<FormField
						type="password"
						name="password"
						label="Введите пароль"
						placeholder="Введите пароль"
						isPassword={true}
						className="margin-10"
					/>
					<div className={`${cl.cabinet_field} ${cl.cabinet_field_two}`}>
						<label className="auth_label" htmlFor="email">
							Повторите пароль
						</label>
						<div className="auth_input">
							<input
								placeholder="Повторите пароль"
								type={confirmPasswordShown ? 'text' : 'password'}
								{...changeUserPasswordForm.register('confirmPassword')}
							/>
							<div
								onClick={toggleConfirmPasswordShown}
								className="auth_hidden-icon"
							>
								<Image
									src={confirmPasswordShown ? showIcon : hidenIcon}
									alt="show password icon"
									width={24}
									height={24}
								/>
							</div>
						</div>
						<span className="auth_error">
							{changeUserPasswordForm.formState.errors.confirmPassword &&
								changeUserPasswordForm.formState.errors.confirmPassword.message}
						</span>
					</div>

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
							Cохранить
						</button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default ChangeUserPassword;
