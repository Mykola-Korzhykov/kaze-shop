import React, { FC } from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import OrderHisrtoryItem from './OrderHistoryItem';
import { OrderItem } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';

const OrderHisrtory: FC<{ setShowModal: (state: boolean) => void }> = ({
	setShowModal,
}) => {
	const userOrders = useAppSelector((state) => state.user.orders);

	const renderOrders = (arr: OrderItem[]) => {
		return arr?.map((product) => {
			return (
				<OrderHisrtoryItem
					setShowModal={setShowModal}
					product={product}
					key={product?.id}
				/>
			);
		});
	};

	if (!userOrders?.orders?.length) {
		return (
			<CabinetEmptyModal
				title="У Вас нет заказов"
				description="Но вы можете это исправить! Перейдите в каталог и сделайте заказ"
				btnText="Перейти в каталог"
				btnHref="/catalog"
			/>
		);
	}
	return (
		<div className={cl.cart_carts}>{renderOrders(userOrders?.orders)}</div>
	);
};

export default OrderHisrtory;
