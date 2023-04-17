import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import cl from '../../../styles/cabinet2.module.scss';
import CatalogItem from '@/components/screens/Catalog/CatalogItems/CatalogItem';
import CabinetEmptyModal from '../CabinetEmptyModal';
import { Goods } from '@/types/goods';
const SavedProducts = () => {
	const savedProducts = useAppSelector((state) => state.user.savedProducts);
	const renderGoods = (products: Goods[]) => {
		if (!products?.length) {
			return (
				<CabinetEmptyModal
					title="У Вас нет закладок"
					description="Но вы можете это исправить! Перейдите в каталог и сохраните свои первые товары"
					btnText="Перейти в каталог"
					btnHref="/catalog"
				/>
			);
		}
		return products?.map((product) => {
			return <CatalogItem product={product} key={product?.id} />;
		});
	};
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
