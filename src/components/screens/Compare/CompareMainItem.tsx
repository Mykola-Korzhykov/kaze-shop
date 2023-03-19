import React from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'
import catalogItem from '../../../assets/images/compare.png'
import {
	setSizeForProduct,
	setColorForProduct,
} from '../../../redux/slices/goods'
import s from './Compare.module.scss'
const CompareMainItem = () => {
	const dispatch = useAppDispatch()
	const compareProduct = useAppSelector(state => state.goods.compareProduct)
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
	const selectSizeHandler = () => {}
	React.useEffect(() => {
		if (!compareProduct) {
			router.push('/catalog')
		} else {
			setSelectedSizeEl(compareProduct?.sizes[0])
			setSelectedColorEl({
				colourId: compareProduct?.images[0].colour?.id,
				hex: compareProduct?.images[0].colour?.hex,
			})
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
												onClick={() => setSelectedSizeEl(el)}
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
													setSelectedColorEl({
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
