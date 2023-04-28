import React, { FC, useEffect, useState } from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
import showMoreIcon from '../../../assets/icons/cabinetTabs/catabinetCartShowMore.svg';
import { CartProduct } from '@/types/goods';
import { useAppDispatch } from '@/redux/hooks';
import { setCartItemsModal } from '@/redux/slices/user';
const ForgottenBasketsItem: FC<{
	product: CartProduct;
	setShowModal: (state: boolean) => void;
}> = ({ product, setShowModal }) => {
	const [dateBasketCreated, setDateBasketCreated] = useState<string>('-');
	const dispatch = useAppDispatch();
	useEffect(() => {
		function printDateStatus() {
			const today = new Date();
			const dateToCompare = new Date(product?.updateAt);

			if (dateToCompare.toDateString() === today.toDateString()) {
				setDateBasketCreated('сегодня');
			} else if (
				dateToCompare.toDateString() ===
				new Date(today.setDate(today.getDate() - 1)).toDateString()
			) {
				setDateBasketCreated('вчера');
			} else {
				const dateCreated = product?.updateAt
					.toLocaleDateString('en-GB')
					.split('/')
					.join('.');
				setDateBasketCreated(dateCreated);
			}
		}
		printDateStatus();
	}, []);

	const modalHandler = () => {
		dispatch(
			setCartItemsModal({
				cartProducts: product?.cartProducts,
				totalPrice: product?.totalPrice,
				id: product?.id,
				createdAt: dateBasketCreated,
			})
		);
		setShowModal(true);
	};
	return (
		<div className={s.cart}>
			<div className={s.cart_imgWrapper}>
				<Image
					src={product?.cartProducts?.[0]?.imageUrl ?? cartImage}
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
					<p className={s.cart_title}>Корзина {product?.id}</p>
					<p className={s.cart_descr}>
						Собрана: <span>{dateBasketCreated}</span>
					</p>
					<p className={s.cart_price}>{product?.cartProducts?.[0]?.price}</p>
				</div>
				<Image
					onClick={modalHandler}
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
