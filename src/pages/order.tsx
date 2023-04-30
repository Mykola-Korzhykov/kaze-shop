import React from 'react';
import Order from '../components/screens/Order/Order';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OrderPage = () => {
	const { locale } = useRouter();

	React.useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			const userEmail = sessionStorage.getItem('userEmail');
			const orderId = sessionStorage.getItem('orderId');

			try {
				if (userEmail && orderId) {
					event.preventDefault();
					axios.post(API_URL + '/orders/send_cart', {
						locale,
						userEmail: userEmail,
						orderId: orderId,
					});
				}
			} catch (e) {
				console.log(e);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return <Order />;
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'common',
				'order',
				'signup',
				'cart',
			])),
		},
	};
}

export default OrderPage;
