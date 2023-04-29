import React from 'react';
import s from './CartFooter.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'next-i18next';
const CartTotalPrice = () => {
	const { t } = useTranslation('cart');
	const basketOfProducts = useAppSelector(
		(state) => state.goods.basketOfProducts
	);
	return (
		<div className={s.totalPriceWrapper}>
			<p>{t('together')}</p>
			<p>{basketOfProducts?.totalPrice}</p>
		</div>
	);
};

export default CartTotalPrice;
