import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersColors from './FiltersColors'
import FiltersSizes from './FiltersSizes'
import FiltersButton from './FiltersButton'
const CatalogFilters = () => {
	return (
		<div className={s.filters_wrapper}>
			<FiltersColors />
			<FiltersSizes />
			<FiltersButton />
		</div>
	)
}

export default CatalogFilters
