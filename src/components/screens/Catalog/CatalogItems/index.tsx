import React from 'react'
import { selectGoods } from '@/redux/slices/goods'
import { useAppSelector } from '@/redux/hooks'
import { Goods } from '@/types/goods'
import s from './CatalogItems.module.scss'
import CatalogItem from './CatalogItem'
const CatalogItems = () => {
	const goods = useAppSelector(selectGoods)
	const renderGoods = (arr: Goods[] | null) => {
		return arr?.map(product => {
			return <CatalogItem product={product} key={product.id} />
		})
	}
	return (
		<div className={s.wrapper}>
			{renderGoods(goods)}
		</div>
	)
}

export default CatalogItems
