import React from 'react';
import SizeChart from '@/components/screens/SizeChart';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const SizeChartPage = () => {
	return (
		<SpinnerLayout>
			<SizeChart />
		</SpinnerLayout>
	);
};

export const getStaticPaths = async () => {
	return {
		paths: [
			{ params: { type: 'id' }, locale: 'ua' },
			{ params: { type: 'id' }, locale: 'en' },
			{ params: { type: 'id' }, locale: 'ru' },
			{ params: { type: 'id' }, locale: 'rs' },
		],
		fallback: true,
	};
};

export async function getStaticProps({ locale, params }: any) {
	return {
		props: {
			params: params,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default SizeChartPage;
