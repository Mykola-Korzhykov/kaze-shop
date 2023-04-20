import React, { FC } from 'react';
import s from './EditProduct.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import {  setPage } from '@/redux/slices/goods';
import { fetchEditGoods } from '@/redux/slices/editProduct';
import { RootState } from '@/redux/store';
import { setActiveProduct } from '@/redux/slices/editProduct';
import { setProductForm } from '@/redux/slices/modal';
//components
import { Item } from './Item';
import { EditProductItem } from './EditProductItem';
import Spinner from '@/components/Spinner/Spinner';
//
import { setLoadingStatus } from '@/redux/slices/goods';
import { Api } from '@/services';
export const EditProduct: FC<{
	imagesData: File[];
	setImages: (n: any) => void;
}> = ({ imagesData, setImages }) => {
	const dispatch = useAppDispatch();
	// const products = useSelector((state: RootState) => state.admin.editProducts);
	const products = useSelector(
		(state: RootState) => state.editProduct.editProducts
	);
	const [paginationArr, setPaginationArr] = React.useState<number[]>([]);
	const [activePagination, setActivePagination] = React.useState<number>(1);

	const editProductItemId = useSelector(
		(state: RootState) => state.admin.editProductItemId
	);

	const [activeId, setActiveId] = React.useState(0);

	React.useEffect(() => {
		dispatch(setLoadingStatus('loading'));
		dispatch(setPage(activePagination));
		dispatch(fetchEditGoods());
		dispatch(setLoadingStatus('idle'));
	}, [activePagination]);

	React.useEffect(() => {
		const fetchSingleProduct = async () => {
			try {
				if (editProductItemId !== -1) {
					dispatch(setLoadingStatus('loading'));
					const data = await Api().goods.getSingleEditProduct(
						editProductItemId
					);
					dispatch(setActiveProduct(data));
					// console.log('edit product item from redux', activeProduct)
					dispatch(setLoadingStatus('idle'));
				}
			} catch (e) {
				dispatch(setLoadingStatus('error'));
				dispatch(
					setProductForm({
						turn: true,
						title: 'Ошибка получения товара',
						subtitle: '',
						btntitle: 'Закрити',
					})
				);
			}
		};
		fetchSingleProduct();
	}, [editProductItemId]);

	React.useEffect(() => {
		if (products) {
			let paginationArrLocation: any[] = [];
			const countPages = Math.ceil(products?.length / 10);
			for (let i = 0; i < countPages; i++) {
				paginationArrLocation.push(i);
			}
			setPaginationArr(paginationArrLocation);
		}
	}, [products]);
	// console.log('paginationArrLocationArr2', paginationArrLocation);




	return (
		<>
			<div className={editProductItemId === -1 ? s.wrapper : s.wrapper_off}>
				{products?.map((obj, ind) => {
					return (
						<Item
							product={obj}
							photo={obj?.images[0]?.imagesPaths[0]}
							price={obj?.price}
							id={obj?.id}
							setActiveId={setActiveId}
							title={obj?.title?.ua}
							key={obj?.id}
						/>
					);
				})}

				<div className={s.pagination_wrapper}>
					{paginationArr.map((el, ind) => {
						{
							return (
								<span
									key={ind + Math.random()}
									onClick={() => {
										setActivePagination(ind + 1);
									}}
									className={
										ind + 1 === activePagination
											? `${s.pagination_item} ${s.pagination_item_active}`
											: s.pagination_item
									}
								>
									{ind + 1}
								</span>
							);
						}
					})}
				</div>
			</div>

			{/* передача фото розмеров та цветов от activeProductEdit */}

			<div className={s.wrapperEditProductItem}>
				<EditProductItem
					id={activeId}
					imagesData={imagesData}
					setImages={setImages}
				/>
			</div>
		</>
	);
};
