import React, { FC, useState, useEffect } from 'react'
import Spinner from '@/components/Spinner/Spinner'
import {
	filterGoods,
	fetchGoods,
	fetchCategories,
	fetchColours,
} from '@/redux/slices/goods'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Link from 'next/link'
import CatalogContext from '@/context/CatalogContext'
import CatalogHeader from './CatalogHeader'
import CatalogItems from './CatalogItems'
import CatalogFilters from './CatalogFilters'
import CatalogPagination from './CatalogPagination'
const Catalog: FC = () => {
	const dispatch = useAppDispatch()
	const sortType = useAppSelector(state => state.goods.sortType)
	const page = useAppSelector(state => state.goods.page)
	const loadingStatus = useAppSelector(state => state.goods.loadingStatus)
	const error = useAppSelector(state => state.goods.errors)
	const [filtersOpened, setFiltersOpened] = useState<boolean>(false)
	useEffect(() => {
		dispatch(fetchGoods())
		dispatch(fetchCategories())
		dispatch(fetchColours())
	}, [])
	useEffect(() => {
		dispatch(filterGoods())
	}, [sortType, page])

	return (
		<CatalogContext.Provider value={{ filtersOpened, setFiltersOpened }}>
			{loadingStatus === 'loading' && <Spinner />}
			<main className='content'>
				<div className='container'>
					<div className='page_coordinator'>
						<Link href='/'>Главная</Link> | <span>Каталог</span>
					</div>
					{loadingStatus === 'error' ? (
						<h5 className='text-center mt-5'>{error}</h5>
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
	)
}

export default Catalog
