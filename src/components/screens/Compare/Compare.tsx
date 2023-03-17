import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { fetchCompareOfferProducts } from '@/redux/slices/goods'
import s from './Compare.module.scss'
import cartImage from '../../../assets/images/cartItem.png'
import catalogItem from '../../../assets/images/compare.png'
import CompareModal from './CompareModal'
import { useRouter } from 'next/router'
const Compare = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const compareProduct = useAppSelector(state => state.goods.compareProduct)
	const [sizeActive, setSizeActive] = React.useState<boolean>(false)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	const [showModal, setShowModal] = React.useState<boolean>(false)
	const [selectedSizeEl, setSelectedSizeEl] = React.useState<string | null>(
		null
	)
	const [selectedColorEl, setSelectedColorEl] = React.useState<string | null>(
		null
	)
	const SIZES = ['XS-S', 'S', 'XS']
	const COLOURS = ['#ffc0cb', 'red', 'black']
	React.useEffect(() => {
		if (!compareProduct) {
			router.push('/catalog')
		} else {
			dispatch(fetchCompareOfferProducts(compareProduct.categories[0].id))
			setSelectedSizeEl(compareProduct.sizes[0])
			setSelectedColorEl(compareProduct.hexes[0])
		}
	}, [])
	return (
		<>
			{showModal && <CompareModal setShowModal={setShowModal} />}
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
							<div className={s.main_content}>
								<div className={s.main_text}>
									<p className={s.main_title}>{compareProduct?.title?.ua}</p>
									<p className={s.main_price}>{compareProduct?.price}</p>
								</div>
								<div className={s.selects}>
									<div className={s.select_size}>
										<button
											onClick={() => setSizeActive(prev => !prev)}
											className={`${s.size_btn} ${
												sizeActive ? `${s.open}` : ''
											}`}
										>
											{selectedSizeEl}
										</button>
										{sizeActive && (
											<div className={s.size_droplist}>
												{SIZES.filter(el => el !== selectedSizeEl).map(
													(el, idx) => {
														return (
															<button
																onClick={() => setSelectedSizeEl(el)}
																key={idx + '' + new Date()}
																className={s.size_btn}
															>
																{el}
															</button>
														)
													}
												)}
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
											<p style={{ backgroundColor: selectedColorEl }}></p>
										</button>
										{colorActive && (
											<div className={s.color_droplist}>
												{COLOURS.filter(el => el !== selectedColorEl).map(
													(el, idx) => {
														return (
															<button
																onClick={() => setSelectedColorEl(el)}
																key={idx + '' + new Date()}
																className={s.color_btn}
															>
																<p style={{ backgroundColor: el }}></p>
															</button>
														)
													}
												)}
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

									<button
										onClick={() => setShowModal(true)}
										className={s.plus}
									></button>
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
		</>
	)
}

export default Compare
