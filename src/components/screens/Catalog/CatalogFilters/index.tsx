import React, { FC } from 'react'
import { useAppSelector } from '@/redux/hooks'
import s from './CatalogFilters.module.scss'
import FiltersColors from './FiltersColours'
import FiltersSizes from './FiltersSizes'
import FiltersButton from './FiltersSubmitButton'
import FiltersCategories from './FiltersCategories'
const CatalogFilters: FC = () => {
	const { filterCategories, filterColours, filterSizes } = useAppSelector(
		state => state.goods
	)
	// console.log('categ',filterCategories)
	// console.log('coloi',filterColours)
	// console.log('size',filterSizes)
	return (
		<div className={s.filters_wrapper}>
			<FiltersColors />
			<FiltersCategories />
			<FiltersSizes />
			<FiltersButton />
		</div>
	)
}

export default CatalogFilters
