import React from 'react';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';
import axios from 'axios';
import { SingleProductData, SingleProductRes } from '@/types/product';
import { API_URL } from '../../services/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { AllCategory } from '@/types/allCategoryWithProducts';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import ErrorPage from '../404';
import { StrapiAxios } from '@/services/strapiAxios';
import { ReviewsResT } from '@/types/mainPageRequest/reviews';
import { useAppDispatch } from '@/redux/hooks';
import { initial } from '@/redux/slices/strapiValues';

const Product = (data: SingleProductData): JSX.Element => {
	const dispatch = useAppDispatch();

	if (!data.product) {
		return (
			<SpinnerLayout>
				<ErrorPage />
			</SpinnerLayout>
		);
	}
	dispatch(
		initial({
			about: null,
			faq: null,
			mainPage: null,
			reviews: {
				...data.reviewsStrapi,
				clientReviews: data.product.reviews,
			},
		})
	);

	return (
		<SpinnerLayout>
			<OneProduct {...data} />
			<Footer />
		</SpinnerLayout>
	);
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const { data: category } = await axios.get<AllCategory[]>(
		API_URL + `/categories/get_categories&products`
	);

	const productId = category.flatMap((item) => {
		if (item.products.length) {
			return item.products.map((el) => el.id);
		}
	});

	const paths: pathType[] = [];

	productId.forEach((id) => {
		locales.forEach((locale) => {
			if (!id) {
				return;
			}
			paths.push({
				params: {
					slug: '/product/',
					id: `${id}`,
				},
				locale,
			});
		});
	});

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let validLocale = locale === 'ua' ? 'uk' : locale;
	validLocale = validLocale === 'rs' ? 'sr' : validLocale;

	if (!params) {
		return {
			notFound: true,
		};
	}

	try {
		const allRequest = await Promise.all([
			axios.get<SingleProductRes>(API_URL + `/product/${params.id}`),
			StrapiAxios.get<ReviewsResT>(
				'/api/reviews?populate=deep&locale=' + validLocale
			),
		]);

		const product = allRequest[0].data;
		const reviewsStrapi = {
			title: allRequest[1].data.data[0].attributes.title,
			image: allRequest[1].data.data[0].attributes.image,
		};

		return {
			props: {
				product,
				reviewsStrapi,
				...(await serverSideTranslations(
					locale,
					['common', 'product'],
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

interface pathType {
	params: {
		slug: string;
		id: string;
	};
	locale: string;
}

export default Product;
