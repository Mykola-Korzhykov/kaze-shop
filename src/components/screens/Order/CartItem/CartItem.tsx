import React from 'react';
import { CartItemProps } from './CartItem.interface';
import s from './CartItem.module.scss';
import Image from 'next/image';
import ColorItems from '../../Product/Main/ColorItems/ColorItems';
import CountButton from '../CountButton/CountButton';
import cn from 'classnames';

const CartItem = ({ title, description, size, color, count, price, img, className }: CartItemProps): JSX.Element => {
    return (
        <div className={cn(s.item, className)}>
            <Image src={img} width={95} height={150} alt={title} quality={100} />
            <div className={s.item_info}>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className={s.item_info_product}>
                    <ColorItems colors={[color]} activeColor={0} size='30' />
                    <div>
                        <span>Размер - {size}</span>
                    </div>
                </div>
                <div className={s.item_info_price}>
                    <CountButton countType='minus' />
                    <span>{count}</span>
                    <CountButton countType='plus' />
                    <div className={s.price}>{price}</div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;