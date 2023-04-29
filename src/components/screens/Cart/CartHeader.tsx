import React from 'react';
import s from './Cart.module.scss';
import { useTranslation } from 'next-i18next';
const CartHeader = () => {
	const { t } = useTranslation('cart');
	return (
		<div className={s.cart_header}>
			<p className={s.cart_headerText}>{t('product')}</p>
			<p className={s.cart_headerText}>{t('price')}</p>
		</div>
	);
};

export default CartHeader;
