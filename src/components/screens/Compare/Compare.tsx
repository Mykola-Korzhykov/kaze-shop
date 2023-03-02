import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './Compare.module.scss'
import cartImage from '../../../assets/images/cartItem.png'
import catalogItem from '../../../assets/images/catalogItem.png'

const Compare = () => {
	return (
		<main className='content'>
			<div className='container'>
				<div className={s.body}>
					<div className={s.mainItem}>
						<div className={s.main_imgWrapper}>
							<Image
								src={catalogItem}
								alt='Cart image'
								className={s.main_img}
								priority={true}
								quality={95}
							/>
						</div>
					</div>
					<div className={s.items}>
						<div className={s.item}></div>
						<div className={s.item}></div>
						<div className={s.item}></div>
						<button className={s.skip}>Пропустить</button>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Compare
