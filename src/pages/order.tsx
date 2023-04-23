import React from 'react';
import Order from '../components/screens/Order/Order';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
const OrderPage = () => {
	const { locale } = useRouter();
	React.useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			navigator.sendBeacon(
				API_URL + '/orders/send_cart',
				JSON.stringify({
					userEmail: JSON.parse(sessionStorage.getItem('userEmail')),
					orderId: JSON.parse(sessionStorage.getItem('orderId')),
					locale: locale,
				})
			);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return <Order />;
};

export default OrderPage;
