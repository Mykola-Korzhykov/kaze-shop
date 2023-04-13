import React from 'react';
import s from './CartItem.module.scss';
import CartItem from '../CartItem/CartItem';
import { CartBlockProps } from './CartBlock.interface';
import cn from 'classnames';

const mocCartItem = [{
    id: 1,
    title: 'Топик через плече',
    description: 'Lorem ipsum dolor sit amet consectetur. Convallis ',
    color: '#000',
    size: 'S',
    count: 2,
    price: '44$',
    img: 'https://mari-m.com.ua/i/upload/b/mi512shlzholosinizhn.jpg',

},
{
    id: 2,
    title: 'Топик через плече',
    description: 'Lorem ipsum dolor sit amet consectetur. Convallis ',
    color: '#000',
    size: 'S',
    count: 2,
    price: '44$',
    img: 'https://mari-m.com.ua/i/upload/b/mi512shlzholosinizhn.jpg',

}];
const CartBlock = ({ className, ...props }: CartBlockProps): JSX.Element => {
    return (
        <div className={cn(s.cart_block, className)} {...props}>
            <h2>Ваш заказ</h2>

            <div>
                {mocCartItem.map((item) => <CartItem className={s.item} key={item.id} {...item} />)}
            </div>

            <div className={s.total}>
                <span>Вместе</span>
                <span>147$</span>
            </div>
        </div>
    );
};

export default CartBlock;