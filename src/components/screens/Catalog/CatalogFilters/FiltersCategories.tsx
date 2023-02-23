import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersCategories = () => {
	const CATEGORIES = [
		'Лосины',
		'Костюмы',
		'Велосипедки',
		'Повседневное  белье',
		'Сумки',
		'Топы',
	]
	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>Категории:</p>
			<div className={s.filters_body}>
				{CATEGORIES.map((el, id) => {
					return <FiltersCheckbox key={id} label={el} color={'white'} />
				})}
			</div>
		</div>
	)
}

export default FiltersCategories
