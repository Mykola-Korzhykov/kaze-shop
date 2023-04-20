import React from 'react';
import s from './Item.module.scss';
import Image from 'next/image';
import { string } from 'yup';
import photoNew from '../../../../../../../assets/images/admin/img.svg';
import { setEditProductItemId } from '../../../../../../../redux/slices/admin';
import { useAppDispatch } from '@/redux/hooks';
import { Api } from '@/services';
import { setActiveProduct } from '@/redux/slices/editProduct';
import { Goods } from '@/types/goods';
import { setProductForm } from '@/redux/slices/modal';
interface ItemPropsType {
	photo?: any;
	price?: string;
	title?: string;
	setActiveId: (n: number) => void;
	id: number;
	product: Goods;
}

export const Item = ({
	product,
	photo,
	price,
	title,
	setActiveId,
	id,
}: ItemPropsType) => {
	console.log('photo', photo);
	// const photoString = URL.createObjectURL(photo)

	const dispatch = useAppDispatch();

	const deleteProduct = async () => {
		try {
			const res = await Api().goods.deleteSingleProduct(id);
			if (res?.status === 202) {
				dispatch(
					setProductForm({
						turn: true,
						title: 'Товар успешно удален',
						subtitle: '',
						btntitle: 'Готово',
					})
				);
			}
		} catch (e) {
			dispatch(
				setProductForm({
					turn: true,
					title: 'Ошибка при удалении товара',
					subtitle: 'e?.response?.data?.message',
					btntitle: 'Ок',
				})
			);
		}
	};
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
			<Image
				width={285}
				height={360}
				className={s.img}
				src={photo}
				alt="photo"
			/>
			<div className={s.title}> {title} </div>
			<div className={s.price}> {`${price}$`}</div>
			<div className={s.btn_wrapper}>
				<button
					onClick={() => {
						dispatch(setActiveProduct(product));
						dispatch(setEditProductItemId(id));
						setActiveId(id);
					}}
					className={s.btn}
				>
					Изменить
				</button>
				<span onClick={deleteProduct} className={s.close_btn}>
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
