import { NextPage } from 'next';
import React from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import Compare from '@/components/screens/Compare/Compare';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const ComparePage: NextPage = () => {
	return (
		<SpinnerLayout>
			<Compare />
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

export default ComparePage;
