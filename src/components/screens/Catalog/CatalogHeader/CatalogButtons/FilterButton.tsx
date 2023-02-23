import React, { FC, useContext } from 'react'
import CatalogContext from '@/context/CatalogContext'
import s from './CatalogButtons.module.scss'
type Props = {
	needIcon?: boolean
	text: string
}
const FilterButton: FC<Props> = ({ needIcon, text }) => {
	const context = useContext(CatalogContext)
	const buttonHandler = () => {
		context.setFiltersOpened(prev => !prev)
	}
	return (
		<button onClick={buttonHandler} className={needIcon ? `${s.buttonSort}` : `${s.button}`}>
			{text}
		</button>
	)
}

export default FilterButton
