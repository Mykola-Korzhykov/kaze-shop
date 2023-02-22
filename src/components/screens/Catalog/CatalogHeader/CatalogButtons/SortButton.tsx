import React, { FC } from 'react'
import { boolean } from 'yup'
import s from './CatalogButtons.module.scss'
type Props = {
	text: string
}
const SortButton: FC<Props> = ({ text }) => {
	const [sortActive, setSortActive] = React.useState<boolean>(false)
	const sortButtonHandler = () => {
		setSortActive(prev => !prev)
	}
	return (
		<div className={s.sortBtn_wrapper}>
			<button onClick={sortButtonHandler} className={s.buttonSort}>
				{text}
			</button>
			{sortActive && (
				<div className={s.dropList}>
					<button className={`${s.buttonSort} ${s.sortUp_icon}`}>Возростанию</button>
					<button className={`${s.buttonSort} ${s.sortBtm_icon}`}>Убыванию</button>
				</div>
			)}
		</div>
	)
}

export default SortButton
