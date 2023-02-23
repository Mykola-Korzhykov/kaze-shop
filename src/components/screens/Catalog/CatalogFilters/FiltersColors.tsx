import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersColors = () => {
	const COLORS = [
		{ label: 'Бежевый', color: '#FFE4C4', id: 1 },
		{ label: 'Капучинный', color: '#9F8E84', id: 2 },
		{ label: 'Синий', color: '#0000FF', id: 3 },
		{ label: 'Бежевый', color: '#FFE4C4', id: 4 },
		{ label: 'Капучинный', color: '#9F8E84', id: 5 },
		{ label: 'Синий', color: '#0000FF', id: 6 },
		{ label: 'Бежевый', color: '#FFE4C4', id: 7 },
		{ label: 'Капучинный', color: '#9F8E84', id: 8 },
		{ label: 'Синий', color: '#0000FF', id: 52 },
		{ label: 'Бежевый', color: '#FFE4C4', id: 432 },
		{ label: 'Капучинный', color: '#9F8E84', id: 34314 },
		{ label: 'Синий', color: '#0000FF', id: 13413413413 },
	]
	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>Цвет:</p>
			<div className={s.filters_body}>
				{COLORS.map(el => {
					return (
						<FiltersCheckbox label={el.label} color={el.color} key={el.id} />
					)
				})}
			</div>
		</div>
	)
}

export default FiltersColors
