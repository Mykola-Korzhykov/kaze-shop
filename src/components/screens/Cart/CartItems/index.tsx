import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { CartProduct } from '@/types/goods'
import ErrorModal from '@/components/UI/ErrorModal'
import s from './CartItems.module.scss'
import CartItem from './CartItem'
const CartItems = () => {
	const basketOfProducts = useAppSelector(state => state.goods.basketOfProducts)
	const renderGoods = (arr: CartProduct[] | []) => {
		if (arr.length === 0) {
			return (
				<ErrorModal
					title='Ваша корзина пуста'
					buttonText='Перейти в каталог'
					buttonHref='/catalog'
					description='Перейдите в каталог, чтобы купить какой то продукт'
				/>
			)
		}
		return arr?.map(product => {
			return <CartItem product={product} key={product.id} />
		})
	}
	return <div className={s.wrapper}>
		{renderGoods(basketOfProducts)}
	</div>
}
export default CartItems
