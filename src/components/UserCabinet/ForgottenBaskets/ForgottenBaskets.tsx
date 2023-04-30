import React, { FC } from 'react';
import ForgottenBasketsItem from './ForgottenBasketsItem';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { CartProduct } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';
import { useTranslation } from 'next-i18next';
const ForgottenBaskets: FC<{ setShowModal: (state: boolean) => void }> = ({
	setShowModal,
}) => {
	const { t } = useTranslation('cabinet');
	const { t: commonT } = useTranslation('common');
	const leftCarts = useAppSelector((state) => state.user.leftCarts);

	const renderForgottenBaskets = (arr: CartProduct[] | []) => {
		return arr?.map((product) => {
			return (
				<ForgottenBasketsItem
					setShowModal={setShowModal}
					product={product}
					key={product?.id}
				/>
			);
		});
	};

	if (!leftCarts?.length) {
		return (
			<CabinetEmptyModal
				title={t('noCollectedCarts')}
				description={t('noCollectedCartsText')}
				btnText={commonT('goToCatalogLink')}
				btnHref="/catalog"
			/>
		);
	}
	return (
		<div className={cl.cart_carts}>{renderForgottenBaskets(leftCarts)}</div>
	);
};

export default ForgottenBaskets;
