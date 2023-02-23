import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersColors from './FiltersColors'
import FiltersSizes from './FiltersSizes'
import FiltersButton from './FiltersButton'
import FiltersCategories from './FiltersCategories'
const CatalogFilters = () => {
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
