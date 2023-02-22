import React, { FC } from 'react'
import s from './CatalogButtons.module.scss'
type Props = {
	needIcon?: boolean
	text: string
}
const CatalogButton: FC<Props> = ({ needIcon, text }) => {
	return (
		<button className={needIcon ? `${s.buttonSort}` : `${s.button}`}>
			{text}
		</button>
	)
}

export default CatalogButton
