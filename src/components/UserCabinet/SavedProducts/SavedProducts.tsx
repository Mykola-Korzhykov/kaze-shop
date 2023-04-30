import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import cl from '../../../styles/cabinet2.module.scss';
import CatalogItem from '@/components/screens/Catalog/CatalogItems/CatalogItem';
import CabinetEmptyModal from '../CabinetEmptyModal';
import { useTranslation } from 'next-i18next';
import { Goods } from '@/types/goods';
const SavedProducts = () => {
	const { t } = useTranslation('cabinet');
	const { t: commonT } = useTranslation('common');
	const savedProducts = useAppSelector((state) => state.user.savedProducts);
	const renderGoods = (products: Goods[]) => {
		return products?.map((product) => {
			return <CatalogItem product={product} key={product?.id} />;
		});
	};

	if (!savedProducts?.length) {
		return (
			<CabinetEmptyModal
				title={t('noBookmarks')}
				description={t('saveFirstProducts')}
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
			{renderGoods(savedProducts)}
		</div>
	);
};

export default SavedProducts;
