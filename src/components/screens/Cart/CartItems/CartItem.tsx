import React, { FC } from 'react'
import Image from 'next/image'
import s from './CartItems.module.scss'
import cartImage from '../../../../assets/images/cartItem.png'
import { useAppDispatch } from '@/redux/hooks'
import { CartProductItem } from '@/types/goods'
import {
	addProductToCart,
	deleteCartProduct,
	getCartProducts,
} from '@/redux/slices/goods'
const CartItem: FC<{ product?: CartProductItem }> = ({ product }) => {
	const dispatch = useAppDispatch()
	const addProductHandler = () => {
		dispatch(
			addProductToCart({
				id: product?.productId,
				imageUrl: product?.imageUrl,
				colourId: product?.colourId,
				size: product?.size,
			})
		)
		// dispatch(getCartProducts())
	}
	const minusProductHandler = () => {
		dispatch(deleteCartProduct(product?.id))
		// dispatch(getCartProducts())
	}
	return (
		<div className={s.block}>
			<div className={s.imgWrapper}>
				<Image
					src={product?.imageUrl ?? cartImage}
					width={94}
					height={153}
					alt='Cart image'
					className={s.img}
					priority={true}
					quality={95}
				/>
			</div>
			<div className={s.content}>
				<div className={s.text}>
					<p className={s.title}>{product?.title?.ua}</p>
					<p className={s.descr}>{product?.description?.ua}</p>
					<div className={s.size}>
						<div className={s.checkbox}>
							<p style={{ backgroundColor: product?.colour?.hex }}></p>
						</div>
						<p className={s.format}>
							Размер - <span>{product?.size}</span>
						</p>
					</div>
				</div>
				<div className={s.addition}>
					<button
						className={
							product?.quantity === 1
								? `${s.btn} ${s.delete}`
								: `${s.btn} ${s.minus}`
						}
						onClick={minusProductHandler}
					></button>
					<p className={s.count}>{product?.quantity}</p>
					<button onClick={addProductHandler} className={`${s.btn} ${s.plus}`}></button>
					<p className={s.price}>{product?.price}</p>
				</div>
			</div>
		</div>
	)
}

export default CartItem
