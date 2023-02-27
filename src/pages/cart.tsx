import React from 'react'
import { NextPage } from 'next'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import Cart from '@/components/screens/Cart'
const CartPage: NextPage = (props) => {
	
	return (
		<SpinnerLayout>
			<Cart />
		</SpinnerLayout>
	)
}

export default CartPage
