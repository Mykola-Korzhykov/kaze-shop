import React from 'react'
import s from './CatalogItems.module.scss'
import CatalogItem from './CatalogItem'
const CatalogItems = () => {
	return (
		<div className={s.wrapper}>
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
		</div>
	)
}

export default CatalogItems
