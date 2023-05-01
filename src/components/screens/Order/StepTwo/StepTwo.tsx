import React, { useState } from 'react';
import s from './StepTwo.module.scss';
import ToggleChange from '../ToggleChange/ToggleChange';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input/Input';
import CheckBox from '../CheckBox/CheckBox';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import DateInput from '../DateInput/DateInput';
import Button from '../../Main/Button/Button';
import { changeStatusStepOne, changeStatusStepTwo } from '@/redux/slices/order';
import { OrderFormStepTwo, OrderFormStepTwoData } from '@/utils/validation';
import FormSpinner from '../FormSpinner/FormSpinner';
import { useRouter } from 'next/router';
import { Api } from '@/services';
import { ResponseData } from '@/types/stepTwoResData';
import { useTranslation } from 'next-i18next';

const StepTwo = () => {
	const { t } = useTranslation('order');
	const { t: commonT } = useTranslation('common');
	const { t: cartT } = useTranslation('cart');
	const { t: signupT } = useTranslation('signup');
	const [courierDeliveryActive, setCourierDeliveryActive] =
		useState<boolean>(false);
	const [anotherDate, setAnotherDate] = useState<boolean>(false);
	const [payCard, setPayCard] = useState<boolean>(false);
	const { stepOne, stepTwo } = useAppSelector((store) => store.order);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm<OrderFormStepTwoData>({
		mode: 'onBlur',
		resolver: yupResolver(OrderFormStepTwo),
	});
	const onSubmit: SubmitHandler<OrderFormStepTwoData> = async (data) => {
		dispatch(changeStatusStepTwo('loading'));

		const sanitatedDataToSend = {
			...data,
			payByCard: !data.payInCash,
			postalDelivery: !data.сourierDelivery,
		};

		delete sanitatedDataToSend.anotherDate;

		if (sanitatedDataToSend.postalDelivery) {
			delete sanitatedDataToSend.street;
			delete sanitatedDataToSend.house;
			delete sanitatedDataToSend.apartment;
		}

		if (sanitatedDataToSend.сourierDelivery) {
			delete sanitatedDataToSend.postOffice;
		}

		if (!sanitatedDataToSend.anotherDate) {
			delete sanitatedDataToSend.anotherDate;
			delete sanitatedDataToSend.sendDate;
		}

		if (!sanitatedDataToSend.comment) {
			delete sanitatedDataToSend.comment;
		}

		try {
			const payByCash = watch('payInCash');
			const response: ResponseData<typeof payByCash> =
				await Api().goods.sendFormStepTwo(sanitatedDataToSend, router.locale);

			if (payByCash) {
				router.push(
					`/order_details/${response.orderId}?token=${response.orderToken}`
				);
			}
			if (!payByCash) {
				router.push(response.paymentLink);
			}
			window.sessionStorage.clear();
		} catch (e) {
			console.log(e);
			dispatch(changeStatusStepTwo('error'));
		}
	};

	const goToStepOne = async () => {
		dispatch(changeStatusStepOne('idle'));
	};

	return (
		<AnimatePresence>
			{stepOne === 'success' && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{
						height: 'auto',
						opacity: 1,
						transition: { duration: 0.5 },
					}}
					exit={{ height: 0, opacity: 0, transition: { duration: 0.5 } }}
					onAnimationComplete={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
					className={s.step_two}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ToggleChange
							className={cn(s.mt, s.mb)}
							setActive={setCourierDeliveryActive}
							active={courierDeliveryActive}
							title={t('selectDeliveryMethod')}
							buttonOneText={t('deliveryToPostalOffice')}
							buttonTwoText={t('deliveryByCourier')}
							name="сourierDelivery"
							{...register('сourierDelivery')}
						/>
						<div className={cn(s.flex, s.mb)}>
							<Input
								placeholder={signupT('enter_country')}
								label={commonT('country')}
								name={'country'}
								{...register('country')}
								value={watch('country')}
								errorMessage={signupT(errors.country?.message)}
							/>
							<Input
								placeholder={signupT('enter_city')}
								label={commonT('city')}
								name={'city'}
								{...register('city')}
								value={watch('city')}
								errorMessage={signupT(errors.city?.message)}
							/>
						</div>
						<AnimatePresence>
							{!courierDeliveryActive && (
								<motion.div
									initial={{ height: 'auto', opacity: 1 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
								>
									<div className={s.mb}>
										<Input
											placeholder={signupT('enter_postOffice')}
											label={commonT('postal_office')}
											name={'postOffice'}
											{...register('postOffice')}
											value={watch('postOffice')}
											errorMessage={signupT(errors.postOffice?.message)}
										/>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{courierDeliveryActive && (
								<motion.div
									initial={{ height: 'auto', opacity: 1 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
								>
									<div className={s.mb}>
										<Input
											placeholder={t('enter_street')}
											label={t('street')}
											name={'street'}
											{...register('street')}
											value={watch('street')}
											errorMessage={signupT(errors.street?.message)}
										/>
									</div>
									<div className={cn(s.flex, s.mb)}>
										<Input
											placeholder={t('house')}
											label={t('enter_house')}
											name={'house'}
											{...register('house')}
											value={watch('house')}
											errorMessage={signupT(errors.house?.message)}
										/>
										<Input
											placeholder={t('enter_apartment')}
											label={t('apartment')}
											name={'apartment'}
											{...register('apartment')}
											value={watch('apartment')}
											errorMessage={signupT(errors.apartment?.message)}
										/>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<CheckBox
							title={t('iWantMyPackageToBeSentLater')}
							name={'anotherDate'}
							setCheck={setAnotherDate}
							checked={anotherDate}
							className={s.mb}
							{...register('anotherDate')}
						/>
						<AnimatePresence>
							{anotherDate && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0, margin: 0 }}
									className={s.mb}
								>
									<Controller
										control={control}
										name="sendDate"
										render={({ field: { onChange, onBlur, value } }) => (
											<DateInput
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												title={t('selectShippingDate')}
												placeholder={'dd.mm.yy'}
												errorMessage={signupT(errors.sendDate?.message)}
											/>
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<ToggleChange
							className={s.mb}
							title={t('selectPaymentMethod')}
							buttonOneText={t('cardPayment')}
							buttonTwoText={t('paymentUponReceipt')}
							name={'payInCash'}
							setActive={setPayCard}
							active={payCard}
							{...register('payInCash')}
						/>

						<div className={s.mb}>
							<Input
								label={t('orderComment')}
								placeholder={t('anythingElse')}
								name={'comment'}
								{...register('comment')}
								value={watch('comment')}
								errorMessage={signupT(errors.comment?.message)}
							/>
						</div>

						<div className={s.submit_block}>
							<Button
								onClick={goToStepOne}
								type="button"
								color="transparent"
								arrow={false}
							>
								{t('back')}
							</Button>
							<Button
								className={cn(s.submit, {
									[s.formInvalid]: !isValid,
								})}
								arrow={false}
							>
								{t('continue')}
							</Button>
						</div>
					</form>
					{stepTwo === 'loading' && <FormSpinner />}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default StepTwo;
