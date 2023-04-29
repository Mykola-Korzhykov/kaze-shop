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

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'common',
				'feedback',
				'signup',
			])),
		},
	};
}
export default FeedBackPage;
