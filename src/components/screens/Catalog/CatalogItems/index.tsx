import React from 'react'
import { selectGoods } from '@/redux/slices/goods'
import { useAppSelector } from '@/redux/hooks'
import s from './CatalogItems.module.scss'
import CatalogItem from './CatalogItem'
const CatalogItems = () => {
	const goods = useAppSelector(selectGoods)
	return (
		<div className={s.wrapper}>
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			{/* {goods.map(product => {
				return <CatalogItem product={product} key={product.id}/>
			})} */}
		</div>
	)
}

export default CatalogItems
