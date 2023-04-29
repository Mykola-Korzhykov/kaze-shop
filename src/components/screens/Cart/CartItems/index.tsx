import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { CartProductItem } from '@/types/goods';
import ErrorModal from '@/components/UI/ErrorModal';
import s from './CartItems.module.scss';
import { useTranslation } from 'next-i18next';
import CartItem from './CartItem';
const CartItems = () => {
	const { t } = useTranslation('cart');
	const { t: commonT } = useTranslation('common');
	const basketOfProducts = useAppSelector(
		(state) => state.goods.basketOfProducts
	);
	const renderGoods = (arr: CartProductItem[] | []) => {
		if (!arr?.length) {
			return (
				<ErrorModal
					title={t('empty_cart')}
					buttonText={commonT('goToCatalogLink')}
					buttonHref="/catalog"
					description={t('goToCatalog')}
					smallModal={true}
				/>
			);
		}
		return arr?.map((product) => {
			return <CartItem product={product} key={product.id} />;
		});
	};
	return (
		<div className={s.wrapper}>
			{renderGoods(basketOfProducts?.cartProducts)}
		</div>
	);
};
export default CartItems;
