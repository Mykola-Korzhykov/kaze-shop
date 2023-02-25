import React, { FC } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import {
	setFilterCategory,
	setFilterColour,
	setFilterSize,
} from '../../../../redux/slices/goods'
type Props = {
	label: string
	color: string
	type: string
	itemId: number
}
const FiltersCheckbox: FC<Props> = ({ label, color, type, itemId }) => {
	const dispatch = useAppDispatch()
	const [isChecked, setIsChecked] = React.useState(false)
	const getCheckboxState = () => {
		setIsChecked(!isChecked)
		if (type === 'colour') {
			dispatch(setFilterColour(itemId))
		}
		if (type === 'category') {
			dispatch(setFilterCategory(itemId))
		}
		if (type === 'size') {
			dispatch(setFilterSize(label))
		}
	}
	return (
		<div className={`filter_checkbox`} data-checked={isChecked}>
			<div
				className='filter_checkbox__icon'
				style={{ backgroundColor: `${color}` }}
				onClick={getCheckboxState}
			></div>
			<p className='filter_checkbox__text'>{label} </p>
		</div>
	)
}

export default FiltersCheckbox
