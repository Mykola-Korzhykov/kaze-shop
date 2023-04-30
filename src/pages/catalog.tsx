import React from 'react';
import { GetServerSidePropsContext } from 'next';
import SpinnerLayout from '../layouts/SpinnerLayout';
import Catalog from '@/components/screens/Catalog/Catalog';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import nookies from 'nookies';
import { Api } from '@/services';
import { AuthResponse } from '@/types/auth';
const CatalogPage: NextPage<{ data: AuthResponse }> = ({ data }) => {
	console.log('DATA RESPONSE CATALOG', data);
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

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
// 	const { locale } = ctx;
// 	const { refreshToken } = nookies.get(ctx);

// 	if (!refreshToken) {
// 		nookies.destroy(ctx, 'accessToken');
// 		return {
// 			redirect: {
// 				destination: '/login',
// 				permanent: false,
// 			},
// 		};
// 	} else {
// 		try {
// 			const data = await Api(ctx).user.getMe(locale);
// 			return {
// 				props: {
// 					data,
// 					...(await serverSideTranslations(locale, ['common', 'catalog'])),
// 				},
// 			};
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	}
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, ['common', 'catalog'])),
// 		},
// 	};
// }

export default CatalogPage;
