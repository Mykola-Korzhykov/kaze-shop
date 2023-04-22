import React, { FC } from 'react';
import Image from 'next/image';
import closeIcon from '../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import s from '../../styles/cabinet2.module.scss';
import CartItem from '../../components/screens/Cart/CartItems/CartItem';

type IProps = {
	title: string;
	description: string;
	setShowModal: (state: boolean) => void;
};
const CabinetOrdersModal: FC<IProps> = ({
	title,
	description,
	setShowModal,
}) => {
	const handleClose = () => setShowModal(false);
	return (
		<div className={s.orderModal}>
			<div className={s.orderModal_body}>
				<h3 className={s.orderModal_title}>{title}</h3>
				<p className={s.orderModal_descr}>{description}</p>
				<Image
					onClick={handleClose}
					className={s.orderModal_closeIcon}
					src={closeIcon}
					width={32}
					height={32}
					alt="close modal"
				/>
				<CartItem />
				<CartItem />
				<CartItem />
			</div>
		</div>
	);
};

export default CabinetOrdersModal;
