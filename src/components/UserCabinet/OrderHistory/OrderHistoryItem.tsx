import React from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
const OrderHisrtoryItem = () => {
	return (
		<div className={s.cart}>
			<div className={s.cart_imgWrapper}>
				<Image
					src={cartImage}
					width={94}
					height={153}
					alt="Cart image"
					className={s.cart_img}
					priority={true}
					quality={95}
				/>
			</div>
			<div className={s.cart_content}>
				<div className={s.cart_text}>
					<p className={s.cart_title}>Заказ №2400</p>
					<p className={s.cart_descr}>
						Статус заказа: <span>в обработке</span>
					</p>
					<p className={s.cart_price}>256$</p>
				</div>
			</div>
		</div>
	);
};

export default OrderHisrtoryItem;
