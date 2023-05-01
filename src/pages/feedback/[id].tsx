import React from 'react';
import FeedBack from '@/components/screens/FeedBack/FeedBack';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	GetServerSidePropsContext,
	GetServerSideProps,
	InferGetServerSidePropsType,
} from 'next';
import { Goods } from '@/types/goods';
import { Api } from '@/services';
const FeedBackPage = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<SpinnerLayout>
			<FeedBack
				feedbackProduct={{
					imageUrl: data?.images[0]?.imagesPaths[0],
					productId: data?.id,
					productName: data?.title,
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
					['common', 'feedback', 'signup'],
					require('../i18next.config')
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
// 			...(await serverSideTranslations(locale, [
// 				'common',
// 				'feedback',
// 				'signup',
// 			])),
// 		},
// 	};
// }

export default FeedBackPage;
