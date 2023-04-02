import Link from 'next/link';
import React, { FC } from 'react';
import Image from 'next/image';
import cl from './ErrorModal.module.scss';
interface IErrorModalProps {
	title: string;
	description?: string;
	buttonText: string;
	buttonHref?: string;
	smallModal?: boolean;
}
const ErrorModal: FC<IErrorModalProps> = ({
	title,
	description = 'Сталася помилка, але ми працюємо над її вирішенням. Вибачте!',
	buttonHref = '/',
	buttonText,
	smallModal = false,
}) => {
	return (
		<div className={cl.modal}>
			<div className={cl.modal_body}>
				<h1
					className={smallModal ? `${cl.smmodal_title}` : `${cl.modal_title}`}
				>
					{title}
				</h1>
				<p className={smallModal ? `${cl.smmodal_descr}` : `${cl.modal_descr}`}>
					{description}
				</p>
				<Link href={buttonHref}>
					<button className={smallModal ? `${cl.smmodal_confirm}` : `${cl.modal_confirm}`}>{buttonText}</button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorModal;
