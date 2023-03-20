import React, { FC } from 'react'
import Image from 'next/image'
import s from './CartItems.module.scss'
import cartImage from '../../../../assets/images/cartItem.png'
import { CartProduct } from '@/types/goods'
import {
	addProductToCart,
	deleteCartProduct,
	getCartProducts,
} from '@/redux/slices/goods'
const CartItem: FC<{ product: CartProduct }> = ({ product }) => {
	const addProductHandler = () => {}
	const minusProductHandler = () => {}
	return (
		<div className={s.block}>
			<div className={s.imgWrapper}>
				<Image
					src={cartImage}
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
							<p style={{ backgroundColor: product?.hex }}></p>
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
					></button>
					<p className={s.count}>{product?.quantity}</p>
					<button className={`${s.btn} ${s.plus}`}></button>
					<p className={s.price}>{product?.price}</p>
				</div>
			</div>
		</div>
	)
}

export default CartItem
