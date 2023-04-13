import React, { useEffect } from 'react';
import s from './Order.module.scss';
import RoutesPath from '../Product/RoutesPath/RoutesPath';
import StepOne from './StepOne/StepOne';
import CartBlock from './CartBlock/CartBlock';
import StepTitle from './StepTitle/OrderStep';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import StepTwo from './StepTwo/StepTwo';
import { orderInit } from '@/redux/slices/order';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';

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
    const { stepOne, stepTwo } = useAppSelector(store => store.order);
    const dispatch = useAppDispatch();

    // const ErrorAnimate = motion.data(ErrorMessage)
    useEffect(() => {
        dispatch(orderInit());
    }, [])

    return (
        <div className={s.order}>
            <div className='container'>
                <RoutesPath categories={path} className={s.path} />
                <div className={s.form_block}>
                    <div className={s.step}>
                        <StepTitle step={1} title='Контактная информация' active={stepOne !== 'success'} className={s.step_one_title} />
                        <StepOne />
                        <StepTitle step={2} title='Доставка и оплата' active={stepOne === 'success'} className={s.step_two_title} />
                        <StepTwo />
                    </div>
                    <CartBlock className={s.cart} />
                </div>
            </div>
            <AnimatePresence>
                {[stepOne, stepTwo].includes('error') && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <ErrorMessage />
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default Order;


