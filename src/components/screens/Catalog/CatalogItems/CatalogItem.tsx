import React from 'react'
import s from './CatalogItems.module.scss'
import Image from 'next/image'
import catalogImg from '../../../../assets/images/catalogItem.png'

const CatalogItem = () => {
	return (
		<div className={s.catalogItem}>
			<div className={s.imgWrapper}>
				<Image
					className={s.img}
					src={catalogImg}
					alt='Лосины Тай дай'
					quality={95}
				/>
			</div>
			<div>
				<p className={s.title}>Лосины Тай дай</p>
				<span className={s.price}>78$</span>
			</div>
			<div className={s.footer}>
				<button className={s.footer_button}>В корзину</button>
				<button className={s.footer_icon}></button>
			</div>
		</div>
	)
}

export default CatalogItem
