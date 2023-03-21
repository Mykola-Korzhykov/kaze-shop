import React, { FC } from 'react'
import s from './Compare.module.scss'
import {
	addProductToCart,
	deleteCompareOfferProduct,
} from '@/redux/slices/goods'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import Image from 'next/image'
import compareModal from '../../../assets/images/compareModal.png'
const CompareModal: FC<{ setShowModal: (state: boolean) => void }> = ({
	setShowModal,
}) => {
	const compareOfferProductModal = useAppSelector(
		state => state.goods.compareOfferProductModal
	)
	const dispatch = useAppDispatch()
	const [sizeActive, setSizeActive] = React.useState<boolean>(false)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	const [selectedSizeEl, setSelectedSizeEl] = React.useState<string | null>(
		null
	)
	const [selectedColorEl, setSelectedColorEl] = React.useState<{
		colourId: number
		hex: string
	} | null>(null)

	const closeModal = () => {
		setShowModal(false)
	}

	const addToCart = () => {
		// if it is an array of Goods[0] a way to find an object of image where colourId equal to need id and return 1 image (png)
		// const neededImage = compareOfferProductModal
		// 	.find(obj => obj?.images?.some(img => img?.colour?.id === 12))
		// 	.images.find(img => img?.colour?.id === 12)
		// const imagePath = neededImage.imagesPaths[0]

		const matchingImageObj = compareOfferProductModal.images.find(image => {
			return image.colour && image.colour.id === selectedColorEl?.colourId
		})

		dispatch(
			addProductToCart({
				id: compareOfferProductModal?.id,
				imageUrl: matchingImageObj.imagesPaths[0],
				colourId: selectedColorEl?.colourId,
				size: selectedSizeEl,
			})
		)
		dispatch(deleteCompareOfferProduct(compareOfferProductModal?.id))
		setShowModal(false)
	}
	React.useEffect(() => {
		setSelectedSizeEl(compareOfferProductModal?.sizes[0])
		setSelectedColorEl({
			colourId: compareOfferProductModal?.images[0].colour?.id,
			hex: compareOfferProductModal?.images[0].colour?.hex,
		})
	}, [])
	return (
		<div className={s.modal}>
			<div className={s.modal_body}>
				<div className={s.modal_header}>
					<div className={s.modal_imgWrapper}>
						<Image
							className={s.modal_img}
							src={compareModal}
							alt='compare modal img'
						/>
					</div>
					<div className={s.modal_content}>
						<div className={s.modal_text}>
							<p className={s.modal_title}>
								{compareOfferProductModal?.title?.ua}
							</p>
							<p className={s.modal_descr}>
								{compareOfferProductModal?.description?.ua}
							</p>
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
										{compareOfferProductModal?.sizes
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
										{compareOfferProductModal?.images
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
				<div className={s.modal_btns}>
					<button
						onClick={closeModal}
						className={`${s.modal_btn} ${s.modal_cancelBtn}`}
					>
						Отмена
					</button>
					<button
						onClick={addToCart}
						className={`${s.modal_btn} ${s.modal_addBtn}`}
					>
						Добавить в корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default CompareModal
