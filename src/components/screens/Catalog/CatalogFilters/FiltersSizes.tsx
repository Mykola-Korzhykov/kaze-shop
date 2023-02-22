import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersSizes = () => {
	const SIZES = ['XS', 'S', 'M', 'L', 'XL']
	return (
		<>
			<p className={s.filters_title}>Размеры:</p>
			<div className={s.filters_body}>
				{SIZES.map(el => {
					return <FiltersCheckbox label={el} color={'white'} />
				})}
			</div>
		</>
	)
}

export default FiltersSizes
