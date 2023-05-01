import React, { useEffect } from 'react';
import s from './Order.module.scss';
import RoutesPath from '../Product/RoutesPath/RoutesPath';
import StepOne from './StepOne/StepOne';
import CartBlock from './CartBlock/CartBlock';
import StepTitle from './StepTitle/OrderStep';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import StepTwo from './StepTwo/StepTwo';
import { orderInit } from '@/redux/slices/order';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Order = (): JSX.Element => {
	const { t } = useTranslation('order');
	const { t: commonT } = useTranslation('common');
	const { t: cartT } = useTranslation('cart');

	const path = [
		{ path: commonT('Main'), href: '/' },
		{ path: cartT('cart'), href: '/cart' },
		{ path: t('orderPlacement'), href: '/test' },
	];

	const { stepOne, stepTwo } = useAppSelector((store) => store.order);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(orderInit());
	}, []);

	return (
		<div className={s.order}>
			<div className="container">
				<RoutesPath categories={path} className={s.path} />
				<div className={s.form_block}>
					<div className={s.step}>
						<StepTitle
							step={1}
							title={t('contactInformation')}
							active={stepOne !== 'success'}
							className={s.step_one_title}
						/>
						<StepOne />
						<StepTitle
							step={2}
							title={t('deliveryAndPayment')}
							active={stepOne === 'success'}
							className={s.step_two_title}
						/>
						<StepTwo />
					</div>
					<CartBlock className={s.cart} />
				</div>
			</div>
			<AnimatePresence>
				{[stepOne, stepTwo].includes('error') && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<ErrorMessage closeError={() => dispatch(orderInit())} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Order;
