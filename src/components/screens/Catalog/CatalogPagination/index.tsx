import React, { FC } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setPage } from '@/redux/slices/goods'
import s from './CatalogPagination.module.scss'
const CatalogPagination: FC = () => {
	const PAGES = [1, 2, 3, 4, 5]
	const dispatch = useAppDispatch()
	const paginationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button: HTMLButtonElement = e.currentTarget
		dispatch(setPage(+button.value))
	}
	return (
		<div className={s.paginationWrapper}>
			{PAGES.map((el, id) => {
				return (
					<button
						value={el}
						onClick={paginationHandler}
						key={id}
						className={s.paginationItem}
					>
						{el}
					</button>
				)
			})}
		</div>
	)
}

export default CatalogPagination
