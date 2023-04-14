import React, { FC, useState, useEffect } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import ErrorModal from '@/components/UI/ErrorModal';
import { useTranslation } from 'react-i18next';
import {
	filterGoods,
	fetchGoods,
	fetchCategories,
	fetchColours,
	selectGoods,
} from '@/redux/slices/goods';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import CatalogContext from '@/context/CatalogContext';
import CatalogHeader from './CatalogHeader';
import CatalogItems from './CatalogItems';
import CatalogFilters from './CatalogFilters';
import CatalogPagination from './CatalogPagination';
const Catalog: FC = () => {
	const dispatch = useAppDispatch();
	const goods = useAppSelector(selectGoods);
	const { t } = useTranslation();
	const sortType = useAppSelector((state) => state.goods.sortType);
	const page = useAppSelector((state) => state.goods.page);
	const loadingStatus = useAppSelector((state) => state.goods.loadingStatus);
	const catalogLoadingStatus = useAppSelector(
		(state) => state.goods.catalogLoadingStatus
	);
	const error = useAppSelector((state) => state.goods.errors);
	const [filtersOpened, setFiltersOpened] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchColours());
		dispatch(fetchGoods());
	}, [dispatch]);

	return (
		<CatalogContext.Provider value={{ filtersOpened, setFiltersOpened }}>
			{loadingStatus === 'loading' || catalogLoadingStatus === 'loading' ? (
				<Spinner />
			) : null}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">Главная</Link> | <span>Каталог</span>
					</div>
					{loadingStatus === 'error' ? (
						<ErrorModal
							title="505"
							buttonText="Вернуться на главную"
							buttonHref="/"
							description={error}
						/>
					) : (
						<>
							<CatalogHeader />
							{filtersOpened && <CatalogFilters />}
							<CatalogItems />
							<CatalogPagination />
						</>
					)}
				</div>
			</main>
		</CatalogContext.Provider>
	);
};

export default Catalog;
