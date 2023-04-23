import React from 'react';
import { selectGoods } from '@/redux/slices/goods';
import { useAppSelector } from '@/redux/hooks';
import { Goods } from '@/types/goods';
import s from './CatalogItems.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { fetchGoods } from '@/redux/slices/goods';
import CatalogItem from './CatalogItem';
const CatalogItems = () => {
	const dispatch = useAppDispatch();
	const goods = useAppSelector(selectGoods);
	const renderGoods = (arr: Goods[] | null) => {
		return arr?.map((product) => {
			return <CatalogItem product={product} key={product?.id} />;
		});
	};
	const refetchAllGoods = () => {
		dispatch(fetchGoods());
	};
	return (
		<>
			{!goods?.length ? (
				<div className="catalog_noProducts">
					<h1 className="catalog_title">
						Товарів за таким запитом не знайдено
					</h1>
					<button className="catalog_refetchBtn" onClick={refetchAllGoods}>
						Загрузить все товары
					</button>
				</div>
			) : (
				<div className={s.wrapper}>{renderGoods(goods)}</div>
			)}
			{/* <div className={s.wrapper}>
				<CatalogItem />
				<CatalogItem />
				<CatalogItem />
				<CatalogItem />
			</div> */}
		</>
	);
};

export default CatalogItems;
