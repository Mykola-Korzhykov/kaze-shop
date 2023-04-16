import React from 'react';
import OrderHisrtoryItem from '../OrderHistory/OrderHistoryItem';
import cl from '../../../styles/cabinet2.module.scss';
const ForgottenBaskets = () => {
	return (
		<div className={cl.cart_content}>
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
			<OrderHisrtoryItem />
		</div>
	);
};

export default ForgottenBaskets;
