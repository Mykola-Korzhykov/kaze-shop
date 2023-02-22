import React from 'react'
import CatalogButtons from './CatalogButtons'
import s from './catalogHeader.module.scss'
const CatalogHeader = () => {
	return (
		<div className={s.header}>
			<span className={s.goodsCount}>26 товаров найдено</span>
			<CatalogButtons />
		</div>
	)
}

export default CatalogHeader
