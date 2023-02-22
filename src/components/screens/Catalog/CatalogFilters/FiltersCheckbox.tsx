import React, { FC, Dispatch, SetStateAction } from 'react'
type Props = {
	label: string
	color: string
}
const FiltersCheckbox: FC<Props> = ({ label, color }) => {
	const [isChecked, setIsChecked] = React.useState(false)
	return (
		<div className={`checkbox`} data-checked={isChecked}>
			<div
				className='checkbox__icon'
				style={{ backgroundColor: `${color}` }}
				onClick={() => setIsChecked(!isChecked)}
			></div>
			<p className='checkbox__text'>{label} </p>
		</div>
	)
}

export default FiltersCheckbox
