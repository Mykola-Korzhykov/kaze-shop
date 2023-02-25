import React from 'react'
import s from './CartFooter.module.scss'
const CartTotalPrice = () => {
	return (
		<div className={s.totalPriceWrapper}>
			<p>Вместе</p>
			<p>147$</p>
		</div>
	)
}

export default CartTotalPrice
