import React, { FC, useEffect, useState } from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png'
import showMoreIcon from '../../../assets/icons/cabinetTabs/catabinetCartShowMore.svg';
import statusSubmitted from '../../../assets/icons/cabinetTabs/cabinetCartStatusSubmitted.svg';
import statusCanceled from '../../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import statusCompleted from '../../../assets/icons/cabinetTabs/cabinetCartStatusCompleted.svg';
import statusProcessing from '../../../assets/icons/cabinetTabs/cabinetCartStatusInProcess.svg';
import { OrderItem } from '@/types/goods';
const OrderHisrtoryItem: FC<{
	product: OrderItem;
	setShowModal: (state: boolean) => void;
}> = ({ product, setShowModal }) => {
	const [imageStatusSrc, setImageStatucSrc] = useState<string | null>(null);
	const [statusText, setStatusText] = useState<string>('в обработке');

	useEffect(() => {
		const renderImageSrc = () => {
			let status = product?.orderStatus;
			if (status === 'Canceled') {
				setImageStatucSrc(statusCanceled);
				setStatusText('отменен');
			} else if (status === 'Processing' || status === 'Paid') {
				setImageStatucSrc(statusProcessing);
				setStatusText('в обработке');
			} else if (status === 'Completed') {
				setImageStatucSrc(statusCompleted);
				setStatusText('доставлено');
			} else if (status === 'Submitted') {
				setImageStatucSrc(statusSubmitted);
				setStatusText('отправлено');
			}
		};

		renderImageSrc();
	}, []);
	return (
		<div className={s.cart}>
			<div className={s.cart_imgWrapper}>
				<Image
					src={product?.imageUrl ?? cartImage}
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
					<p className={s.cart_title}>Заказ {product?.id}</p>
					<div className={`${s.cart_status}`}>
						{imageStatusSrc && (
							<Image src={imageStatusSrc} width={24} height={24} alt="status" />
						)}
						<p className={s.cart_descr}>
							Статус: <span>{statusText}</span>
						</p>
					</div>
					<p className={s.cart_price}>{product?.totalPrice}</p>
				</div>
				<Image
					onClick={() => setShowModal(true)}
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

export default OrderHisrtoryItem;
