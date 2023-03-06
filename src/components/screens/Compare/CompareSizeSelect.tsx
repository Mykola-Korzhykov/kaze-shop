import React from 'react'
import s from './Compare.module.scss'
const CompareSizeSelect = () => {
	const [sizeActive, setSizeActive] = React.useState<boolean>(true)
	return (
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
	)
}

export default CompareSizeSelect
