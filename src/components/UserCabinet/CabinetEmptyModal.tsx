import React, { FC } from 'react';
import cl from '../../styles/cabinet2.module.scss';
import Link from 'next/link';
type IProps = {
	title: string;
	description: string;
	btnText: string;
	btnHref: string;
};
const CabinetEmptyModal: FC<IProps> = ({
	title,
	description,
	btnHref,
	btnText,
}) => {
	return (
		<div className={cl.modal_body}>
			<h3 className={cl.modal_title}>{title}</h3>
			<p className={cl.modal_descr}>{description}</p>
			<Link href={btnHref}>
				<button className={cl.modal_btn}>{btnText}</button>
			</Link>
		</div>
	);
};

export default CabinetEmptyModal;
