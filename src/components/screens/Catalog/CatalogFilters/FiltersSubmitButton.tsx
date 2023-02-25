import React from 'react'
import { filterGoods } from '@/redux/slices/goods'
import { useAppDispatch } from '@/redux/hooks'
import s from './CatalogFilters.module.scss'
const FiltersButton = () => {
	const dispatch = useAppDispatch()
	const submitFilter = () => {
		dispatch(filterGoods())
	}
	return (
		<div className={s.filters_buttonWrapper}>
			<button onClick={submitFilter} className={s.filters_submitBtn}>
				Застосувати фільтри
			</button>
		</div>
	)
}

export default FiltersButton
