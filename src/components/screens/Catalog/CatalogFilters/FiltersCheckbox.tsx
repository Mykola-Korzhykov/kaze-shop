import React, { FC, Dispatch, SetStateAction } from 'react'
type Props = {
	label: string
	color: string
}
const FiltersCheckbox: FC<Props> = ({ label, color }) => {
	const [isChecked, setIsChecked] = React.useState(false)
	return (
		<div className={`filter_checkbox`} data-checked={isChecked}>
			<div
				className='filter_checkbox__icon'
				style={{ backgroundColor: `${color}` }}
				onClick={() => setIsChecked(!isChecked)}
			></div>
			<p className='filter_checkbox__text'>{label} </p>
		</div>
	)
}

export default FiltersCheckbox
