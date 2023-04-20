import React, { FC } from 'react';
import s from './CatalogFilters.module.scss';
import FiltersCheckbox from './FiltersCheckbox';
const FiltersSizes: FC = () => {
	const SIZES = [
		{ label: 'XS', id: 1 },
		{ label: 'XS-S', id: 2 },
		{ label: 'S', id: 3 },
		{ label: 'S-M', id: 4 },
		{ label: 'M', id: 5 },
		{ label: 'L', id: 6 },
		{ label: 'L-XL', id: 7 },
		{ label: 'XL', id: 8 },
		{ label: '2XL', id: 9 },
		{ label: '3XL', id: 10 },
		{ label: '3XL', id: 11 },
		{ label: '4XL', id: 12 },
	];
	return (
		<>
			<p className={s.filters_title}>Размеры:</p>
			<div className={s.filters_body}>
				{SIZES.map((el) => {
					return (
						<FiltersCheckbox
							key={el?.id + el?.label}
							label={el?.label}
							color={'white'}
							type="size"
							itemId={el?.id}
						/>
					);
				})}
			</div>
		</>
	);
};

export default FiltersSizes;
