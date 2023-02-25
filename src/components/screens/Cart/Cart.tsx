import React from 'react'
import Link from 'next/link'
import CartHeader from './CartHeader'
import CartItems from './CartItems'
import CartFooter from './CartFooter'
const Cart = () => {
	return (
		<main className='content'>
			<div className='container'>
				<div className='page_coordinator'>
					<Link href='/'>Главная</Link> | <span>Корзина</span>
				</div>
				<CartHeader />
				<CartItems />
				<CartFooter />
			</div>
		</main>
	)
}

export default Cart
