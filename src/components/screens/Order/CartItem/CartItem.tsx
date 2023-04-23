import React from 'react';
import { CartItemProps } from './CartItem.interface';
import s from './CartItem.module.scss';
import Image from 'next/image';
import ColorItems from '../../Product/Main/ColorItems/ColorItems';
import CountButton from '../CountButton/CountButton';
import cn from 'classnames';
import { useRouter } from 'next/router';


const CartItem = ({ title, description, size, imageUrl, quantity, id, colour, price, colourId, productId, productPlus, productMinus, className }: CartItemProps): JSX.Element => {
    const router = useRouter();
    const myLocale = router.locale as 'ua' | 'ru' | 'rs' | 'en'
    const plus = () => {
        productPlus(productId, { colourId, imageUrl, size });
    }

    const minus = () => {
        productMinus(id);
    }

    return (
        <div className={cn(s.item, className)}>
            <Image src={imageUrl} width={95} height={150} alt={title.ua} quality={100} />
            <div className={s.item_info}>
                <h2>{title[myLocale]}</h2>
                <p>{description[myLocale]}</p>
                <div className={s.item_info_product}>
                    <ColorItems colors={[colour.hex]} activeColor={0} size='30' />
                    <div>
                        <span>Размер - {size}</span>
                    </div>
                </div>
                <div className={s.item_info_price}>
                    <CountButton countType='minus' onClick={minus} />
                    <span>{quantity}</span>
                    <CountButton countType='plus' onClick={plus} />
                    <div className={s.price}>{price}</div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;