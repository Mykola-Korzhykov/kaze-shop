import React, { useState } from 'react';
import s from './EditProductItem.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { API_URL } from '@/services';
import { parseCookies } from 'nookies';
import {
	addCountPhotos,
	setEditProductItemId,
	setArrObjModalSwow,
} from '../../../../../../../redux/slices/admin';
import { removearrObjMod } from '@/redux/slices/formData';
import { Api } from '@/services';
import { fetchedColour } from '../../../../../../../types/goods';
import { setModalAddEditProduct } from '../../../../../../../redux/slices/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { InputTextItem } from '../../AddProduct/InputText';
import Image from 'next/image';
//photos/icons
import openInput from '../../../../../../../assets/icons/cabinetAdmin/open_input.svg';
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg';
import photoTest from '../../../../../../../assets/images/product/slider/photo.png';
import photo from '../../../../../../../assets/images/admin/img.png';
//components
// import { Input } from './Input';
import { SizeItem } from '../../AddProduct/SizesItem';
import { ColorItem } from '../../AddProduct/ColorItem';
import { SizeChart } from '../../../Display/AddProduct/sizeChart';
//types
import { Goods } from '../../../../../../../types/goods';
import { ImageData } from '../../../../../../../types/goods';
import {
	setSizesFromServer,
	setActiveProduct,
} from '@/redux/slices/editProduct';
import {
	setSizes,
	removeSizes,
	setCategories,
	setDescription,
	setPrice,
	setQuantity,
	setTitle,
	setSizeChartImageDescription,
} from '@/redux/slices/formData';

interface EditProductItemType {
	id: number;
	imagesData: File[];
	setImages: (n: any) => void;
}

