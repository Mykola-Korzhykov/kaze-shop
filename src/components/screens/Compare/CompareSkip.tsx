import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { updateCartProduct } from '@/redux/slices/goods';
import s from './Compare.module.scss';
import { useTranslation } from 'next-i18next';
const CompareSkip = () => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const dispatch = useAppDispatch();
	const skipButtonHandler = () => {
		dispatch(updateCartProduct());
		router.push('/cart');
	};
	return (
		<div className={s.skip_wrapper}>
			<button onClick={skipButtonHandler} className={s.skip}>
				{t('skip')}
			</button>
		</div>
	);
};

export default CompareSkip;
