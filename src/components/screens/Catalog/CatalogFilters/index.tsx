import React, { FC } from 'react'
import s from './CatalogFilters.module.scss'
import FiltersColors from './FiltersColors'
import FiltersSizes from './FiltersSizes'
import FiltersButton from './FiltersSubmitButton'
import FiltersCategories from './FiltersCategories'
const CatalogFilters: FC = () => {
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
