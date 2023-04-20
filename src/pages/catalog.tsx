import React from 'react';
import SpinnerLayout from '../layouts/SpinnerLayout';
import Catalog from '@/components/screens/Catalog/Catalog';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPage } from 'next';
const CatalogPage: NextPage = () => {
	return (
		<SpinnerLayout>
			<Catalog />
		</SpinnerLayout>
	);
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'catalog'])),
		},
	};
}

export default CatalogPage;
