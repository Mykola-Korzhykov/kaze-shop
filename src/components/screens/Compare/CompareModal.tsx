import React from 'react'
import s from './Compare.module.scss'
import Image from 'next/image'
import compareModal from '../../../assets/images/compareModal.png'
const CompareModal = () => {
	const [sizeActive, setSizeActive] = React.useState<boolean>(true)
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	return (
		<div className={s.modal}>
			<div className={s.modal_body}>
				<div className={s.modal_header}>
					<div className={s.modal_imgWrapper}>
						<Image src={compareModal} alt='comopare modal img' />
					</div>
					<div className={s.modal_content}>
						<div className={s.modal_text}>
							<p className={s.modal_title}>Топик через плече</p>
							<p className={s.modal_descr}>28$</p>
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
									className={`${s.color_btn} ${colorActive ? `${s.open}` : ''}`}
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
				<div className={s.modal_btns}>
					<button className={`${s.modal_btn} ${s.modal_cancelBtn}`}>
						Отмена
					</button>
					<button className={`${s.modal_btn} ${s.modal_addBtn}`}>
						Добавить в корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default CompareModal
