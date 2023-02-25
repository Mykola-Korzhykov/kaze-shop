import React, { FC } from 'react'
import s from './CatalogFilters.module.scss'
import FiltersCheckbox from './FiltersCheckbox'
const FiltersSizes: FC = () => {
	const SIZES = [
		{ label: 'XS', id: 1 },
		{ label: 'S', id: 2 },
		{ label: 'M', id: 3 },
		{ label: 'L', id: 4 },
		{ label: 'XL', id: 5 },
		{ label: 'XXS', id: 6 },
		{ label: 'XXL', id: 7 },
	]
	return (
		<>
			<p className={s.filters_title}>Размеры:</p>
			<div className={s.filters_body}>
				{SIZES.map((el, id) => {
					return (
						<FiltersCheckbox
							key={el.id}
							label={el.label}
							color={'white'}
							type='size'
							itemId={el.id}
						/>
					)
				})}
			</div>
		</>
	)
}

export default FiltersSizes
