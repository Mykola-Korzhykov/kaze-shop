import React from 'react';
import s from './ProductFitnes.module.scss'
//redux
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
//components 
import Slider from '../ProductsSlider'


const ProductFitnes = () => {

    const ProductFitnesArr = useSelector((state: RootState) => state.main.productsFitnes)

    return (
        // <div className={s.container}>
        <div className={s.wrapper}>

            <Slider products={ProductFitnesArr} title={'Фитнес одежда'} />

        </div>
        // </div>
    );
}

export default ProductFitnes