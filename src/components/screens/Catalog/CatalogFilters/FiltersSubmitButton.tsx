import React from 'react'
import s from './CatalogFilters.module.scss'
const FiltersButton = () => {
	return (
		<div className={s.filters_buttonWrapper}>
			<button className={s.filters_submitBtn}>Застосувати фільтри</button>
		</div>
	)
}

export default FiltersButton
