import React from 'react'
import s from './CartItems.module.scss'
import CartItem from './CartItem'
const CartItems = () => {
	return (
		<div className={s.wrapper}>
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
		</div>
	)
}
export default CartItems
