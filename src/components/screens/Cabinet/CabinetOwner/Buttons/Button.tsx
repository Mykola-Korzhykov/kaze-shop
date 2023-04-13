import React from 'react';
import s from './Button.module.scss';
import Image from 'next/image';
import Link from 'next/link';
//types
import { ButtonType } from '../../../../../types/auth';
import { clearFormData } from '@/utils/clearFormData';

interface ButtonProps {
	id: number;
	img_grey: string;
	img_white: string;
	text: string;
	chengeDisplayOK: (n: number) => void;
	displayActive: number;
	setNetFile: (f: File | any) => void;
	setNetFileShow: (f: File | any) => void;
	setImages: (f: File | any) => void;
}

export const Button: React.FC<ButtonProps> = ({
	id,
	text,
	img_grey,
	img_white,
	chengeDisplayOK,
	displayActive,
	setNetFile,
	setNetFileShow,
	setImages,
}) => {
	function OKclearDataForm(id: number) {
		if (id === 3 || id === 4) {
			clearFormData();
			setNetFile(null);
			setNetFileShow(null);
			setImages([]);
		}
	}
	return (
		<div onClick={() => chengeDisplayOK(id)} className={s.wrapper}>
			<button
				onClick={() => OKclearDataForm(id)}
				className={
					id === displayActive
						? `${s.button} ${s.displayActive} ${id === 6 ? s.button7 : ''}`
						: `${s.button} ${id === 6 ? s.button7 : ''}`
				}
			>
				<Image className={`${s.img_grey}`} src={img_grey} alt="My Image" />
				<Image className={`${s.img_white}`} src={img_white} alt="My Image" />
				<div className={s.text}>{text}</div>
			</button>
		</div>
	);
};
