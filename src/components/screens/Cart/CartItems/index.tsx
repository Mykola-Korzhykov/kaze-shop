import React from 'react'
import s from './Cartitems.module.scss'
import CartItem from './CartItem'
const CartItems = () => {
	return (
		<div className={s.cart_itemsWrapper}>
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
