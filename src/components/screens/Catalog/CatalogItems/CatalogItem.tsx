import React from 'react'
import s from './CatalogItems.module.scss'
import Image from 'next/image'
import catalogImg from '../../../../assets/images/catalogItem.png'

const CatalogItem = () => {
	return (
		<div className={s.catalogItem}>
			<Image
				src={catalogImg}
				alt='Лосины Тай дай'
				width={285}
				height={360}
				quality={95}
			/>
			<p className={s.title}>Лосины Тай дай</p>
			<span className={s.price}>78$</span>
			<div className={s.footer}>
				<button className={s.button}>В корзину</button>
				<button className={s.icon}></button>
			</div>
		</div>
	)
}

export default CatalogItem
