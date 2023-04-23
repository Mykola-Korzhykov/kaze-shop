import React, { FC, useState, useEffect } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import ErrorModal from '@/components/UI/ErrorModal';
import { useTranslation } from 'next-i18next';
import {
	filterGoods,
	fetchGoods,
	fetchCategories,
	fetchColours,
	selectGoods,
	fetchGoodsData,
} from '@/redux/slices/goods';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import CatalogContext from '@/context/CatalogContext';
import CatalogHeader from './CatalogHeader';
import CatalogItems from './CatalogItems';
import CatalogFilters from './CatalogFilters';
import CatalogPagination from './CatalogPagination';
import { useRouter } from 'next/router';
const Catalog: FC = () => {
	const dispatch = useAppDispatch();
	const { t: t2 } = useTranslation('common');
	const { t } = useTranslation('catalog');
	const loadingStatus = useAppSelector((state) => state.goods.loadingStatus);
	const catalogLoadingStatus = useAppSelector(
		(state) => state.goods.catalogLoadingStatus
	);
	const error = useAppSelector((state) => state.goods.errors);
	const [filtersOpened, setFiltersOpened] = useState<boolean>(false);

	useEffect(() => {
		// dispatch(fetchGoods());
		// dispatch(fetchCategories());
		// dispatch(fetchColours());
		dispatch(fetchGoodsData());
	}, [dispatch]);

	return (
		<CatalogContext.Provider value={{ filtersOpened, setFiltersOpened }}>
			{loadingStatus === 'loading' ? <Spinner /> : null}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">{t2('Main')}</Link> | <span>{t('Catalog')}</span>
					</div>

					{loadingStatus === 'error' ? (
						<ErrorModal
							title="505"
							buttonText={'Вернуться на главную'}
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
					{/* <CatalogHeader />
					{filtersOpened && <CatalogFilters />}
					<CatalogItems />
					<CatalogPagination /> */}
				</div>
			</main>
		</CatalogContext.Provider>
	);
};

export default Catalog;
