import React, { FC } from 'react';
import Image from 'next/image';
import closeIcon from '../../../assets/icons/cabinetTabs/cabinetCartStatusCanceled.svg';
import CabinetOrdersModalItem from './CabinetOrdersModalItem';
import { useAppSelector } from '@/redux/hooks';
import s from '../../../styles/cabinet2.module.scss';
import FormSpinner from '@/components/screens/Order/FormSpinner/FormSpinner';
import { useTranslation } from 'next-i18next';
type IProps = {
	setShowModal: (state: boolean) => void;
	ordersTabActive: boolean;
};
const CabinetOrdersModal: FC<IProps> = ({ setShowModal, ordersTabActive }) => {
	const { t } = useTranslation('cabinet');
	const ordersModalItems = useAppSelector((state) => state.user.cartItemsModal);
	const handleClose = () => setShowModal(false);

	if (!ordersModalItems) {
		return (
			<div className={s.orderModal}>
				<div className={s.orderModal_body}>
					<FormSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className={s.orderModal}>
			<div className={s.orderModal_body}>
				{ordersTabActive ? (
					<>
						<h3 className={s.orderModal_title}>
							{t('order')} {ordersModalItems?.id}
						</h3>
						<p className={s.orderModal_descr}>
							{t('order_status')} - {ordersModalItems?.cartStatus}
						</p>
					</>
				) : (
					<>
						<h3 className={s.orderModal_title}>
							{t('cart')} {ordersModalItems?.id}
						</h3>
						<p className={s.orderModal_descr}>
							{t('collected')} {ordersModalItems?.createdAt}
						</p>
					</>
				)}
				<Image
					onClick={handleClose}
					className={s.orderModal_closeIcon}
					src={closeIcon}
					width={32}
					height={32}
					alt="close modal"
				/>
				{ordersModalItems?.cartProducts.map((el, i) => {
					return <CabinetOrdersModalItem product={el} key={i} />;
				})}
				<div className={s.orderModal_footer}>
					<span>{t('together')}</span>{' '}
					<span>{ordersModalItems?.totalPrice}</span>
				</div>
			</div>
		</div>
	);
};

export default CabinetOrdersModal;
