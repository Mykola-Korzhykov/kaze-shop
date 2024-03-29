import React, { useState } from 'react';
import { LoadStatus } from '@/types/product';
import s from './StepOne.module.scss';
import Input from '../Input/Input';
import InputPhone from '../InputPhone/InputPhone';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../../Main/Button/Button';
import FormSpinner from '../FormSpinner/FormSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { StepOneProps } from './StepOne.interface';
import cn from 'classnames';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderFormStepOne, OrderFormStepOneData } from '@/utils/validation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeStatusStepOne } from '@/redux/slices/order';
import { Api } from '@/services';
import { trimPhoneNumber } from '@/utils/trimPhoneNumber';
import { useTranslation } from 'next-i18next';

const StepOne = ({ className, ...props }: StepOneProps): JSX.Element => {
	const { t } = useTranslation('order');

	const { t: signupT } = useTranslation('signup');

	const [otherPerson, setOtherPerson] = useState<boolean>(false);
	const status = useAppSelector((store) => store.order.stepOne);
	const cardId = useAppSelector((store) => store.order.cardId);
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm<OrderFormStepOneData>({
		mode: 'onBlur',
		resolver: yupResolver(OrderFormStepOne),
		defaultValues: {
			userPhoneNumber: '',
			otherPersonPhoneNumber: '',
		},
	});

	const onSubmit: SubmitHandler<OrderFormStepOneData> = async (data) => {
		dispatch(changeStatusStepOne('loading'));
		const sanitatedDataToSend = {
			...data,
			userPhoneNumber: trimPhoneNumber(data.userPhoneNumber),
			otherPersonPhoneNumber: trimPhoneNumber(data.otherPersonPhoneNumber),
		};
		if (!sanitatedDataToSend.otherPerson) {
			delete sanitatedDataToSend.otherPersonPhoneNumber;
			delete sanitatedDataToSend.otherPersonSurname;
			delete sanitatedDataToSend.otherPersonName;
		}

		try {
			const res: { orderId: number } = await Api().goods.sendFormStepOne(
				cardId,
				sanitatedDataToSend
			);

			window.sessionStorage.setItem('userEmail', data.userEmail);
			window.sessionStorage.setItem('orderId', res.orderId.toString());

			dispatch(changeStatusStepOne('success'));
		} catch (e) {
			console.log(e);
			dispatch(changeStatusStepOne('error'));
		}
	};

	return (
		<div className={cn(s.step_one, className)} {...props}>
			<AnimatePresence>
				{['idle', 'loading', 'error'].includes(status) && (
					<motion.form
						key={'step_one'}
						initial={{ height: 'auto', opacity: 1 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0, transition: { duration: 0.5 } }}
						onAnimationComplete={() =>
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={s.name}>
							<Input
								placeholder={signupT('enter_name')}
								label={signupT('name')}
								name="userName"
								{...register('userName')}
								value={watch('userName')}
								errorMessage={signupT(errors.userName?.message)}
							/>
							<Input
								placeholder={signupT('enter_surname')}
								label={signupT('surname')}
								name="userSurname"
								{...register('userSurname')}
								value={watch('userSurname')}
								errorMessage={signupT(errors.userSurname?.message)}
							/>
						</div>
						<div className={s.contacts}>
							<Controller
								control={control}
								name={'userPhoneNumber'}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<InputPhone
										placeholder="+38 (---) --- -- --"
										label={signupT('phone')}
										country={['ua', 'rs']}
										masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={'userPhoneNumber'}
										ref={ref}
										errorMessage={signupT(errors.userPhoneNumber?.message)}
									/>
								)}
							/>

							<Input
								placeholder="kazesport@gmail.com"
								label="E-mail"
								name="userEmail"
								{...register('userEmail')}
								value={watch('userEmail')}
								errorMessage={signupT(errors.userEmail?.message)}
							/>
						</div>

						<CheckBox
							checkView="checked"
							title={t('recipientIsSomeoneElse')}
							setCheck={setOtherPerson}
							name="otherPerson"
							checked={otherPerson}
							{...register('otherPerson')}
						/>

						<AnimatePresence>
							{otherPerson && (
								<motion.div
									initial={{ opacity: 0, height: '0', marginTop: 0 }}
									animate={{
										opacity: 1,
										height: 'auto',
										marginTop: 30,
										transition: { duration: 0.5 },
									}}
									exit={{ opacity: 0, height: '0', marginTop: 0 }}
									className={s.another_block}
								>
									<Input
										placeholder={signupT('enter_name')}
										label={signupT('name')}
										name="otherPersonName"
										className={s.another_name}
										{...register('otherPersonName')}
										value={watch('otherPersonName')}
										errorMessage={signupT(errors.otherPersonName?.message)}
									/>

									<Input
										placeholder={signupT('enter_surname')}
										label={signupT('surname')}
										name="otherPersonSurname"
										className={s.another_surname}
										{...register('otherPersonSurname')}
										value={watch('otherPersonSurname')}
										errorMessage={signupT(errors.otherPersonSurname?.message)}
									/>

									<Controller
										control={control}
										name={'otherPersonPhoneNumber'}
										render={({ field }) => (
											<InputPhone
												placeholder="+38 (---)--- -- --"
												label={signupT('phone')}
												country={['ua', 'rs']}
												masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
												className={s.another_contacts}
												{...field}
												errorMessage={signupT(
													errors.otherPersonPhoneNumber?.message
												)}
											/>
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<Button
							className={cn(s.submit, {
								[s.formInvalid]: !isValid,
							})}
							type="submit"
							arrow={false}
						>
							{t('continue')}
						</Button>
						{status === 'loading' && <FormSpinner />}
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	);
};

export default StepOne;
