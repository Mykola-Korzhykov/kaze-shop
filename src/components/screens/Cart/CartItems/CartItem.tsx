import React from 'react'
import Image from 'next/image'
import s from './CartItems.module.scss'
import cartImage from '../../../../assets/images/cartItem.png'
const CartItem = () => {
	return (
		<div className={s.cart_item}>
			<div className={s.item_imgWrapper}>
				<Image src={cartImage} alt='Cart image' className={s.item_img} priority={true} quality={95}/>
			</div>
			<div className={s.item_content}>
				<div className={s.item_text}>
					<p className={s.item_title}>Топик через плече</p>
					<p className={s.item_descr}>
						Lorem ipsum dolor sit amet consectetur. Convallis suspendisse diam
						iaculis pulvinar odio curabitur mattis nemore zerhadе
					</p>
					<div className={s.item_size}>
						<div className={s.item_checkbox}>
							<p style={{ backgroundColor: 'red' }}></p>
						</div>
						<p className={s.item_sizeText}>
							Размер - <span>M</span>
						</p>
					</div>
				</div>
				<div className={s.item_priceBlock}>
					<button className={`${s.item_btn} ${s.minus}`}></button>
					<p className={s.item_count}>1</p>
					<button className={`${s.item_btn} ${s.plus}`}></button>
					<p className={s.item_price}>29$</p>
				</div>
			</div>
		</div>
	)
}

export default CartItem
