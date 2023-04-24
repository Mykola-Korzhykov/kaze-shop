import React from 'react';
import Order from '../components/screens/Order/Order';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
import axios from 'axios';
const OrderPage = () => {
	const { locale } = useRouter();
	React.useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();

			axios.post(API_URL + '/orders/send_cart', {
				locale: locale,
				userEmail: sessionStorage.getItem('userEmail'),
				orderId: sessionStorage.getItem('orderId'),
			});
			// navigator.sendBeacon(
			// 	API_URL + '/orders/send_cart',
			// 	JSON.stringify({
			// 		userEmail: sessionStorage.getItem('userEmail'),
			// 		orderId: sessionStorage.getItem('orderId'),
			// 		locale: locale,
			// 	})
			// );
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return <Order />;
};

export default OrderPage;
