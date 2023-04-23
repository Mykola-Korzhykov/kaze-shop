import React, { FC } from 'react';
import Image from 'next/image';
import closeIcon from '../../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import CabinetOrdersModalItem from './CabinetOrdersModalItem';
import { useAppSelector } from '@/redux/hooks';
import s from '../../../styles/cabinet2.module.scss';

type IProps = {
	setShowModal: (state: boolean) => void;
};
const CabinetOrdersModal: FC<IProps> = ({ setShowModal }) => {
	const ordersModalItems = useAppSelector((state) => state.user.cartItemsModal);
	const handleClose = () => setShowModal(false);
	return (
		<div className={s.orderModal}>
			<div className={s.orderModal_body}>
				<h3 className={s.orderModal_title}>Корзина {ordersModalItems?.id}</h3>
				<p className={s.orderModal_descr}>
					Собрана {ordersModalItems?.createdAt}
				</p>
				<Image
					onClick={handleClose}
					className={s.orderModal_closeIcon}
					src={closeIcon}
					width={32}
					height={32}
					alt="close modal"
				/>
				{ordersModalItems.cartProducts.map((el) => {
					return <CabinetOrdersModalItem product={el} />;
				})}
			</div>
		</div>
	);
};

export default CabinetOrdersModal;
