import React, { FC, useContext } from 'react'
import CatalogContext from '@/context/CatalogContext'
import s from './CatalogButtons.module.scss'
type Props = {
	
	text: string
}
const FiltersSubmitButton: FC<Props> = ({ text }) => {
	const context = useContext(CatalogContext)
	const buttonHandler = () => {
		context.setFiltersOpened(prev => !prev)
	}
	return (
		<button onClick={buttonHandler} className={s.button}>
			{text}
		</button>
	)
}

export default FiltersSubmitButton
