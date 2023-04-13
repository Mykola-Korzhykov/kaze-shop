import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPage } from '@/redux/slices/goods';
import s from './CatalogPagination.module.scss';
import { filterGoods } from '@/redux/slices/goods';
const CatalogPagination: FC = () => {
	const PAGES = [1, 2, 3, 4, 5];
	const dispatch = useAppDispatch();
	const totalProducts = useAppSelector((state) => state.goods.totalProducts);
	const paginationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button: HTMLButtonElement = e.currentTarget;
		dispatch(setPage(+button.value));
		dispatch(filterGoods());
	};
	return (
		<div className={s.paginationWrapper}>
			{new Array(Math.ceil(totalProducts / 10)).fill(null).map((el, id) => {
				return (
					<button
						value={id + 1}
						onClick={paginationHandler}
						key={id}
						className={s.paginationItem}
					>
						{id + 1}
					</button>
				);
			})}
		</div>
	);
};

export default CatalogPagination;
