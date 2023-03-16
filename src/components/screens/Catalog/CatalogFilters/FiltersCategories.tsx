import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { selectFetchedCategories } from '@/redux/slices/goods'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersCategories = () => {
	const fetchedCategories = useAppSelector(selectFetchedCategories)
	const CATEGORIES = [
		{ label: 'Лосины', id: 1 },
		{ label: 'Костюмы', id: 2 },
		{ label: 'Велосипедки', id: 3 },
		{ label: 'Повседневное  белье', id: 4 },
		{ label: 'Сумки', id: 5 },
		{ label: 'Топы', id: 6 },
	]
	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>Категории:</p>
			<div className={s.filters_body}>
				{fetchedCategories?.map((el, id) => {
					return (
						<FiltersCheckbox
							key={id}
							label={el.ua}
							color={'white'}
							type='category'
							itemId={el.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default FiltersCategories
