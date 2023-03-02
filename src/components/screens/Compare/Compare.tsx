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
					<div className={s.main_item}>
						<div className={s.main_imgWrapper}>
							<Image
								src={catalogItem}
								alt='Cart image'
								className={s.main_img}
								priority={true}
								quality={95}
							/>
						</div>
						<div className={s.main_text}>
							<p className={s.main_title}>Лосины Тай Дай</p>
							<p className={s.main_price}>78$</p>
						</div>
						<div className={s.selects}>
							<div className={s.select_size}></div>
							<div className={s.select_color}></div>
						</div>
					</div>
					<div className={s.items}>
						<div className={s.item}>
							<div className={s.imgWrapper}>
								<Image
									src={cartImage}
									alt='Cart image'
									className={s.img}
									priority={true}
									quality={95}
								/>
							</div>
							<div className={s.content}>
								<div className={s.text}>
									<p className={s.title}>Топик через плече</p>
									<p className={s.descr}>
										Lorem ipsum dolor sit amet consectetur. Convallis
										suspendisse diam iaculis pulvinar odio curabitur mattis
										nemore zerhadе
									</p>
								</div>
								<div className={s.addition}>
									<button>+</button>
								</div>
							</div>
						</div>
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
