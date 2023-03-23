import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { CartProductItem } from '@/types/goods'
import ErrorModal from '@/components/UI/ErrorModal'
import s from './CartItems.module.scss'
import CartItem from './CartItem'
const CartItems = () => {
	const basketOfProducts = useAppSelector(state => state.goods.basketOfProducts)
	const renderGoods = (arr: CartProductItem[] | []) => {
		if (arr?.length === 0) {
			return (
				<ErrorModal
					title='Ваша корзина пуста'
					buttonText='Перейти в каталог'
					buttonHref='/catalog'
					description='Перейдите в каталог, чтобы купить какой то продукт'
					fontSize={56}
				/>
			)
		}
		return arr?.map(product => {
			return <CartItem product={product} key={product.id} />
		})
	}
	return <div className={s.wrapper}>
		{renderGoods(basketOfProducts?.cartProducts)}
	</div>
}
export default CartItems
