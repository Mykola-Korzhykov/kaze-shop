import React from 'react';
import FeedBack from '@/components/screens/FeedBack/FeedBack';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const FeedBackPage = () => {
	return (
		<SpinnerLayout>
			<FeedBack />
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
			...(await serverSideTranslations(locale, [
				'common',
				'feedback',
				'signup',
			])),
		},
	};
}
export default FeedBackPage;
