import React from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Goods } from '@/types/goods';
import CabinetEmptyModal from '../CabinetEmptyModal';
import CatalogItem from '@/components/screens/Catalog/CatalogItems/CatalogItem';
const RecentlyWatchedProducts = () => {
	const watchedProducts = useAppSelector((state) => state.user.watchedProducts);
	const renderGoods = (products: Goods[]) => {
		if (!products?.length) {
			return (
				<CabinetEmptyModal
					title="Вы ничего не смотрели до этого("
					description="Перейдите в каталог, чтобы посмотреть на наши товары"
					btnText="Перейти в каталог"
					btnHref="/catalog"
				/>
			);
		}
		return products?.map((product) => {
			return <CatalogItem product={product} key={product.id} />;
		});
	};
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
