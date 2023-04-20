import Main from '@/components/screens/Main/Main';
import SpinnerLayout from '@/layouts/SpinnerLayout';

import '../i18next/18n';
import { GetStaticProps } from 'next';
import { ReviewsResT } from '@/types/mainPageRequest/reviews';
import { AboutResT } from '@/types/mainPageRequest/about';
import { FaqResT } from '@/types/mainPageRequest/faq';
import { footersResT } from '@/types/mainPageRequest/footer';
import { LogoResT } from '@/types/mainPageRequest/logo';
import { MainPageResT } from '@/types/mainPageRequest/mainPage';
import { useAppDispatch } from '@/redux/hooks';
import { StrapiAxios } from '@/services/strapiAxios';
import { IndexPageProps } from '@/types/mainPageRequest';
import { initial } from '@/redux/slices/strapiValues';
import axios from 'axios';
import { CategorySlider } from '@/types/mainPageRequest/categorySlider';
import { LastAddedProduct } from '@/types/mainPageRequest/lastAddedProduct';
import { initialMain } from '@/redux/slices/main';



export default function Home({ about, faq, footer, lastAddedProduct, logo, mainPage, productSliderOne, productSliderTwo, reviews }: IndexPageProps) {
	const dispatch = useAppDispatch();
	dispatch(initial({
		about: about,
		faq: faq,
		footer: footer,
		logo: logo,
		mainPage: mainPage,
		reviews: reviews
	}));

	dispatch(initialMain({ lastAddedProduct, productSliderOne, productSliderTwo }));


	return (
		<SpinnerLayout>
			<Main />
		</SpinnerLayout>
	);
}





export const getStaticProps: GetStaticProps = async (context) => {
	const locale = context.locale === 'ua' ? 'uk' : context.locale;

	try {

		const allRequest = await Promise.all([
			StrapiAxios.get<AboutResT>('/api/abouts?populate=deep&locale=' + locale),
			StrapiAxios.get<FaqResT>('/api/faqs?populate=deep&locale=' + locale),
			StrapiAxios.get<footersResT>('/api/footers?populate=deep&locale=' + locale),
			StrapiAxios.get<LogoResT>('/api/logos?populate=deep&locale=' + locale),
			StrapiAxios.get<ReviewsResT>('/api/reviews?populate=deep&locale=' + locale),
			StrapiAxios.get<MainPageResT>('/api/main-pages?populate=deep&locale=' + locale),
			axios.get<CategorySlider>(process.env.NEXT_BASE_URL + '/product/categories?page=1&pageSize=1&categories=1'),
			axios.get<CategorySlider>(process.env.NEXT_BASE_URL + '/product/categories?page=1&pageSize=1&categories=2'),
			axios.get<LastAddedProduct>(process.env.NEXT_BASE_URL + '/product?page=1&pageSize=1'),
			axios.get(process.env.NEXT_BASE_URL + '/reviews?page=1&pageSize=1'),

		]);



		const about = {
			button: allRequest[0].data.data[0].attributes.button,
			image: allRequest[0].data.data[0].attributes.image,
			text: allRequest[0].data.data[0].attributes.text,
			title: allRequest[0].data.data[0].attributes.title
		}
		const faq = {
			fields: [
				allRequest[1].data.data[0].attributes.field_1,
				allRequest[1].data.data[0].attributes.field_2,
				allRequest[1].data.data[0].attributes.field_3,
				allRequest[1].data.data[0].attributes.field_4
			],
			image: allRequest[1].data.data[0].attributes.image,
			title: allRequest[1].data.data[0].attributes.title
		}
		const footer = {
			field: [
				allRequest[2].data.data[0].attributes.field_1,
				allRequest[2].data.data[0].attributes.field_2,
				allRequest[2].data.data[0].attributes.field_3
			]
		}
		const logo = allRequest[3].data.data[0].attributes.logo

		const reviews = {
			image: allRequest[4].data.data[0].attributes.image,
			title: allRequest[4].data.data[0].attributes.title

		}
		const mainPage = {
			vertical_text_one: allRequest[5].data.data[0].attributes.Vertical_text.field_1,
			vertical_text_two: allRequest[5].data.data[0].attributes.Vertical_text.field_2,
			button: allRequest[5].data.data[0].attributes.button
		}

		const productSliderOne = allRequest[6].data.products;
		const productSliderTwo = allRequest[7].data.products;
		const lastAddedProduct = allRequest[8].data.products

		return {
			props: {
				about,
				faq,
				footer,
				logo,
				reviews,
				mainPage,
				productSliderOne,
				productSliderTwo,
				lastAddedProduct
			}
		}
	} catch (e) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			}
		}
	}
}




