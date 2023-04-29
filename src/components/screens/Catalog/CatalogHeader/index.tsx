import React, { FC } from 'react';
import { useAppSelector } from '@/redux/hooks';
import CatalogButtons from './CatalogButtons';
import s from './catalogHeader.module.scss';
import { useTranslation } from 'next-i18next';
const CatalogHeader: FC = () => {
	const { t } = useTranslation('catalog');
	const totalProducts = useAppSelector((state) => state.goods.totalProducts);
	return (
		<div className={s.header}>
			<span className={s.goodsCount}>
				{totalProducts} {t('products_found')}
			</span>
			<CatalogButtons />
		</div>
	);
};

export default CatalogHeader;
