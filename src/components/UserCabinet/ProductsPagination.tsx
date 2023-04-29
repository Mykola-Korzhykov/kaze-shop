import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPage } from '@/redux/slices/user';
import s from '../screens/Catalog/CatalogPagination/CatalogPagination.module.scss';
const ProductsPagination: FC = () => {
	const dispatch = useAppDispatch();
	const totalProducts = useAppSelector((state) => state.user.totalProducts);
	const paginationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button: HTMLButtonElement = e?.currentTarget;
		dispatch(setPage(+button?.value));
	};
	return (
		<div className={s.paginationWrapper}>
			{new Array(Math.ceil(totalProducts / 10)).fill(null).map((el, id) => {
				return (
					<button
						value={id + 1}
						onClick={paginationHandler}
						key={id + Math.random()}
						className={s.paginationItem}
					>
						{id + 1}
					</button>
				);
			})}
		</div>
	);
};

export default ProductsPagination;
