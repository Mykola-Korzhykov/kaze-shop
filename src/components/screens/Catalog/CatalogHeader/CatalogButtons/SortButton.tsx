import React, { FC } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setSortType } from '@/redux/slices/goods'
import s from './CatalogButtons.module.scss'
type Props = {
	text: string
}
const SortButton: FC<Props> = ({ text }) => {
	const btnsWrapperRef = React.useRef(null)
	const dispatch = useAppDispatch()
	const [sortActive, setSortActive] = React.useState<boolean>(false)
	const sortButtonHandler = () => {
		setSortActive(prev => !prev)
	}
	const handleClickOutside = (e: MouseEvent) => {
		if (!btnsWrapperRef.current.contains(e.target)) {
			setSortActive(false)
		}
		// } else {
		// 	console.log('inside sort block')
		// }
	}
	const sortByIncrease = () => {
		dispatch(setSortType('ASC'))
	}
	const sortByDecrease = () => {
		dispatch(setSortType('DEC'))
	}
	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])
	return (
		<div ref={btnsWrapperRef} className={s.sortBtn_wrapper}>
			<button
				onClick={sortButtonHandler}
				className={`${s.buttonSort} ${sortActive ? `${s.open}` : ''}`}
			>
				{text}
			</button>
			{sortActive && (
				<div className={s.dropList}>
					<button
						onClick={sortByIncrease}
						className={`${s.buttonSort} ${s.sortUp_icon}`}
					>
						Возростанию
					</button>
					<button
						onClick={sortByDecrease}
						className={`${s.buttonSort} ${s.sortDown_icon}`}
					>
						Убыванию
					</button>
				</div>
			)}
		</div>
	)
}

export default SortButton
