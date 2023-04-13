import React from 'react';
import s from './Button.module.scss';
import Image from 'next/image';
import Link from 'next/link';
//types
import { ButtonType } from '../../../../../types/auth';
import { clearFormData } from '@/utils/clearFormData';
import { useAppDispatch } from '@/redux/hooks';
import { clearForm } from '@/redux/slices/formData';
import { removeimageUrlArr } from '@/redux/slices/modal';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

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
	setFiles: (a: any) => void;
	setPngImageShow: (a: any) => void;
	setJpgImagesShow: (a: any) => void;
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
	setFiles,
	setPngImageShow,
	setJpgImagesShow,
}) => {
	const dispatch = useAppDispatch();
	const imageUrlArr = useSelector(
		(state: RootState) => state.modaleSlice.imageUrlArr
	);
	function OKclearDataForm(id: number) {
		if (id === 3 || id === 4) {
			setNetFile(null);
			setNetFileShow(null);
			setImages([]);
			dispatch(clearForm());
			dispatch(removeimageUrlArr({ from: 0, size: imageUrlArr.length }));
			setFiles([]);
			setPngImageShow(null);
			setJpgImagesShow([]);
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
