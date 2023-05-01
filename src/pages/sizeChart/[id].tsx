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

// export const getStaticPaths = async () => {
// 	return {
// 		paths: [
// 			{ params: { type: 'id' }, locale: 'ua' },
// 			{ params: { type: 'id' }, locale: 'en' },
// 			{ params: { type: 'id' }, locale: 'ru' },
// 			{ params: { type: 'id' }, locale: 'rs' },
// 		],
// 		fallback: true,
// 	};
// };

// export async function getStaticProps({ locale, params }: any) {
// 	return {
// 		props: {
// 			params: params,
// 			...(await serverSideTranslations(locale, ['common'])),
// 		},
// 	};
// }

export default SizeChartPage;
