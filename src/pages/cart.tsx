import React from 'react';
import { NextPage } from 'next';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import Cart from '@/components/screens/Cart';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const CartPage: NextPage = () => {
	return (
		<SpinnerLayout>
			<Cart />
		</SpinnerLayout>
	);
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cart'])),
		},
	};
}

export default CartPage;
