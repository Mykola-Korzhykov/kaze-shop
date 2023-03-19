import React, { FC } from 'react'
import s from './Compare.module.scss'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import Image from 'next/image'
import compareModal from '../../../assets/images/compareModal.png'
const CompareModal: FC<{ setShowModal: (state: boolean) => void }> = ({
	setShowModal,
}) => {
	const closeModal = () => {
		setShowModal(false)
	}
	const compareOfferProductModal = useAppSelector(
		state => state.goods.compareOfferProductModal
	)
	const dispatch = useAppDispatch()
	const [sizeActive, setSizeActive] = React.useState<boolean>(false)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	const [selectedSizeEl, setSelectedSizeEl] = React.useState<string | null>(
		null
	)
	const [selectedColorEl, setSelectedColorEl] = React.useState<string | null>(
		null
	)
	const addToCart = () => {
		const productObj = {}
		// request
		//dispatch that delete this item
		setShowModal(false)
	}
	React.useEffect(() => {
		setSelectedSizeEl(compareOfferProductModal?.sizes[0])
		setSelectedColorEl(compareOfferProductModal?.hexes[0])
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
									<p style={{ backgroundColor: selectedColorEl }}></p>
								</button>
								{colorActive && (
									<div className={s.color_droplist}>
										{compareOfferProductModal?.hexes
											.filter(el => el !== selectedColorEl)
											.map((el, idx) => {
												return (
													<button
														onClick={() => setSelectedColorEl(el)}
														key={idx + '' + new Date()}
														className={s.color_btn}
													>
														<p style={{ backgroundColor: el }}></p>
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
					<button onClick={addToCart} className={`${s.modal_btn} ${s.modal_addBtn}`}>
						Добавить в корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default CompareModal
