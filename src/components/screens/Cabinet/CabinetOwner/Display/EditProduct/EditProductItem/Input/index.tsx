import React from 'react';
import s from './Input.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import {
	setCategories,
	setDescription,
	setPrice,
	setQuantity,
	setTitle,
} from '@/redux/slices/formData';
import Image from 'next/image';
import selectIcon from '../../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg';
//components

interface InputProps {
	text: string;
	placeholder: string;
	name: string;
	id: number;
	type: string;
	value?: string | number;
	setInputsState: (n: any) => void;
	inputsState: any;
	// price: number
}

export const Input = ({
	text,
	placeholder,
	name,
	id,
	type,
	value,
	setInputsState,
	inputsState,
}: InputProps) => {
	const dispatch = useAppDispatch();
	const [categoriesDisplay, setCategoriesDisplay] =
		React.useState<boolean>(false);

	const categories = useSelector(
		(state: RootState) => state.formData.categories
	);
	const categoryArr = useSelector(
		(state: RootState) => state.goods.fetchedCategories
	);

	const newCategoryArr = [
		...categoryArr,
		{
			id: 0.1,
			ua: 'UAstring',
			en: 'ENstring',
			rs: 'RSstring',
			ru: 'RUtring',
			type: 'category',
			createdAt: 'string',
			updatedAt: 'string',
		},
	];

	const activeCategories = categoryArr.find((el) => {
		return el.id === categories[0];
	});

	function handleBlurSet(event: any) {
		if (event.target.name === 'titleRU') {
			const payload: any = { branch: 'ru', title: event.target.value };
			dispatch(setTitle(payload));
		}
		if (event.target.name === 'titleUA') {
			const payload: any = { branch: 'ua', title: event.target.value };
			dispatch(setTitle(payload));
		}
		if (event.target.name === 'titleSRB') {
			const payload: any = { branch: 'rs', title: event.target.value };
			dispatch(setTitle(payload));
		}
		if (event.target.name === 'titleENG') {
			const payload: any = { branch: 'en', title: event.target.value };
			dispatch(setTitle(payload));
		}
		//descriptionRU
		if (event.target.name === 'descriptionRU') {
			const payload: any = { branch: 'ru', description: event.target.value };
			dispatch(setDescription(payload));
		}
		if (event.target.name === 'descriptionUA') {
			const payload: any = { branch: 'ua', description: event.target.value };
			dispatch(setDescription(payload));
		}
		if (event.target.name === 'descriptionSRB') {
			const payload: any = { branch: 'rs', description: event.target.value };
			dispatch(setDescription(payload));
		}
		if (event.target.name === 'descriptionENG') {
			const payload: any = { branch: 'en', description: event.target.value };
			dispatch(setDescription(payload));
		}
		//quantity
		if (event.target.name === 'quantity') {
			const payload: number = event.target.value;
			dispatch(setQuantity(Number(payload)));
		}
		//price
		if (event.target.name === 'price') {
			const payload: number = event.target.value;
			dispatch(setPrice(Number(payload)));
		}
		//setQuantity
		// console.log('titleDescription', titleDescription)
		// console.log('titleStore' , titleStore)
		// console.log('obj',event.target.name )
		// console.log('Пользователь закончил ввод:', event.target.value);
	}

	//   { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
	//   { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },

	return (
		<div className={s.wrapper}>
			{type === 'text' ? (
				<div className={s.wrapper}>
					<div className={s.title}>{text}</div>

					<input
						onBlur={handleBlurSet}
						className={s.input}
						type={type}
						placeholder={
							placeholder !== 'Введите название товара' &&
							placeholder !== 'Введите описание товара'
								? placeholder
								: placeholder
						}
						name={name}
						// value={value}
					/>
				</div>
			) : (
				''
			)}
			{/* next */}

			{/* {disable == false && type === 'text' ?  <div className={s.wrapper}>
            <div className={s.title}>{text}</div>
            <input onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder !== 'Введите цену' && placeholder !== 'Введите количество товаров' ? 'какие - то данные ' : placeholder  } name={name}/>
        </div> : '' }
        next */}

			{type === 'number' ? (
				<div className={s.wrapper}>
					<div className={s.title}>{text}</div>
					<input
						onBlur={handleBlurSet}
						className={s.input}
						type={type}
						placeholder={
							placeholder !== 'Введите название товара' &&
							placeholder !== 'Введите описание товара'
								? placeholder
								: placeholder
						}
						name={name}
					/>
				</div>
			) : (
				''
			)}

			{type === 'select' ? (
				<label className={s.select__wrapper} htmlFor={`${id}`}>
					<div className={s.title}>{text}</div>
					<input
						onClick={(e) => {
							setCategoriesDisplay(!categoriesDisplay);
						}}
						id={`${id}`}
						readOnly
						className={inputsState[id] ? s.input : s.input_off_valid}
						type={type}
						placeholder={activeCategories ? activeCategories.ru : placeholder}
					/>
					<Image
						className={`${s.select_img}`}
						src={selectIcon}
						alt="My Image"
					/>
					<div
						className={
							categoriesDisplay
								? s.categorychose_wrapper
								: s.categorychose_wrapper_off
						}
					>
						{categoryArr?.map((el, ind) => {
							return el.id !== 0.1 ? (
								<div
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										console.log('item');
										console.log(el.id);
										setCategoriesDisplay(!categoriesDisplay);
										dispatch(setCategories(el.id));
										setInputsState((prevState: any) => {
											const objCopy = { ...prevState };
											objCopy[id] = el.ua !== '' ? true : false;
											return objCopy;
										});
									}}
									key={ind}
									className={s.categorychose_item}
								>
									<span> {el.ru} </span>
								</div>
							) : (
								''
							);
						})}
					</div>
				</label>
			) : null}
		</div>
	);
};
