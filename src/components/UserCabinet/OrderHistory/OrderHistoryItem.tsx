import React, { FC, useEffect, useState } from 'react';
import s from '../../../styles/cabinet2.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
import showMoreIcon from '../../../assets/icons/cabinetTabs/catabinetCartShowMore.svg';
import statusSubmitted from '../../../assets/icons/cabinetTabs/cabinetCartStatusSubmitted.svg';
import statusCanceled from '../../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import statusCompleted from '../../../assets/icons/cabinetTabs/cabinetCartStatusCompleted.svg';
import statusProcessing from '../../../assets/icons/cabinetTabs/cabinetCartStatusInProcess.svg';
import { useAppDispatch } from '@/redux/hooks';
import { OrderItem } from '@/types/goods';
import { getUserOrderBasket } from '@/redux/slices/user';
import { useTranslation } from 'next-i18next';
const OrderHisrtoryItem: FC<{
	product: OrderItem;
	setShowModal: (state: boolean) => void;
}> = ({ product, setShowModal }) => {
	const { t } = useTranslation('cabinet');
	const dispatch = useAppDispatch();
	const [imageStatusSrc, setImageStatucSrc] = useState<string | null>(null);
	const [statusText, setStatusText] = useState<string>(t('processing'));

	useEffect(() => {
		const renderImageSrc = () => {
			let status = product?.orderStatus;
			if (status === 'Canceled') {
				setImageStatucSrc(statusCanceled);
				setStatusText(t('return'));
			} else if (status === 'Processing' || status === 'Paid') {
				setImageStatucSrc(statusProcessing);
				setStatusText(t('processing'));
			} else if (status === 'Completed') {
				setImageStatucSrc(statusCompleted);
				setStatusText(t('delivered'));
			} else if (status === 'Submitted') {
				setImageStatucSrc(statusSubmitted);
				setStatusText(t('shipped'));
			}
		};

		renderImageSrc();
	}, []);

	const modalHandler = () => {
		dispatch(getUserOrderBasket(product?.id));
		setShowModal(true);
	};
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
					<p className={s.cart_title}>
						{t('order')} {product?.id}
					</p>
					<div className={`${s.cart_status}`}>
						{imageStatusSrc && (
							<Image src={imageStatusSrc} width={24} height={24} alt="status" />
						)}
						<p className={s.cart_descr}>
							{t('order_status')}: <span>{statusText}</span>
						</p>
					</div>
					<p className={s.cart_price}>{product?.totalPrice}</p>
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

export default OrderHisrtoryItem;
