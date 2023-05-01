import React from 'react';
import s from './OrderDetails.module.scss';
import RoutesPath from '../Product/RoutesPath/RoutesPath';
import { useAppSelector } from '@/redux/hooks';
import Button from '../Main/Button/Button';
import Link from 'next/link';
import { OrderInterfaceProps } from './OrderDetails.interface';
import { useTranslation } from 'next-i18next';

const OrderDetails = ({ orderNum }: OrderInterfaceProps) => {
	const { t } = useTranslation('common');
	const { t: t2 } = useTranslation('cart');
	const { t: orderT } = useTranslation('order');
	const routes = [
		{
			path: t('Main'),
			href: '/',
		},
		{
			path: t2('cart'),
			href: '/card',
		},
	];
	return (
		<div className={s.details}>
			<div className="container">
				<RoutesPath categories={routes} className={s.routes} />

				<div className={s.details_order}>
					<h1>
						{orderT('order')} №{orderNum} {orderT('orderBeingProcessed')}
					</h1>
					<p>
						{orderT('managerWillContactYou')}
						{orderT('whileYouWait')}
					</p>
					<Link href="/catalog" className={s.link}>
						<Button className={s.details_btn}>{t('goToCatalogLink')}</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
