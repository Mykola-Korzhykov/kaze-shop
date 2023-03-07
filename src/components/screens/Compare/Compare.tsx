import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './Compare.module.scss'
import cartImage from '../../../assets/images/cartItem.png'
import catalogItem from '../../../assets/images/compare.png'
import CompareModal from './CompareModal'
const Compare = () => {
	const [sizeActive, setSizeActive] = React.useState<boolean>(true)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	return (
		<main className='content'>
			<div className='container'>
				<CompareModal />
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
						<div className={s.main_content}>
							<div className={s.main_text}>
								<p className={s.main_title}>Лосины Тай Дай</p>
								<p className={s.main_price}>78$</p>
							</div>
							<div className={s.selects}>
								<div className={s.select_size}>
									<button
										onClick={() => setSizeActive(prev => !prev)}
										className={`${s.size_btn} ${sizeActive ? `${s.open}` : ''}`}
									>
										XL
									</button>
									{sizeActive && (
										<div className={s.size_droplist}>
											<button className={s.size_btn}>M</button>
											<button className={s.size_btn}>XXL</button>
											<button className={s.size_btn}>S</button>
										</div>
									)}
								</div>
								<div className={s.select_color}>
									<button
										onClick={() => setColorActive(prev => !prev)}
										className={`${s.color_btn} ${
											colorActive ? `${s.open}` : ''
										}`}
									>
										<p style={{ backgroundColor: '#CB9919' }}></p>
									</button>
									{colorActive && (
										<div className={s.color_droplist}>
											<button className={s.color_btn}>
												<p style={{ backgroundColor: '#7C5F72' }}></p>
											</button>
											<button className={s.color_btn}>
												<p style={{ backgroundColor: '#607C5F' }}></p>
											</button>
											<button className={s.color_btn}>
												<p style={{ backgroundColor: '#747C5F' }}></p>
											</button>
										</div>
									)}
								</div>
							</div>
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
									<p className={s.price}>78$</p>
								</div>

								<button className={s.plus}></button>
							</div>
						</div>
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
									<p className={s.price}>78$</p>
								</div>

								<button className={s.plus}></button>
							</div>
						</div>
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
									<p className={s.price}>78$</p>
								</div>

								<button className={s.plus}></button>
							</div>
						</div>

						<div className={s.skip_wrapper}>
							<Link href={'/cart'}>
								<button className={s.skip}>Пропустить</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Compare
