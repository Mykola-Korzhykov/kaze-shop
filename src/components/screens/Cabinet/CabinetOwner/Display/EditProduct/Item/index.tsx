import React from 'react';
import s from './Item.module.scss';
import Image from 'next/image';
import { string } from 'yup';
import photoNew from '../../../../../../../assets/images/admin/img.svg';
import { setEditProductItemId } from '../../../../../../../redux/slices/admin';
import { useAppDispatch } from '@/redux/hooks';

interface ItemPropsType {
	photo?: any;
	price?: number;
	title?: string;
	setActiveId: (n: number) => void;
	id: number;
}

export const Item = ({
	photo,
	price,
	title,
	setActiveId,
	id,
}: ItemPropsType) => {
	console.log('photo', photo);
	// const photoString = URL.createObjectURL(photo)

	const dispatch = useAppDispatch();

	// let photoiside;
	// const [photoDone, sePhotoDone] = React.useState<any>()

	// if (typeof photo === 'string') {
	//     sePhotoDone(photoDone)

	//   } else {

	//     const reader = new FileReader();
	//     console.log(typeof photo)
	//     if (photo instanceof File) {
	//     reader.onload = () => {
	//         sePhotoDone(reader.result as string);
	//     };
	//     reader.readAsDataURL(photo);
	//     } else {
	//     console.error('Invalid file type');
	//     }

	//   }

	//   const array = new Array(10)

	return (
		<div className={s.wrapper}>
			<Image className={s.img} src={photo} alt="photo" />
			<div className={s.title}> {title} </div>
			<div className={s.price}> {`${price}$`}</div>
			<div className={s.btn_wrapper}>
				<button
					onClick={() => {
						dispatch(setEditProductItemId(id));
						setActiveId(id);
					}}
					className={s.btn}
				>
					Изменить
				</button>
				<span className={s.close_btn}>
					<svg
						width="30"
						height="30"
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M23.4375 6.5625L6.5625 23.4375"
							stroke="#0B0B0B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M23.4375 23.4375L6.5625 6.5625"
							stroke="#0B0B0B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
};
