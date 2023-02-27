import React, { FC } from 'react'
import { useAppSelector } from '@/redux/hooks'
import CatalogButtons from './CatalogButtons'
import s from './catalogHeader.module.scss'

const CatalogHeader: FC = () => {
	const totalProducts = useAppSelector(state => state.goods.totalProducts)
	return (
		<div className={s.header}>
			<span className={s.goodsCount}>{totalProducts} товаров найдено</span>
			<CatalogButtons />
		</div>
	)
}

export default CatalogHeader
