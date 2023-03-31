import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';
import { useRouter } from 'next/router';
import axios from 'axios';
import { initialState } from '@/types/singleProduct';
import Spinner from '@/components/Spinner/Spinner';
import { Api } from '@/services';
import react from 'react'
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
        const { data } = await axios.get<initialState>(process.env.NEXT_BASE_URL + `/product/${id}`);
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
    data: initialState
}




export default Product;