import React from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import CatalogItem from '@/components/screens/Catalog/CatalogItems/CatalogItem';
const RecentlyWatchedProducts = () => {
	return (
		<div className={cl.cabinet_catalogContent}>
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
		</div>
	);
};

export default RecentlyWatchedProducts;
