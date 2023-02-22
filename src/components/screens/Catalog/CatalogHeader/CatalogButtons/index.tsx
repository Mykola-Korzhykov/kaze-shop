import React from 'react'
import FilterButton from './FilterButton'
import SortButton from './SortButton'
import s from './CatalogButtons.module.scss'
const CatalogButtons = () => {
	return (
		<div className={s.buttonsWrapper}>
			<SortButton text='Сортировать по' />
			<FilterButton text='Фильтр' />
		</div>
	)
}

export default CatalogButtons
