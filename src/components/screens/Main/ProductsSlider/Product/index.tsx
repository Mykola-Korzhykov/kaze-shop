import React from 'react';
import s from './Product.module.scss'
import Image from 'next/image'
import save_black from '../../../../../assets/images/main/save_black.svg'
//types
import { Product } from '@/types/auth'


interface ProductProps {
    product: Product,

}

const Product = ({ product }: ProductProps) => {


    return (
        <div className={s.product}>
            <Image className={s.img} src={product.img} alt='img' />
            <div className={s.description_wrapper}>
                <div className={s.description}> {product.description}</div>
                <div className={s.price}> {product.price}</div>
            </div>
            <div className={s.btn_wrapper}>
                <button className={s.btn_cart}> В корзину </button>
                <button className={s.btn_save}>
                </button>
            </div>
        </div>



    );
}

export default Product;