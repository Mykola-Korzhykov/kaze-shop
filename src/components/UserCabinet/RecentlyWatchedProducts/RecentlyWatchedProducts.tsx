import React from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Goods } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';
import CatalogItem from '@/components/screens/Catalog/CatalogItems/CatalogItem';
import { useTranslation } from 'next-i18next';
const RecentlyWatchedProducts = () => {
	const { t } = useTranslation('cabinet');
	const { t: commonT } = useTranslation('common');
	const watchedProducts = useAppSelector((state) => state.user.watchedProducts);
	const renderGoods = (products: Goods[]) => {
		return products?.map((product) => {
			return <CatalogItem product={product} key={product.id} />;
		});
	};

	if (!watchedProducts?.length) {
		return (
			<CabinetEmptyModal
				title={t('nothingViewed')}
				description={t('viewOurProducts')}
				btnText={commonT('goToCatalogLink')}
				btnHref="/catalog"
			/>
		);
	}
	return (
		<div className={cl.cabinet_catalogContent}>
			{/* <CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem /> */}
			{renderGoods(watchedProducts)}
		</div>
	);
};

export default RecentlyWatchedProducts;