export const EditProductItem = ({
	id,
	imagesData,
	setImages,
}: EditProductItemType) => {
	const dispatch = useAppDispatch();
	const fetchedColours = useAppSelector((state) => state.goods.fetchedColours);
	const imagesFromModal = useAppSelector(
		(state) => state.editProduct.imagesFromModal
	);
	const arrObjModal = useAppSelector((state) => state.formData.arrObjMod);
	const arrObjModalSwow = useSelector(
		(state: RootState) => state.admin.arrObjModalSwow
	);
	const [deletedImagesIndexes, setDeletedImagesIndexes] = React.useState<
		number[]
	>([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const [imagesFromServerLength, setImagesFromServerLength] =
		React.useState<number>(0);
	const [showPhotos, setAllShowPhotos] = React.useState<File[]>([]);
	const [allEditsImages, setAllEditsImages] = React.useState<
		| null
		| {
				imagesPaths: string[] | File[];
				sizes: string[];
				colour?: fetchedColour;
				colourId?: number;
		  }[]
	>(null);
	const deleteImageObj = (elObj: any) => {
		// console.log('allElements', allEditsImages);
		// console.log('el that delete', elObj);
		const arrCopy = [...allEditsImages];
		const elemId = arrCopy.findIndex((el) => {
			if ('colour' in el && 'colour' in elObj) {
				// console.log('deleted elem', elObj);
				const prevData = [...deletedImagesIndexes];
				prevData.push(elObj?.colour?.id);
				setDeletedImagesIndexes(prevData);
				return el?.colour?.id === elObj?.colour?.id;
			} else {
				return el?.colourId === elObj?.colourId;
			}
		});
		// console.log('want delete', elemId);
		arrCopy.splice(elemId, 1);
		setAllEditsImages(arrCopy);
	};
	const uploadPhoto = () => {
		const arrCopy = [...allEditsImages];
		arrCopy.push(null);
		setAllEditsImages(arrCopy);
	};
	React.useEffect(() => {
		if (allEditsImages) {
			const arrCopy = [...allEditsImages];
			let arrObjModalCopy: {
				fileNames: string[];
				sizes: string[];
				colourId: number;
			}[] = [...arrObjModal];
			// arrObjModalCopy = arrObjModalCopy.filter(el => !arrCopy.includes(el))
			const updatedArray = [...arrObjModalCopy, ...imagesFromModal].map(
				(obj) => {
					//@ts-ignore
					const { fileNames, ...rest } = obj;
					//@ts-ignore
					delete rest.imagesPaths;
					return { ...rest, imagesPaths: fileNames };
				}
			);

			//@ts-ignore
			const newArr = arrCopy.concat([updatedArray.pop()]);
			const filteredNewArr = newArr.filter((el) => el !== null);
			setAllEditsImages(filteredNewArr);
		}
		// console.log('ModalArr', arrObjModal);
	}, [arrObjModal]);

	let activeCategories: any = null;

	const activeProduct = useSelector(
		(state: RootState) => state.editProduct.activeProduct
	);

	React.useEffect(() => {
		activeProduct?.images?.forEach((el) => {
			dispatch(setArrObjModalSwow(el));
		});
	}, []);

	const [netFile, setNetFile] = React.useState<null | File | string>(null);
	React.useEffect(() => {
		// give initial state to reduxt data from selected product
		//sizes
		dispatch(setSizesFromServer(activeProduct?.sizes));
		//title
		const payloadT: any = { branch: 'ua', title: activeProduct?.title?.ua };
		dispatch(setTitle(payloadT));
		const payloadT2: any = { branch: 'en', title: activeProduct?.title?.en };
		dispatch(setTitle(payloadT2));
		const payloadT3: any = { branch: 'ru', title: activeProduct?.title?.ru };
		dispatch(setTitle(payloadT3));
		const payloadT4: any = { branch: 'rs', title: activeProduct?.title?.rs };
		dispatch(setTitle(payloadT4));
		//description

		const payloadD: any = {
			branch: 'ru',
			description: activeProduct?.description?.ru,
		};
		dispatch(setDescription(payloadD));

		const payloadD2: any = {
			branch: 'ua',
			description: activeProduct?.description?.ua,
		};
		dispatch(setDescription(payloadD2));

		const payloadD3: any = {
			branch: 'rs',
			description: activeProduct?.description?.rs,
		};
		dispatch(setDescription(payloadD3));

		const payloadD4: any = {
			branch: 'en',
			description: activeProduct?.description?.en,
		};
		dispatch(setDescription(payloadD4));

		//quantity

		const payloadQ: number = activeProduct?.quantity;
		dispatch(setQuantity(Number(payloadQ)));

		//price

		const payloadP: string = activeProduct?.price + ''; //
		const payloadPstr: number = +payloadP.slice(0, -1);

		dispatch(setPrice(Number(payloadPstr)));

		//sizeChartDescr

		const payloadSd: any = {
			branch: 'ua',
			sizeChartImageDescription: activeProduct?.sizeChartImageDescription?.ua,
		};
		dispatch(setSizeChartImageDescription(payloadSd));

		const payloadSd2: any = {
			branch: 'ru',
			sizeChartImageDescription: activeProduct?.sizeChartImageDescription?.ru,
		};
		dispatch(setSizeChartImageDescription(payloadSd2));

		const payloadSd3: any = {
			branch: 'rs',
			sizeChartImageDescription: activeProduct?.sizeChartImageDescription?.rs,
		};
		dispatch(setSizeChartImageDescription(payloadSd3));

		const payloadSd4: any = {
			branch: 'en',
			sizeChartImageDescription: activeProduct?.sizeChartImageDescription?.en,
		};
		dispatch(setSizeChartImageDescription(payloadSd4));
		//category
		dispatch(setCategories(activeProduct?.categories[0]?.id));
		setActiveCategory(activeProduct?.categories[0]);
		//sizeChartImage
		setNetFile(activeProduct?.sizeChartImage);
		//images
		//@ts-ignore
		setAllEditsImages(activeProduct?.images ?? []);
		setImagesFromServerLength(activeProduct?.images?.length);
	}, [activeProduct]);
	const [choiseSize, setChoiseSize] = React.useState<boolean>(false);
	const [choiceColors, setChoiceColors] = React.useState<boolean>(false);

	// const selectedSizes = useSelector((state: RootState) => state.formData.sizes);
	const selectedSizes = useSelector(
		(state: RootState) => state.editProduct.sizesFromServer
	);
	const sizesItems = useSelector((state: RootState) => state.admin.sizesItems);
	const userEdit = useSelector((state: RootState) => state.admin.userEdit);

	const editProductItemId = useSelector(
		(state: RootState) => state.admin.editProductItemId
	);

	const category = useSelector((state: RootState) => state.formData.categories);

	const title = useSelector((state: RootState) => state.formData.title);
	const descr = useSelector((state: RootState) => state.formData.description);
	const price = useSelector((state: RootState) => state.formData.price);
	const quantity = useSelector((state: RootState) => state.formData.quantity);
	const sizeChartDescr = useSelector(
		(state: RootState) => state.formData.sizeChartImageDescription
	);

	//chosen product
	const getStateRedux = async () => {
		const cookies = parseCookies();
		const token = cookies.accessToken;
		const coloursArr = allEditsImages?.map((el) => {
			if ('colour' in el) {
				return el?.colour?.id;
			} else {
				return el?.colourId;
			}
		});
		const sendObj: {
			title: {
				ua: string;
				ru: string;
				rs: string;
				en: string;
			};
			description: {
				ua: string;
				ru: string;
				rs: string;
				en: string;
			};
			price: number;
			sizes: string[];
			colours: number[];
			quantity: number;
			categories: number[];
			selectedImages: {
				fileNames: string[];
				colourId: number;
				sizes: string[];
			}[];
			sizeChartImageDescription: {
				ua: string;
				ru: string;
				rs: string;
				en: string;
			};
			sizeChartImage: File | string;
			deletedImages: number[];
		} = {
			title: title,
			description: descr,
			sizeChartImageDescription: sizeChartDescr,
			sizes: selectedSizes,
			selectedImages: arrObjModal,
			categories: [activeCategory?.id],
			price: price,
			quantity: quantity,
			sizeChartImage: netFile,
			colours: coloursArr,
			deletedImages: deletedImagesIndexes,
		};
		if (typeof netFile === 'string') {
			delete sendObj['sizeChartImage'];
		}
		if (arrObjModal?.length <= 0) {
			delete sendObj['selectedImages'];
		}

		const formData = new FormData();
		//images
		for (let i = 0; i < imagesData?.length; i++) {
			formData.append('images', imagesData[i]);
		}
		//title
		formData.append('title', JSON.stringify(title));
		//description
		formData.append('description', JSON.stringify(descr));
		//price
		formData.append('price', JSON.stringify(price));
		//sizes
		formData.append('sizes', JSON.stringify(selectedSizes));
		// colours
		formData.append('colours', JSON.stringify(coloursArr));
		//quantity
		formData.append('quantity', JSON.stringify(quantity));
		//categories
		formData.append('categories', JSON.stringify([activeCategory?.id]));
		//sizeChartImageDescription
		formData.append(
			'sizeChartImageDescription',
			JSON.stringify(sizeChartDescr)
		);
		//sizeChartImage
		if (typeof netFile !== 'string') {
			formData.append('sizeChartImage', JSON.stringify(netFile));
		}
		//selectedImages
		if (arrObjModal?.length > 0) {
			formData.append('selectedImages', JSON.stringify(arrObjModal));
		}
		console.log('SEND_OBJ', sendObj);
		console.log('SEND_OBJ_FORMDATA', formData);
		axios
			.patch(`/product/update_product?productId=${activeProduct?.id}`, formData, {
				baseURL: API_URL,
				withCredentials: true,
				headers: {
					Authorization: 'Bearer ' + (token || ''),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log('response.data', response.data);
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});
		// await Api().goods.updateEditProduct(activeProduct?.id, sendObj);
	};

	interface ImageData {
		imagesPaths: string[];
		record: Record<string, string>;
		sizes: string[];
	}
	const cancelEditingProduct = () => {
		dispatch(setActiveProduct(null));
		dispatch(setEditProductItemId(-1));
	};

	const SizeChartArr = [
		{
			id: 1,
			title: ' Описание размерной сетки UA',
			placeholder: 'Введите описание размерной сетки',
			leng: 'ua',
		},
		{
			id: 2,
			title: ' Описание размерной сетки RU',
			placeholder: 'Введите описание размерной сетки',
			leng: 'ru',
		},
		{
			id: 3,
			title: ' Описание размерной сетки SRB',
			placeholder: 'Введите описание размерной сетки',
			leng: 'rs',
		},
		{
			id: 4,
			title: ' Описание размерной сетки ENG',
			placeholder: 'Введите описание размерной сетки',
			leng: 'en',
		},
	];

	// const [arrPhotos, setArrPhotos] = React.useState<any>([...userEdit.images])
	// console.log('arrPhotos', arrPhotos)
	const payloadP: string = activeProduct?.price + '';
	const payloadPstr: string = payloadP.slice(0, -1);
	const inputs = [
		{
			id: 0,
			type: 'text',
			text: 'Название товара RU',
			placeholder: 'Введите название товара',
			name: 'titleRU',
			value: activeProduct?.title?.ru,
		},
		{
			id: 1,
			type: 'text',
			text: 'Название товара UA',
			placeholder: 'Введите название товара',
			name: 'titleUA',
			value: activeProduct?.title?.ua,
		},
		{
			id: 2,
			type: 'text',
			text: 'Название товара SRB',
			placeholder: 'Введите название товара',
			name: 'titleSRB',
			value: activeProduct?.title?.rs,
		},
		{
			id: 3,
			type: 'text',
			text: 'Название товара ENG',
			placeholder: 'Введите название товара',
			name: 'titleENG',
			value: activeProduct?.title?.en,
		},
		{
			id: 4,
			type: 'text',
			text: 'Описание товара RU',
			placeholder: 'Введите описание товара',
			name: 'descriptionRU',
			value: activeProduct?.description?.ru,
		},
		{
			id: 5,
			type: 'text',
			text: 'Описание товара UA',
			placeholder: 'Введите описание товара',
			name: 'descriptionUA',
			value: activeProduct?.description?.ua,
		},
		{
			id: 6,
			type: 'text',
			text: 'Описание товара SRB',
			placeholder: 'Введите описание товара',
			name: 'descriptionSRB',
			value: activeProduct?.description?.rs,
		},
		{
			id: 7,
			type: 'text',
			text: 'Описание товара ENG',
			placeholder: 'Введите описание товара',
			name: 'descriptionENG',
			value: activeProduct?.description?.en,
		},
		{
			id: 8,
			type: 'select',
			text: 'Категория товара',
			placeholder: 'Выберите категорию товара ',
			name: 'text',
			value: activeProduct?.categories[0]?.ru,
		},
		{
			id: 9,
			type: 'number',
			text: 'Цена в долларах',
			placeholder: 'Введите цену',
			name: 'price',
			value: activeProduct?.price?.slice(0, -1),
		},
		{
			id: 10,
			type: 'number',
			text: 'Количество товара',
			placeholder: 'Введите количество товаров',
			name: 'quantity',
			value: activeProduct?.quantity,
		},
	];

	interface InputsStateValidType {
		[key: number]: boolean;
	}
	const inputsStateInition = [...inputs].reduce((accumulator, currentValue) => {
		accumulator[currentValue.id] = true;
		return accumulator;
	}, {} as InputsStateValidType);

	const [inputsState, setInputsState] =
		React.useState<InputsStateValidType>(inputsStateInition);

	//логика для инпутов
	//
	//
	//
	//
	//
	//
	//
	//логика для инпутова

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

	activeCategories = categoryArr.find((el) => {
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
			const payload: number | string = event.target.value;
			dispatch(setPrice(Number(payload)));
		}
		//sizeChartDescr
		if (event.target.name === 'sizeChartDescrUA') {
			const payload: any = {
				branch: 'ua',
				sizeChartImageDescription: event.target.value,
			};
			dispatch(setSizeChartImageDescription(payload));
		}
		if (event.target.name === 'sizeChartDescrRU') {
			const payload: any = {
				branch: 'ru',
				sizeChartImageDescription: event.target.value,
			};
			dispatch(setSizeChartImageDescription(payload));
		}
		if (event.target.name === 'sizeChartDescrRS') {
			const payload: any = {
				branch: 'rs',
				sizeChartImageDescription: event.target.value,
			};
			dispatch(setSizeChartImageDescription(payload));
		}
		if (event.target.name === 'sizeChartDescrEN') {
			const payload: any = {
				branch: 'en',
				sizeChartImageDescription: event.target.value,
			};
			dispatch(setSizeChartImageDescription(payload));
		}
	}

	return (
		<>
			<div
				style={
					editProductItemId >= 1 ? { display: 'block' } : { display: 'none' }
				}
			>
				<div
					style={
						editProductItemId >= 1 ? { display: 'flex' } : { display: 'none' }
					}
					className={s.wrapper}
				>
					{inputs.map((obj, ind) => {
						return (
							<div key={ind} className={s.inputs_wrapper}>
								{obj.type === 'text' ? (
									<div className={s.wrapper_input_main}>
										<div className={s.title}>{obj.text}</div>
										<input
											defaultValue={obj.value}
											onBlur={handleBlurSet}
											className={s.input}
											type={obj.type}
											placeholder={obj.placeholder}
											name={obj.name}
											required
										/>
									</div>
								) : obj.type === 'number' ? (
									<div className={s.wrapper_input_main}>
										<div className={s.title}>{obj.text}</div>
										<input
											defaultValue={obj.value}
											onBlur={handleBlurSet}
											className={s.input}
											type={obj.type}
											placeholder={obj.placeholder}
											name={obj.name}
										/>
									</div>
								) : obj.type === 'select' ? (
									<label className={s.select__wrapper} htmlFor={`${id}`}>
										<div className={s.title}>{obj.text}</div>
										<input
											style={{ cursor: 'poiter' }}
											onClick={(e) => {
												setCategoriesDisplay(!categoriesDisplay);
											}}
											id={`${id}`}
											readOnly
											className={
												inputsState[id]
													? `${s.input} ${s.input_category}`
													: `${s.input_off_valid} ${s.input_category}`
											}
											type={obj.type}
											placeholder={activeCategory?.ru}
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
															setCategoriesDisplay(!categoriesDisplay);
															dispatch(setCategories(el.id));
															setActiveCategory(el);
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
								) : (
									''
								)}
							</div>
						);
					})}
				</div>

				<div className={s.addphoto_wrapper}>
					<span className={s.title}>Добавить фото товара</span>
					<span
						className={s.btn}
						// onClick={(e) => {
						// 	//@ts-ignore
						// 	// dispatch(addCountPhotos());

						// }}
						onClick={uploadPhoto}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.75 12H20.25"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M12 3.75V20.25"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</div>

				{/* мепаю вофо существующих товаров  */}

				<div className={s.photos_wrapper}>
					{/* 	{userEdit.images.map((el: any, ind: number) => {
						return (
							<div className={s.item}>
								<span className={s.index}>{ind}</span>
								<span className={s.button_product}>lflflfllflflf</span>
								<div className={s.photos_wrapper}>
									{el.imagesPaths.map((el: any) => {
										return (
											<span className={s.photo_wrapper}>
												<Image src={el} alt={'photo'} />
											</span>
										);
									})}
								</div>
							</div>
						);
					})} */}

					{allEditsImages?.map((el, ind1) => {
						return (
							<div
								key={ind1 + '' + el?.imagesPaths[1] + new Date()}
								className={s.item}
							>
								<div className={s.info_wrapper}>
									<span className={s.index}>{`${ind1 + 1}.`}</span>

									{el !== null ? (
										<span
											onClick={() => deleteImageObj(el)}
											className={s.button_product}
											style={{
												color: `${
													el?.colour?.hex ??
													fetchedColours.find(
														(elem) => elem.id === el?.colourId
													)?.hex + ''
												}`,
												border: `${
													el?.colour?.hex ??
													fetchedColours.find(
														(elem) => elem.id === el?.colourId
													)?.hex + ''
												} solid 1.5px`,
											}}
										>
											Удалить сет
										</span>
									) : (
										<span
											style={{
												color: '#0B0B0B',
												border: '#0B0B0B solid 1.5px',
											}}
											className={s.button_product_add}
											onClick={() => {
												dispatch(setModalAddEditProduct(true));
											}}
										>
											Загрузить фото
										</span>
									)}
								</div>

								{el && (
									<div className={s.photos_wrapper}>
										{el?.imagesPaths?.map((el: any, ind) => {
											return (
												<span key={ind} className={s.photo_wrapper}>
													<Image
														//src={typeof el === 'string' ? URL.createObjectURL(el) : 3}
														src={el}
														alt={'photo'}
														width={70}
														height={102}
													/>
												</span>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={s.net_wrapper}>
					<div className={s.net_inputs}>
						<div className={s.input_wrapper}>
							<span className={s.net_title}>Описание размерной сетки UA</span>
							<input
								onBlur={handleBlurSet}
								defaultValue={activeProduct?.title?.ua}
								placeholder="Введите описание"
								className={s.input_inner}
								type="text"
								name="sizeChartDescrUA"
							/>
						</div>
						<div className={s.input_wrapper}>
							<span className={s.net_title}>Описание размерной сетки RU</span>
							<input
								onBlur={handleBlurSet}
								defaultValue={activeProduct?.title?.ru}
								placeholder="Введите описание"
								className={s.input_inner}
								type="text"
								name="sizeChartDescrRU"
							/>
						</div>
					</div>

					<div className={s.net_inputs}>
						<div className={s.input_wrapper}>
							<span className={s.net_title}>Описание размерной сетки SRB</span>
							<input
								onBlur={handleBlurSet}
								defaultValue={activeProduct?.title?.rs}
								placeholder="Введите описание"
								className={s.input_inner}
								type="text"
								name="sizeChartDescrRS"
							/>
						</div>
						<div className={s.input_wrapper}>
							<span className={s.net_title}>Описание размерной сетки EN</span>
							<input
								onBlur={handleBlurSet}
								defaultValue={activeProduct?.title?.rs}
								placeholder="Введите описание"
								className={s.input_inner}
								type="text"
								name="sizeChartDescrEN"
							/>
						</div>
					</div>

					{/* {SizeChartArr.map((obj)=>{
                        return <SizeChart 
                        key={obj.id} 
                        leng={obj.leng} 
                        id={obj.id} 
                        placeholder={obj.placeholder} 
                        title={obj.title} 
                        // valid={validChartState[obj.id] }
                        // setValid={setValidChartState}
                        />
                    })} */}

					{/* <div className={s.desription_net_wrapper}>
            <span className={s.title}>Описание размерной сетки</span>
            <input className={s.input} name="desription_net" type="text" placeholder={'Описание размерной сетки'} />
          </div> */}
				</div>

				<div className={s.file_net_wrapper}>
					<span className={s.title}>Загрузите размерную сетку</span>
					<label className={s.label} htmlFor="uploadnet">
						Изменить размерную сетку
					</label>
					<input
						onChange={(e) => {
							setNetFile(e.target.files[0]);
						}}
						className={s.input_file}
						id="uploadnet"
						name="net_file"
						type="file"
					/>
				</div>
				{netFile && (
					<div className={s.net_file_wrapper}>
						<div className={s.net_file_inner}>
							<span
								onClick={() => setNetFile(null)}
								className={s.net_backround}
							></span>
							<svg
								onClick={() => setNetFile(null)}
								className={s.remove_photo}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.75 5.25L5.25 18.75"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M18.75 18.75L5.25 5.25"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<Image
								className={s.net_file}
								width={308}
								height={60}
								src={
									typeof netFile === 'string'
										? netFile
										: URL.createObjectURL(netFile)
								}
								alt={'photo'}
							/>
						</div>
					</div>
				)}

				{/* размер товара делаю интуп и СЕТАЮ существующие в отдельную переменную , меняю ее в редактировке и отправляю при отправке */}

				<div className={s.choice_size_wrapper}>
					<span className={s.choice_size_title}>Размер товара</span>
					<label
						className={s.choice_size_label}
						onClick={() => {
							setChoiseSize(!choiseSize);
						}}
						htmlFor="choisesize"
					>
						Выберите размер
						<input
							onClick={() => {
								setChoiseSize(!choiseSize);
							}}
							className={s.input_colours}
							disabled
							id="choisesize"
							placeholder="Выберите размер"
							type="text"
						/>
						<Image
							className={
								choiseSize
									? `${s.input_icon_on} ${s.input_icon}`
									: `${s.input_icon_off} ${s.input_icon}`
							}
							src={openInput}
							alt="error"
						/>
					</label>

					<div
						className={
							choiseSize ? s.choise_set_wrapper : s.choise_set_wrapper_off
						}
					>
						{sizesItems
							.filter((el) => !selectedSizes?.includes(el.size))
							.map((el, ind) => {
								return (
									<div
										onClick={() => {
											setChoiseSize(!choiseSize);
											dispatch(setSizesFromServer(el.size));
										}}
										key={ind}
										className={s.choise_set_item}
									>
										<span
											style={{ cursor: 'pointer' }}
											className={s.choise_set_title}
										>
											{el.size}
										</span>
									</div>
								);
							})}
					</div>

					<div className={s.selected_sizes}>
						{selectedSizes?.map((el, ind) => {
							return (
								<span className={s.selected_sizes_item} key={ind}>
									<SizeItem isInEdit={true} key={ind} id={ind} size={el} />
								</span>
							);
						})}
					</div>
				</div>

				{/* <div
					onClick={() => {
						setChoiceColors(!choiceColors);
						// console.log('click')
					}}
					className={s.colours_select_wrapper}
				>
					<div className={s.title}>Цвет товара</div>
					<label className={s.label_colors} htmlFor="colorsbyproduct">
						Выберите цвет
						<input
							onClick={(e) => {
								e.stopPropagation();
							}}
							className={s.input_colors}
							id="colorsbyproduct"
							type="text"
						/>
						<Image
							className={
								choiseSize
									? `${s.input_icon_on} ${s.input_icon}`
									: `${s.input_icon_off} ${s.input_icon}`
							}
							src={openInput}
							alt="error"
						/>
					</label>
					<div
						className={
							choiceColors
								? s.choice_colors_wrapper
								: s.choice_colors_wrapper_off
						}
					>
						{colors.map((el, ind) => {
							return (
								<div key={ind} className={s.item_wrapper}>
									<span
										style={{
											marginLeft: '20px',
											backgroundColor: `${el.hex}`,
											display: 'block',
											height: '23px',
											width: '23px',
										}}
										className={s.color}
										onClick={(e) => {
											e.stopPropagation();
										}}
									/>
									<span
										className={s.title}
										onClick={(e) => {
											e.stopPropagation();
										}}
									>
										{el.ua}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				<div className={s.select_colors_wrapper}>
					{userEdit.colours?.map((el, ind) => {
						return <ColorItem key={ind} hex={el.hex} label={el.ua} />;
					})}
				</div> */}

				{/* тоже самое с цветами , сатею в отдельную переменную, локальную переменную после чего с ней работаю и отправляю при отправке ее уже  */}
				<div className={s.send_wrapper}>
					<span onClick={cancelEditingProduct} className={s.send_cancel}>
						Отмена
					</span>
					<span onClick={getStateRedux} className={s.send}>
						Изменить товар
					</span>
				</div>
			</div>
		</>
	);
};
