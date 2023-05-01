import { NextPage } from 'next';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
const ErrorPage: NextPage = () => {
	const { t } = useTranslation('common');
	return (
		<main className="content">
			<div className="container">
				<div className="page_coordinator">
					<Link href="/">{t('Main')}</Link> | <span>404</span>
				</div>
				<ErrorModal
					title="404"
					buttonText={t('goToMain')}
					buttonHref="/"
					description={t('error')}
				/>
			</div>
		</main>
	);
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				['common'],
				require('../../i18next.config')
			)),
		},
	};
}

export default ErrorPage;
