import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { selectFetchedColours } from '@/redux/slices/goods'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersColours = () => {
	const fetchedColours = useAppSelector(selectFetchedColours)
	const COLORS = [
		{ label: 'Бежевый', hex: '#FFE4C4', id: 1 },
		{ label: 'Капучинный', hex: '#9F8E84', id: 2 },
		{ label: 'Синий', hex: '#000080', id: 3 },
		{ label: 'Голубой', hex: '#A6BEE5', id: 4 },
		{ label: 'Коричневый', hex: '#0B0B0B', id: 5 },
		{ label: 'Изумрудный', hex: '#24514C', id: 6 },
		{ label: 'Розовый', hex: '#FFC0CB', id: 7 },
		{ label: 'Фиолетовый', hex: '#800080', id: 8 },
		{ label: 'Черный', hex: '#0B0B0B', id: 52 },
		{ label: 'Оливковый', hex: '#829E86', id: 432 },
		{ label: 'Белый', hex: '#fff', id: 34314 },
		{ label: 'Серый', hex: '#808080', id: 13413413413 },
		{ label: 'Графитовый', hex: '#525A5B', id: 57567 },
		{ label: 'Пудровый', hex: '#F2E2D8', id: 75756756 },
	]
	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>Цвет:</p>
			<div className={s.filters_body}>
				{COLORS.map(el => {
					return (
						<FiltersCheckbox
							label={el.label}
							color={el.hex}
							key={el.id}
							type='colour'
							itemId={el.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default FiltersColours
