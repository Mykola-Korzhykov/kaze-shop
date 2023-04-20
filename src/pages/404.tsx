import { NextPage } from 'next';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import Link from 'next/link';
import { API_URL } from '@/services';
const ErrorPage: NextPage = () => {
	React.useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			navigator.sendBeacon(
				API_URL + '/product?page=1&pageSize=10',
				JSON.stringify({ data: 'PUTINHUILO CYKA' })
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
