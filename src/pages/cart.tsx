import React from 'react'
import { NextPage } from 'next'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import Cart from '@/components/screens/Cart/Cart'
const CartPage: NextPage = () => {
	return (
		<SpinnerLayout>
			<Cart />
		</SpinnerLayout>
	)
}

export default CartPage
