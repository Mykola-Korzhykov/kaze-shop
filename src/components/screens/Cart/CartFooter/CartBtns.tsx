import React from 'react';
import s from './CartFooter.module.scss';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
const CartBtns = () => {
	const { t } = useTranslation('cart');

	const router = useRouter();
	const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.back();
	};
	return (
		<div className={s.btnsWrapper}>
			<button onClick={goBack} className={s.btn_goBack}>
				{t('back')}
			</button>
			<button onClick={() => router.push('/order')} className={s.btn_confirm}>
				{t('place_order')}
			</button>
		</div>
	);
};

export default CartBtns;
