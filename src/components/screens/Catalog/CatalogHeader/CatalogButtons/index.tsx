import React from 'react'
import CatalogButton from './CatalogButton'
import s from './CatalogButtons.module.scss'
const CatalogButtons = () => {
	return (
		<div className={s.buttonsWrapper}>
			<CatalogButton needIcon={true} text={'Сортировать по'} />
			<CatalogButton text='Фильтр' />
		</div>
	)
}

export default CatalogButtons
