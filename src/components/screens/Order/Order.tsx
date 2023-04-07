import React, { useState } from 'react';
import s from './Order.module.scss';
import RoutesPath from '../Product/RoutesPath/RoutesPath';
import StepOne from './StepOne/StepOne';
import CartBlock from './CartBlock/CartBlock';
import StepTitle from './StepTitle/OrderStep';

const mocCartItem = {
    id: 1,
    title: 'Топик через плече',
    description: 'Lorem ipsum dolor sit amet consectetur. Convallis ',
    color: '#000',
    size: 'S',
    count: 2,
    price: '44$',
    img: 'https://mari-m.com.ua/i/upload/b/mi512shlzholosinizhn.jpg',

}

const path = [{ path: 'Главная', href: '/' }, { path: 'Корзина', href: '/cart' }, { path: 'Оформление заказа', href: '/test' }];

const Order = (): JSX.Element => {
    const [handleCheck, setHandleCheck] = useState<boolean>(false);

    return (
        <div className={s.order}>
            <div className='container'>
                <RoutesPath categories={path} className={s.path} />
                <div className={s.form_block}>
                    <div className={s.step}>
                        <StepTitle step={1} title='Контактная информация' active={true} className={s.step_one_title} />
                        <StepOne />
                        <StepTitle step={2} title='Доставка и оплата' active={false} className={s.step_two_title} />
                    </div>
                    <CartBlock className={s.cart} />
                </div>
            </div>
        </div>
    );
};

export default Order;