import OrderDetails from '@/components/screens/OrderDetails/OrderDetails';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import ErrorPage from '../404';
import { changeOrderNum } from '@/redux/slices/order';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Api } from '@/services';

const Order_details = ({ orderNum }: Order_detailsProps) => {

    if (!orderNum) {

        return <ErrorPage />
    }
    return (
        <OrderDetails orderNum={orderNum} />
    );
};

export default Order_details;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const query = context.params;
    try {
        const { data } = await Api().goods.checkOrderSuccess<ResponseFetch>(query.id.toString());
        if (data.orderStatus === 'Completed')
            return {
                props: {
                    orderNum: data.orderId
                }
            }
        if (data.orderStatus === 'Processing') {
            return {
                notFound: true,
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

interface Order_detailsProps {
    orderNum: number;
}

interface ResponseFetch {
    data: {
        orderId: number;
        orderStatus: 'Processing' | 'Completed'
    }

}