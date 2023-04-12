import React from 'react';
import s from './OrderDetails.module.scss';
import RoutesPath from '../Product/RoutesPath/RoutesPath';
import { useAppSelector } from '@/redux/hooks';
import Button from '../Main/Button/Button';
import Link from 'next/link';
import { OrderInterfaceProps } from './OrderDetails.interface';

const routes = [
    {
        path: 'Главная',
        href: '/'
    },
    {
        path: 'Корзина',
        href: '/card'
    },

]

const OrderDetails = ({ orderNum }: OrderInterfaceProps) => {

    return (
        <div className={s.details}>
            <div className='container'>
                <RoutesPath categories={routes} className={s.routes} />

                <div className={s.details_order}>
                    <h1>Заказ №{orderNum} уже в обработке</h1>
                    <p>
                        В ближайшее время с Вами свяжется наш менеджер, который уточнит все детали по заказу. Пока вы ждете,  вы можете заказать что то еще)
                    </p>
                    <Link href='/catalog' className={s.link}>
                        <Button className={s.details_btn}>Перейти в каталог</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;