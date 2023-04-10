import React from 'react';
import { selectGoods } from '@/redux/slices/goods';
import { useAppSelector } from '@/redux/hooks';
import { Goods } from '@/types/goods';
import s from './CatalogItems.module.scss';
import CatalogItem from './CatalogItem';
const CatalogItems = () => {
	const goods = useAppSelector(selectGoods);
	const renderGoods = (arr: Goods[] | null) => {
		return arr?.map((product) => {
			return <CatalogItem product={product} key={product.id} />;
		});
	};
	return (
		<>
			{!goods?.length ? (
				<div>
					<h1 className="catalog_title">
						Товарів за таким запитом не знайдено
					</h1>
				</div>
			) : (
				<div className={s.wrapper}>{renderGoods(goods)}</div>
			)}
		</>
	);
};

export default CatalogItems;
