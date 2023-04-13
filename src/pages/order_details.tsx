import OrderDetails from '@/components/screens/OrderDetails/OrderDetails';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import ErrorPage from './404';
import { changeOrderNum } from '@/redux/slices/order';

const Order_details = () => {
    const orderNum = useAppSelector(store => store.order.orderNum);
    const dispatch = useAppDispatch();

    useEffect(() => {

        return () => {
            dispatch(changeOrderNum(null));
        }
    }, []);

    if (!orderNum) {

        return <ErrorPage />
    }
    return (
        <OrderDetails orderNum={orderNum} />
    );
};

export default Order_details;