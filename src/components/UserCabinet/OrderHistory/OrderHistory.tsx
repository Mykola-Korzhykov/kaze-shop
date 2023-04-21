import React from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import OrderHisrtoryItem from './OrderHistoryItem';
import { CartProduct } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';
const OrderHisrtory = () => {
	const userOrders = useAppSelector((state) => state.user.orders);

	const renderOrders = (arr: CartProduct[] | []) => {
		return arr?.map((product) => {
			return <OrderHisrtoryItem key={product?.id} />;
		});
	};

	// if (!userOrders?.length) {
	// 	return (
	// 		<CabinetEmptyModal
	// 			title="У Вас нет заказов"
	// 			description="Но вы можете это исправить! Перейдите в каталог и сделайте заказ"
	// 			btnText="Перейти в каталог"
	// 			btnHref="/catalog"
	// 		/>
	// 	);
	// }
	return (
		<div className={cl.cart_carts}>
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			{/* {renderOrders(userOrders)} */}
		</div>
	);
};

export default OrderHisrtory;
