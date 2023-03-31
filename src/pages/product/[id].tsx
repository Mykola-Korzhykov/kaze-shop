import React from 'react';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';
import axios from 'axios';
import { SingleProductData } from '@/types/singleProduct';
import { API_URL } from '../../services/index';

import { GetServerSideProps } from 'next/types';

const Product = ({ data }: OneProductProps): JSX.Element => {

    return (
        <>
            <OneProduct {...data} />
            <Footer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<OneProductProps> = async (context) => {
    const { id } = context.query;

    try {
        const { data } = await axios.get<SingleProductData>(API_URL + `/product/${id}`);
        return {
            props: { data },
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

interface OneProductProps {
    data: SingleProductData
}




export default Product;