import OrderDetails from '@/components/screens/OrderDetails/OrderDetails';
import React from 'react';
import ErrorPage from '../404';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import { Api } from '@/services';

const Order_details = ({ orderNum }: Order_detailsProps) => {
	if (!orderNum) {
		return <ErrorPage />;
	}
	return <OrderDetails orderNum={orderNum} />;
};

export default Order_details;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { token, id } = context.query;

	try {
		const { data } = await Api().goods.checkOrderSuccess<ResponseFetch>(
			id.toString(),
			token.toString()
		);

		return {
			props: {
				orderNum: data.orderId,
				...(await serverSideTranslations(context.locale, [
					'common',
					'cart',
					'order',
				])),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			notFound: true,
		};
	}
};

interface Order_detailsProps {
	orderNum: number;
}

interface ResponseFetch {
	data: {
		orderId: number;
		orderStatus: 'Processing' | 'Completed';
	};
}
