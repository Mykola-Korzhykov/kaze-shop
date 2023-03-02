import React from 'react'
import ErrorModal from '@/components/UI/ErrorModal'
import s from './CartItems.module.scss'
import CartItem from './CartItem'
const CartItems = () => {
	return (
		<div className={s.wrapper}>
			<CartItem />
			<CartItem />
			<CartItem />
			{/* <ErrorModal
				title='Ваша корзина пуста'
				buttonText='Перейти в каталог'
				buttonHref='/catalog'
				description='Перейдите в каталог, чтобы купить какой то продукт'
			/> */}
		</div>
	)
}
export default CartItems
