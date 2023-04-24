import React from 'react';
import s from './CartFooter.module.scss';
import { useRouter } from 'next/router';
const CartBtns = () => {
	const router = useRouter();
	const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.back();
	};
	return (
		<div className={s.btnsWrapper}>
			<button onClick={goBack} className={s.btn_goBack}>
				Назад
			</button>
			<button onClick={() => router.push('/order')} className={s.btn_confirm}>
				Оформить заказ
			</button>
		</div>
	);
};

export default CartBtns;
