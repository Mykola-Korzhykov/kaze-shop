import React from 'react'
import s from './Cart.module.scss'
const CartHeader = () => {
	return (
		<div className={s.cart_header}>
			<p className={s.cart_headerText}>Продукт</p>
			<p className={s.cart_headerText}>Ціна</p>
		</div>
	)
}

export default CartHeader
