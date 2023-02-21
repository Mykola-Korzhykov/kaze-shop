import React from 'react'
import s from './ProductsAccessories.module.scss'
//redux 
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
//components 
import Slider from '../ProductsSlider'

const ProductsAccessories = () => {

    const ProductsAccessoriesArr = useSelector((state: RootState) => state.main.productsLeggings)


    console.log('ProductsAccessoriesArr', ProductsAccessoriesArr)

    return (
        // <div className={s.container}>
        <div className={s.wrapper}>

            <Slider products={ProductsAccessoriesArr} title={'Аксессуары'} />

        </div>
        // </div>
    );
}

export default ProductsAccessories
