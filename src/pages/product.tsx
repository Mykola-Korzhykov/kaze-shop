import React from 'react';
import PropTypes from 'prop-types';
import Footer from '@/components/Footer/Footer';
import OneProduct from '@/components/screens/Product/Product';

const Product = (): JSX.Element => {
    return (
        <>
            <OneProduct />
            <Footer />
        </>
    );
};


export default Product;