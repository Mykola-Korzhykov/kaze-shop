import React from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setUpdateCompareProduct } from '@/redux/slices/goods'
import { useRouter } from 'next/router'
import catalogItem from '../../../assets/images/compare.png'

import s from './Compare.module.scss'
const CompareMainItem = () => {
	const dispatch = useAppDispatch()
	const compareProduct = useAppSelector(state => state.goods.compareProduct)
	const updateCompareProduct = useAppSelector(
		state => state.goods.updateCompareProduct
	)
	const router = useRouter()
	const [sizeActive, setSizeActive] = React.useState<boolean>(false)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	const [selectedSizeEl, setSelectedSizeEl] = React.useState<string | null>(
		null
	)
	const [selectedColorEl, setSelectedColorEl] = React.useState<{
		colourId: number
		hex: string
	} | null>(null)
	const selectSizeHandler = (el: string) => {
		dispatch(setUpdateCompareProduct({ ...updateCompareProduct, size: el }))
		setSelectedSizeEl(el)
	}
	const selectColorHandler = (el: { colourId: number; hex: string }) => {
		const matchingImageObj = compareProduct.images.find(image => {
			return image.colour && image.colour.id === el.colourId
		})
		dispatch(
			setUpdateCompareProduct({
				...updateCompareProduct,
				colourId: el.colourId,
				imageUrl: matchingImageObj.imagesPaths[0],
			})
		)
		setSelectedColorEl(el)
	}
	React.useEffect(() => {
		if (!compareProduct) {
			router.push('/catalog')
		} else {
			setSelectedSizeEl(compareProduct?.sizes[0])
			setSelectedColorEl({
				colourId: compareProduct?.images[0].colour?.id,
				hex: compareProduct?.images[0].colour?.hex,
			})
			const matchingImageObj = compareProduct.images.find(image => {
				return (
					image.colour &&
					image.colour.id === compareProduct?.images[0].colour?.id
				)
			})
			const updateObj = {
				id: compareProduct.id,
				imageUrl: matchingImageObj.imagesPaths[0],
				colourId: compareProduct?.images[0].colour?.id,
				size: compareProduct?.sizes[0],
			}
			dispatch(setUpdateCompareProduct(updateObj))
		}
	}, [])

	return (
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
							className={`${s.size_btn} ${sizeActive ? `${s.open}` : ''}`}
						>
							{selectedSizeEl}
						</button>
						{sizeActive && (
							<div className={s.size_droplist}>
								{compareProduct?.sizes
									.filter(el => el !== selectedSizeEl)
									.map((el, idx) => {
										return (
											<button
												onClick={() => selectSizeHandler(el)}
												key={idx + '' + new Date()}
												className={s.size_btn}
											>
												{el}
											</button>
										)
									})}
							</div>
						)}
					</div>
					<div className={s.select_color}>
						<button
							onClick={() => setColorActive(prev => !prev)}
							className={`${s.color_btn} ${colorActive ? `${s.open}` : ''}`}
						>
							<p style={{ backgroundColor: selectedColorEl?.hex }}></p>
						</button>
						{colorActive && (
							<div className={s.color_droplist}>
								{compareProduct?.images
									.filter(el => el.colour.id !== selectedColorEl.colourId)
									.map((el, idx) => {
										return (
											<button
												onClick={() =>
													selectColorHandler({
														colourId: el.colour.id,
														hex: el.colour.hex,
													})
												}
												key={el.colour.id}
												className={s.color_btn}
											>
												<p style={{ backgroundColor: el.colour.hex }}></p>
											</button>
										)
									})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompareMainItem
