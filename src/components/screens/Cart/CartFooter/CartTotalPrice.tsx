import React from 'react'
import s from './CartFooter.module.scss'
import { useAppSelector } from '@/redux/hooks'
const CartTotalPrice = () => {
	const basketOfProducts = useAppSelector(state => state.goods.basketOfProducts)
	return (
		<div className={s.totalPriceWrapper}>
			<p>Вместе</p>
			<p>{basketOfProducts?.totalPrice}</p>
		</div>
	)
}

export default CartTotalPrice
