import React from 'react'
import s from './Compare.module.scss'
const CompareColorSelect = () => {
	const [colorActive, setColorActive] = React.useState<boolean>(false)
	return (
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
	)
}

export default CompareColorSelect
