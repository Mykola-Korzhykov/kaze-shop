import React from 'react';
import Order from '../components/screens/Order/Order';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
import axios from 'axios';


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
						userEmail: JSON.parse(userEmail),
						orderId: JSON.parse(orderId),
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

export default OrderPage;
