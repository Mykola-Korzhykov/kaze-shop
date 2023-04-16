import React from 'react';
import cl from '../../../styles/cabinet2.module.scss';

import OrderHisrtoryItem from './OrderHistoryItem';

const OrderHisrtory = () => {
	return (
		<div className={cl.cart_carts}>
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
		</div>
	);
};

export default OrderHisrtory;
