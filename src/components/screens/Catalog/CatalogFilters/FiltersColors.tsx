import React from 'react'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersColors = () => {
	const COLORS = [
		{ label: 'Бежевый', color: '#FFE4C4' },
		{ label: 'Капучинный', color: '#9F8E84' },
		{ label: 'Синий', color: '#000080' },
		{ label: 'Бежевый', color: '#FFE4C4' },
		{ label: 'Капучинный', color: '#9F8E84' },
		{ label: 'Синий', color: '#000080' },
		{ label: 'Бежевый', color: '#FFE4C4' },
		{ label: 'Капучинный', color: '#9F8E84' },
		{ label: 'Синий', color: '#000080' },
		{ label: 'Бежевый', color: '#FFE4C4' },
		{ label: 'Капучинный', color: '#9F8E84' },
		{ label: 'Синий', color: '#000080' },
	]
	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>Цвет:</p>
			<div className={s.filters_body}>
				{COLORS.map(el => {
					return <FiltersCheckbox label={el.label} color={el.color} />
				})}
			</div>
		</div>
	)
}

export default FiltersColors
