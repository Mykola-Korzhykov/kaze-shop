import React, { Suspense, useEffect } from 'react';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';
import axios from 'axios';
import { SingleProductData } from '@/types/singleProduct';
import { API_URL } from '../../services/index';

import { GetStaticPaths, GetStaticProps } from 'next/types';
import { AllCategory } from '@/types/allCategoryWithProducts';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import ErrorPage from '../404';

const Product = ({ data }: OneProductProps): JSX.Element => {

    if (!data) {
        return (
            <SpinnerLayout>
                <ErrorPage />
            </SpinnerLayout>
        )
    }

    return (
        <SpinnerLayout>
            <OneProduct {...data} />
            <Footer />
        </SpinnerLayout>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const { data: category } = await axios.get<AllCategory[]>(API_URL + `/categories/get_categoties&products`);

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

export const getStaticProps: GetStaticProps<OneProductProps> = async ({ params }) => {

    if (!params) {
        return {
            notFound: true
        }
    }
    try {
        const { data } = await axios.get<SingleProductData>(API_URL + `/product/${params.id}`);
        return {
            props: {
                data
            }
        }

    } catch (e) {
        return {
            notFound: true,
        }
    }
}


interface OneProductProps {
    data: SingleProductData | null;
}


export default Product;