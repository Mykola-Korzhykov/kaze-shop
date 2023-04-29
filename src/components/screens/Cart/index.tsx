import React from 'react';
import Link from 'next/link';
import Spinner from '@/components/Spinner/Spinner';
import { getCartProducts } from '@/redux/slices/goods';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartHeader from './CartHeader';
import CartItems from './CartItems';
import CartFooter from './CartFooter';
import { useTranslation } from 'next-i18next';

const Cart = () => {
	const { t } = useTranslation('cart');
	const { t: commonT } = useTranslation('common');
	const dispatch = useAppDispatch();
	const loadingStatus = useAppSelector((state) => state.goods.loadingStatus);
	const cartLoadingStatus = useAppSelector(
		(state) => state.goods.cartLoadingStatus
	);
	React.useEffect(() => {
		dispatch(getCartProducts());
	}, []);
	return (
		<>
			{loadingStatus === 'loading' && <Spinner />}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">{commonT('Main')}</Link> | <span>{t('cart')}</span>
					</div>
					<CartHeader />
					<CartItems />
					<CartFooter />
				</div>
			</main>
		</>
	);
};

export default Cart;
