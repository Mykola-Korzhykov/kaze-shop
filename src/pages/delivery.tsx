import React from 'react';
import DeliveryAndReturn from '@/components/screens/DeliveryAndReturn';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DeliveAndReturnPage = () => {
	return (
		<SpinnerLayout>
			<DeliveryAndReturn />;
		</SpinnerLayout>
	);
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				['common'],
				require('../i18next.config')
			)),
		},
	};
}
export default DeliveAndReturnPage;
