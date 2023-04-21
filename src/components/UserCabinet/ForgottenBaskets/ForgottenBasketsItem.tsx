import React, { useEffect, useState } from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
import showMoreIcon from '../../../assets/icons/cabinetTabs/catabinetCartShowMore.svg';


const ForgottenBasketsItem = () => {
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
					<p className={s.cart_title}>Корзина №3</p>
					<p className={s.cart_descr}>
						Собрана: <span>вчера</span>
					</p>
					<p className={s.cart_price}>256$</p>
				</div>
				<Image
					src={showMoreIcon}
					width={32}
					height={32}
					alt="show more about order"
					className={s.cart_icon}
				/>
			</div>
		</div>
	);
};

export default ForgottenBasketsItem;
