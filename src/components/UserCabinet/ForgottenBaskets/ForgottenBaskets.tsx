import React, { FC } from 'react';
import ForgottenBasketsItem from './ForgottenBasketsItem';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { CartProduct } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';
const ForgottenBaskets: FC<{ setShowModal: (state: boolean) => void }> = ({setShowModal}) => {
	const leftCarts = useAppSelector((state) => state.user.leftCarts);

	const renderForgottenBaskets = (arr: CartProduct[] | []) => {
		return arr?.map((product) => {
			return <ForgottenBasketsItem setShowModal={setShowModal} product={product} key={product?.id} />;
		});
	};

	if (!leftCarts?.length) {
		return (
			<CabinetEmptyModal
				title="У Вас нету собранных корзин"
				description="Но Вы можете это исправить. Перейдите в каталог, и соберите первую корзину"
				btnText="Перейти в каталог"
				btnHref="/catalog"
			/>
		);
	}
	return (
		<div className={cl.cart_carts}>{renderForgottenBaskets(leftCarts)}</div>
	);
};

export default ForgottenBaskets;
