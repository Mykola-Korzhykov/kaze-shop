import React from 'react'
import s from './Product.module.scss'
import Image from 'next/image';

interface ProductProps {
    price: string,
    description: string,
    img: string,
    id: number
}

const Product = ({ id, price, description, img }: ProductProps) => {

    return (
        <div className={s.product}>
            <Image className={s.img} src={img} alt='productImage' />
            <span className={s.description}>
                {description}
            </span>
            <span className={s.price}>
                {price}
            </span>
        </div>
    )
}

export default Product
