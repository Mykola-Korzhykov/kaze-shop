import React from 'react';
import s from './SizesItem.module.scss';
//redux
import { removeSizesFromServer } from '@/redux/slices/editProduct';
import { useAppDispatch } from '@/redux/hooks';
// import {removeSizes} from '../../../../../../../redux/slices/admin'
import { removeSizes } from '../../../../../../../redux/slices/formData';
import { useRouter } from 'next/router';

interface SizeItemPropsType {
	size: string;
	id: number;
	isInEdit?: boolean;
}

export const SizeItem = ({ size, id, isInEdit }: SizeItemPropsType) => {
	const deleteHandler = () => {
		if (isInEdit) {
			dispatch(removeSizesFromServer(size));
		} else {
			dispatch(removeSizes(size));
		}
	};
	const dispatch = useAppDispatch();

	return (
		<div onClick={deleteHandler} className={s.wrapper}>
			<span
				// style={{
				//     width: id ===  0 ? '35px' : 'min-content'
				// }}
				className={s.size}
			>
				{size}
			</span>
			<span className={s.remove}>
				<svg
					className={s.remove_icon}
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.75 5.25L5.25 18.75"
						stroke="#9D9D9D"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M18.75 18.75L5.25 5.25"
						stroke="#9D9D9D"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
		</div>
	);
};
