import React, { FC } from 'react'
import s from './CatalogPagination.module.scss'
const CatalogPagination: FC = () => {
	const PAGES = [1, 2, 3, 4, 5]
	return (
		<div className={s.paginationWrapper}>
			{PAGES.map((el, id) => {
				return (
					<button key={id} className={s.paginationItem}>
						{el}
					</button>
				)
			})}
		</div>
	)
}

export default CatalogPagination
