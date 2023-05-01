import React from 'react';
import SizeChart from '@/components/screens/SizeChart';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Api } from '@/services';
import { Goods } from '@/types/goods';
import {
	GetServerSidePropsContext,
	GetServerSideProps,
	InferGetServerSidePropsType,
} from 'next';
const SizeChartPage = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<SpinnerLayout>
			<SizeChart
				neededProduct={{
					productName: data?.title,
					sizeChartImage: data?.sizeChartImage,
					sizeChartImageDescription: data?.sizeChartImageDescription,
				}}
			/>
		</SpinnerLayout>
	);
};

export const getServerSideProps: GetServerSideProps<{ data: Goods }> = async (
	context: GetServerSidePropsContext
) => {
	const { id } = context.query;
	const { locale } = context;
	try {
		const data: Goods = await Api(context).goods.getSingleProduct(id + '');
		return {
			props: {
				data,
				...(await serverSideTranslations(
					locale,
					['common'],
					require('../../../i18next.config')
				)),
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export default SizeChartPage;
