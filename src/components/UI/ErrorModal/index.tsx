import Link from 'next/link'
import React, { FC } from 'react'
import cl from './ErrorModal.module.scss'
interface IErrorModalProps {
	title: string
	description?: string
	buttonText: string
	buttonHref?: string
}
const ErrorModal: FC<IErrorModalProps> = ({
	title,
	description = 'Сталася помилка, але ми працюємо над її вирішенням. Вибачте!',
	buttonHref = '/',
	buttonText,
}) => {
	return (
		<div className={cl.modal}>
			<div className={cl.modal_body}>
				<h1 className={cl.modal_title}>{title}</h1>
				<p className={cl.modal_descr}>{description}</p>

				<Link href={buttonHref}>
					<button className={cl.modal_confirm}>{buttonText}</button>
				</Link>
			</div>
		</div>
	)
}

export default ErrorModal
