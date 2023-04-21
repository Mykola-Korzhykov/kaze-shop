import React, { useEffect, useState } from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
import showMoreIcon from '../../../assets/icons/cabinetTabs/catabinetCartShowMore.svg';
import statusSubmitted from '../../../assets/icons/cabinetTabs/cabinetCartStatusSubmitted.svg';
import statusCanceled from '../../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import statusCompleted from '../../../assets/icons/cabinetTabs/cabinetCartStatusCompleted.svg';
import statusProcessing from '../../../assets/icons/cabinetTabs/cabinetCartStatusInProcess.svg';

const OrderHisrtoryItem = () => {
	const [imageStatusSrc, setImageStatucSrc] = useState<string | null>(null);

	const renderImageSrc = () => {
		let status = 'Processing';
		if (status === 'Canceled') {
			setImageStatucSrc(statusCanceled);
		} else if (status === 'Processing' || status === 'Paid') {
			setImageStatucSrc(statusProcessing);
		} else if (status === 'Completed ') {
			setImageStatucSrc(statusCompleted);
		} else if (status === 'Submitted') {
			setImageStatucSrc(statusSubmitted);
		}
	};

	useEffect(() => {
		renderImageSrc();
	}, []);
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
					<div className={`${s.cart_status}`}>
						{imageStatusSrc && (
							<Image src={imageStatusSrc} width={24} height={24} alt="status" />
						)}
						<p className={s.cart_descr}>
							Статус: <span>в обработке</span>
						</p>
					</div>
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

export default OrderHisrtoryItem;
