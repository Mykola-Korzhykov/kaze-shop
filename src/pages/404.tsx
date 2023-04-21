import { NextPage } from 'next';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import Link from 'next/link';
import { API_URL } from '@/services';
import { useRouter } from 'next/router';
const ErrorPage: NextPage = () => {
	const { locale } = useRouter();
	React.useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			navigator.sendBeacon(
				API_URL + '/orders/send_cart',
				JSON.stringify({ userEmail: '', orderId: 2313123123, locale: locale })
			);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return (
		<main className="content">
			<div className="container">
				<div className="page_coordinator">
					<Link href="/">Главная</Link> | <span>404</span>
				</div>
				<ErrorModal
					title="404"
					buttonText="Вернуться на главную"
					buttonHref="/"
					description={'Упс, что то пошло не по плану('}
				/>
			</div>
		</main>
	);
};

export default ErrorPage;
