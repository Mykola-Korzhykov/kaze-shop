import Main from '@/components/screens/Main/Main';
import SpinnerLayout from '@/layouts/SpinnerLayout';

import { GetStaticProps } from 'next';
import { ClientReviewsRes, ReviewsResT } from '@/types/mainPageRequest/reviews';
import { AboutResT } from '@/types/mainPageRequest/about';
import { FaqResT } from '@/types/mainPageRequest/faq';
import { MainPageResT } from '@/types/mainPageRequest/mainPage';
import { useAppDispatch } from '@/redux/hooks';
import { StrapiAxios } from '@/services/strapiAxios';
import { IndexPageProps } from '@/types/mainPageRequest';
import { initial } from '@/redux/slices/strapiValues';
import axios, { AxiosResponse } from 'axios';
import { CategorySlider } from '@/types/mainPageRequest/categorySlider';
import { LastAddedProduct } from '@/types/mainPageRequest/lastAddedProduct';
import { initialMain } from '@/redux/slices/main';
import { useEffect } from 'react';
import { Api } from '@/services';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function Home({
	about,
	faq,
	lastAddedProduct,
	mainPage,
	reviews,
}: IndexPageProps) {
	const dispatch = useAppDispatch();
	const router = useRouter();

	dispatch(
		initial({
			about: about,
			faq: faq,
			mainPage: mainPage,
			reviews: reviews,
		})
	);

	useEffect(() => {
		const getSliderValue = async () => {
			try {
				const res = await Promise.all([
					Api().goods.getGoodsByCategory<CategorySlider>(1, 1),
					Api().goods.getGoodsByCategory<CategorySlider>(1, 2),
				]);
				const productSliderOne = res[0].products;
				const productSliderTwo = res[1].products;
				dispatch(
					initialMain({ lastAddedProduct, productSliderOne, productSliderTwo })
				);
			} catch (e) {
				console.log(e);
				router.push('/500');
			}
		};
		getSliderValue();
	}, []);

	return (
		<SpinnerLayout>
			<Main />
		</SpinnerLayout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	let locale = context.locale === 'ua' ? 'uk' : context.locale;
	locale = locale === 'rs' ? 'sr' : locale;

	try {
		const allRequest = await Promise.all([
			StrapiAxios.get<AboutResT>('/api/abouts?populate=deep&locale=' + locale),
			StrapiAxios.get<FaqResT>('/api/faqs?populate=deep&locale=' + locale),
			StrapiAxios.get<ReviewsResT>(
				'/api/reviews?populate=deep&locale=' + locale
			),
			StrapiAxios.get<MainPageResT>(
				'/api/main-pages?populate=deep&locale=' + locale
			),
			axios.get<LastAddedProduct>(
				process.env.NEXT_BASE_URL + '/product?page=1&pageSize=10'
			),
			axios.get<AxiosResponse<ClientReviewsRes>>(
				process.env.NEXT_BASE_URL + '/reviews/get?page=1&pageSize=15'
			),
		]);

		const about = {
			button: allRequest[0].data.data[0].attributes.button,
			image: allRequest[0].data.data[0].attributes.image,
			text: allRequest[0].data.data[0].attributes.text,
			title: allRequest[0].data.data[0].attributes.title,
		};
		const faq = {
			fields: [
				allRequest[1].data.data[0].attributes.field_1,
				allRequest[1].data.data[0].attributes.field_2,
				allRequest[1].data.data[0].attributes.field_3,
				allRequest[1].data.data[0].attributes.field_4,
			],
			image: allRequest[1].data.data[0].attributes.image,
			title: allRequest[1].data.data[0].attributes.title,
		};

		const reviews = {
			image: allRequest[2].data.data[0].attributes.image,
			title: allRequest[2].data.data[0].attributes.title,
			clientReviews: allRequest[5].data.data,
		};
		const mainPage = {
			vertical_text_one:
				allRequest[3].data.data[0].attributes.Vertical_text.field_1,
			vertical_text_two:
				allRequest[3].data.data[0].attributes.Vertical_text.field_2,
			button: allRequest[3].data.data[0].attributes.button,
		};

		const lastAddedProduct = allRequest[4].data.products;

		return {
			props: {
				...(await serverSideTranslations(
					context.locale,
					['common', 'forgot', 'product'],
					require('../../i18next.config')
				)),
				about,
				faq,
				reviews,
				mainPage,
				lastAddedProduct,
			},
		};
	} catch (e) {
		console.log(e);
		return {
			// redirect: {
			// 	destination: '/500',
			// 	permanent: false,
			// },
			notFound: true,
		};
	}
};
