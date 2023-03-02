import React from 'react'
import Image from 'next/image'
import s from './CartItems.module.scss'
import cartImage from '../../../../assets/images/cartItem.png'
const CartItem = () => {
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
					<p className={s.title}>Топик через плече</p>
					<p className={s.descr}>
						Lorem ipsum dolor sit amet consectetur. Convallis suspendisse diam
						iaculis pulvinar odio curabitur mattis nemore zerhadе
					</p>
					<div className={s.size}>
						<div className={s.checkbox}>
							<p style={{ backgroundColor: 'red' }}></p>
						</div>
						<p className={s.format}>
							Размер - <span>M</span>
						</p>
					</div>
				</div>
				<div className={s.addition}>
					<button className={`${s.btn} ${s.delete}`}></button>
					<p className={s.count}>1</p>
					<button className={`${s.btn} ${s.plus}`}></button>
					<p className={s.price}>29$</p>
				</div>
			</div>
		</div>
	)
}

export default CartItem
