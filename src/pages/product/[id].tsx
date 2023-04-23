import React from 'react';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';
import axios from 'axios';
import { SingleProductData, SingleProductRes } from '@/types/singleProduct';
import { API_URL } from '../../services/index';

import { GetStaticPaths, GetStaticProps } from 'next/types';
import { AllCategory } from '@/types/allCategoryWithProducts';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import ErrorPage from '../404';
import { StrapiAxios } from '@/services/strapiAxios';
import { ReviewsResT } from '@/types/mainPageRequest/reviews';
import { footersResT } from '@/types/mainPageRequest/footer';
import { useAppDispatch } from '@/redux/hooks';
import { initial } from '@/redux/slices/strapiValues';
import { LogoResT } from '@/types/mainPageRequest/logo';

const Product = (data: SingleProductData): JSX.Element => {
    const dispatch = useAppDispatch();

    if (!data.product) {
        return (
            <SpinnerLayout>
                <ErrorPage />
            </SpinnerLayout>
        )
    }
    dispatch(initial({
        about: null,
        faq: null,
        mainPage: null,
        reviews: data.reviewsStrapi
    }))


    return (
        <SpinnerLayout>
            <OneProduct {...data} />
            <Footer />
        </SpinnerLayout>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const { data: category } = await axios.get<AllCategory[]>(API_URL + `/categories/get_categories&products`);

    const productId = category.flatMap((item) => {
        if (item.products.length) {
            return item.products.map(el => el.id);
        }
    });


    return {
        paths: productId.map(id => (`/product/${id}`)),
        fallback: true,

    }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

    const validLocale = locale === 'ua' ? 'uk' : locale;

    if (!params) {
        return {
            notFound: true
        }
    }
    try {
        const allRequest = await Promise.all([
            axios.get<SingleProductRes>(API_URL + `/product/${params.id}`),
            StrapiAxios.get<ReviewsResT>('/api/reviews?populate=deep&locale=' + validLocale),
            StrapiAxios.get<footersResT>('/api/footers?populate=deep&locale=' + validLocale),
            StrapiAxios.get<LogoResT>('/api/logos?populate=deep&locale=' + validLocale)

        ]);



        const product = allRequest[0].data;
        const reviewsStrapi = {
            title: allRequest[1].data.data[0].attributes.title,
            image: allRequest[1].data.data[0].attributes.image
        };
        const footer = {
            field: [
                allRequest[2].data.data[0].attributes.field_1,
                allRequest[2].data.data[0].attributes.field_2,
                allRequest[2].data.data[0].attributes.field_3
            ]
        };
        const logo = allRequest[3].data.data[0].attributes.logo;

        return {
            props: {
                product,
                reviewsStrapi,
                footer,
                logo

            }
        }

    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/500'
            }
        }
    }
}



export default Product;