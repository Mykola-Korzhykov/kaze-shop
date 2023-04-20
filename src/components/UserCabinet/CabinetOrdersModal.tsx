import React, { FC } from 'react';
import s from '../../styles/cabinet2.module.scss';
type IProps = {
	title: string;
	description: string;
};
const CabinetOrdersModal: FC<IProps> = ({ title, description }) => {
	return (
		<div className={s.orderModal}>
			<div className={s.orderModal_body}>
				<h3 className={s.orderModal_title}>{title}</h3>
				<p className={s.orderModal_descr}>{description}</p>
			</div>
		</div>
	);
};

export default CabinetOrdersModal;
