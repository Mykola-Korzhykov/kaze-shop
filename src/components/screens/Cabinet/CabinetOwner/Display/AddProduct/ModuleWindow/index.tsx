import React from 'react';
import s from './ModuleWindow.module.scss';
import { SizeItem } from '../SizesItem';
import Image from 'next/image';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';

import {
	setSizes,
	setColors,
	setImagesPng,
	removeAll,
	setAllcoloursId,
	setAllsizes,
	setArrObjMod,
} from '../../../../../../../redux/slices/formData';
import { devNull } from 'os';
import {
	setModalAddPhoto,
	setModalAddColor,
} from '../../../../../../../redux/slices/modal';
import { setImageUrl } from '../../../../../../../redux/slices/modal';
import {
	fetchCategories,
	fetchColours,
} from '../../../../../../../redux/slices/goods';
import { setColorsStyle } from '../../../../../../../redux/slices/admin';

interface ModuleWindowImagesProps {
	fileNames: string[];
	colourId: number;
	sizes: string[];
}

interface ModuleWindiwProps {
	setModalAddPhoto?: (n: boolean) => void;
	modalAddPhoto?: boolean;
	setChoiceColor?: (n: boolean) => void;
	choiceColor?: boolean;
	setModalAddColor?: (n: boolean) => void;
	modalAddColor?: boolean;
	imagesData?: File[];
	setImages?: (n: any) => void;
	files: File[];
	setFiles: (n: any) => void;
	pngImageShow: File;
	setPngImageShow: (n: any) => void;
	jpgImagesShow: File[];
	setJpgImagesShow: (n: any) => void;
}

export const ModuleWindiw = ({
	modalAddPhoto,
	setChoiceColor,
	choiceColor,
	setModalAddColor,
	modalAddColor,
	imagesData,
	setImages,
	setFiles,
	files,
	pngImageShow,
	setPngImageShow,
	jpgImagesShow,
	setJpgImagesShow,
}: ModuleWindiwProps) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const dispatch = useAppDispatch();
	//local state
	// const [files, setFiles] = React.useState<File[]>([]);
	// const [arrObjMod, setArrObjMod] = React.useState([])
	// const [allFiles, setAllFiles] = React.useState([]);
	//redux state
	const allSizes = useSelector((state: RootState) => state.formData.allsizes);
	const allcoloursId = useSelector(
		(state: RootState) => state.formData.categories
	);
	const selectedSizes = useSelector((state: RootState) => state.formData.sizes);
	// const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
	const sizesItems = useSelector((state: RootState) => state.admin.sizesItems);

	//getinput_choice_photo
	const categories = useSelector(
		(state: RootState) => state.goods.fetchedCategories
	);
	const fetchedCategories = useSelector(
		(state: RootState) => state.goods.fetchedCategories
	);
	const colourId = useSelector((state: RootState) => state.formData.colourId);

	const fetchColoursArr = useSelector(
		(state: RootState) => state.goods.fetchedColours
	);
	const selectedImages = useSelector(
		(state: RootState) => state.formData.arrObjMod
	);

	const selectedColor = fetchColoursArr.find((el) => el.id === colourId);
	const [checkForm, setCheckForm] = React.useState<boolean>(false);
	const [isProductAdded, setIsProductAdded] = React.useState<number>(0);
	//all valied forms
	interface FormState {
		pngImageShow: boolean;
		jpgImagesShow: boolean;
		colourId: boolean;
		sizes: boolean;
	}

	const [allValiedForm, setAllValiedForm] = React.useState<FormState>({
		pngImageShow: false,
		jpgImagesShow: false,
		colourId: false,
		sizes: false,
	});

	const newColoursArr = fetchColoursArr
		? [
				...fetchColoursArr,
				{
					hex: '#A6BEE5',
					id: -48093899940393,
					ru: 'Добавить цвет',
					rs: 'rs',
					en: 'en',
					ua: 'Добавить цвет',
				},
		  ]
		: null;

	const renderColorsArr = newColoursArr.filter((colour) => {
		// Фильтруем элементы массива newColoursArr
		// проверяя, содержит ли массив arr2 элементы с таким же id
		// console.log('colour', colour);

		// console.log(
		// 	'!selectedImages.some((item) => item.colourId === colour.id);',
		// 	!selectedImages.some((item) => item.colourId === colour.id)
		// );
		return !selectedImages.some((item) => {
			// console.log('item', item);
			return item.colourId === colour.id;
		});
	});

	const filteredSizesItems = sizesItems.filter((sizeItem) => {
		return !selectedSizes.some((selectedImage) => {
			return selectedImage.includes(sizeItem.size);
		});
	});

	// console.log('renderColorsArr', renderColorsArr);
	//modal backround
	const [choiceSize, setChoiceSize] = React.useState<boolean>(false);

	function checkValiedForm(obj: any) {
		for (const key in obj) {
			if (
				obj[key] === null ||
				(Array.isArray(obj[key]) && obj[key].length < 1)
			) {
				return false;
			}
		}
		return true;
	}

	console.log('allValiedForm', allValiedForm);

	function generationObjModal() {
		const obj = {
			fileNames: files.map((el) => {
				return el.name;
			}),
			colourId: colourId,
			sizes: selectedSizes,
		};

		dispatch(setAllcoloursId(colourId));
		dispatch(setAllsizes(obj.sizes));
		dispatch(setArrObjMod(obj));

		const payload = selectedColor.hex;
		dispatch(setColorsStyle(payload));

		// console.log('obj', obj)
		// setImages([...imagesData, ...files])
		// console.log('arrObjMods', arrObjMods)
		// console.log('files', files)
		// console.log('imagesData', imagesData)

		dispatch(removeAll());
		setFiles([]);
		dispatch(setModalAddPhoto(false));
		// const file = files[0];
		// const url = URL.createObjectURL(file);
		const urls = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const url = URL.createObjectURL(file);
			urls.push(url);
		}

		// setImageUrl(url)
		dispatch(setImageUrl(urls));
	}

	const handleFileUploadJpg = (event: React.ChangeEvent<HTMLInputElement>) => {
		// setAllValiedForm((prevState)=> {...prevState} )

		setIsProductAdded(isProductAdded + 1);
		setFiles((prevArray: File[]) => [...prevArray, event.target.files[0]]);
		setImages((prevArray: File[]) => [...prevArray, event.target.files[0]]);
		setJpgImagesShow((prevArray: File[]) => [
			...prevArray,
			event.target.files[0],
		]);
		// setAllValiedForm((prevState) => ({
		// 	...prevState,
		// 	jpgImagesShow: false,
		// }));

		// const label = event.target.parentElement as HTMLLabelElement;
		// if (checkForm && allValiedForm['pngImageShow']) {
		// 	label.classList.remove(s.input_invalid);
		// } else {
		// 	label.classList.toggle(s.input_invalid);
		// }
	};

	const handleFileUploadPng = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPngImageShow(event.target.files[0]);
		setIsProductAdded(isProductAdded + 1);
		// set photo setFiles
		const hasPngFiles = files.some((image) => {
			return image.name.endsWith('.png');
		});
		//console.log('hasJpgImage', hasJpgFiles)
		if (hasPngFiles) {
			return;
		} else {
			setFiles((prevArray: File[]) => [event.target.files[0], ...prevArray]);
		}
		//set photo setImages
		const hasPngImages = imagesData.some((image) => {
			return image.name.endsWith('.png');
		});
		if (hasPngImages) {
			return;
		} else {
			setImages((prevArray: File[]) => [event.target.files[0], ...prevArray]);
		}
	};

	return (
		<div
			style={
				modalAddColor ? { visibility: 'hidden' } : { visibility: 'visible' }
			}
			className={s.module_wrapper}
		>
			<div className={s.module_inner}>
				<div
					onClick={() => dispatch(setModalAddPhoto(false))}
					className={s.close_modal}
				>
					<svg
						className={s.open_icon}
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M25 7L7 25"
							stroke="black"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M25 25L7 7"
							stroke="black"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				<div className={s.title_wrapper}>
					<div className={s.title}>Добавить фотографию</div>
					<div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
				</div>

				<div className={s.inputs_wrapper}>
					<div className={s.input_inner}>
						<span className={s.title}> Фотография в png </span>
						<label
							style={{
								backgroundColor: pngImageShow ? `#9D9D9D ` : '',
								color: pngImageShow
									? `black `
									: !checkForm || (checkForm && !allValiedForm['pngImageShow'])
									? '#9D9D9D '
									: '#E73232',
								border: pngImageShow
									? `black 1.5px solid`
									: !checkForm || (checkForm && !allValiedForm['pngImageShow'])
									? `#9D9D9D 1.5px solid`
									: `#E73232 1.5px solid`,
								opacity: pngImageShow ? `0.4` : `1`,
							}}
							className={
								!checkForm || (checkForm && !allValiedForm['pngImageShow'])
									? s.label_input_file
									: `${s.label_input_file} ${s.input_invalid}`
							}
							htmlFor="uploadfileaddphotopng"
						>
							{pngImageShow ? `Фото загружено ` : `Загрузите фотографию`}
							<input
								accept="image/png"
								disabled={pngImageShow ? true : false}
								key={Math.random()}
								ref={inputRef}
								onChange={handleFileUploadPng}
								id="uploadfileaddphotopng"
								className={s.input_file}
								placeholder="Загрузите фотографию"
								type="file"
								name="uploadfileaddphotopng"
							/>
						</label>
						{/* выбраные фото */}

						{pngImageShow && (
							<div className={s.image_selecte_wrapper}>
								<span
									onClick={() => {
										setPngImageShow(null);
										//убираем эту фотку с загального массива фоток
										setImages((prevArray: File[]) => {
											const newArray = [...prevArray];
											const activeIndex = newArray.indexOf(pngImageShow);
											newArray.splice(activeIndex, 1);
											return newArray;
										});
										//удаляем эту фотку с локального стейта ( массива ) фоток
										setFiles((prevArray: File[]) => {
											const newArray = [...prevArray];
											const activeIndex = newArray.indexOf(pngImageShow);
											newArray.splice(activeIndex, 1);
											return newArray;
										});
									}}
									className={s.img_wrapper}
								>
									<span className={s.img_backround}></span>
									<svg
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
										width={70}
										height={102}
										className={s.imges_selected}
										style={{}}
										src={URL.createObjectURL(pngImageShow)}
										alt={'photo'}
									/>
								</span>
							</div>
						)}
					</div>

					<div className={s.input_inner}>
						<span className={s.title}>Фотография в jpg </span>
						<label
							className={
								!checkForm || (checkForm && !allValiedForm['pngImageShow'])
									? `${s.label_input_file}`
									: `${s.label_input_file} ${s.input_invalid}`
							}
							htmlFor="uploadfileaddphotojpg"
						>
							Загрузите фотографию
							<input
								accept="image/jpg"
								key={Math.random()}
								ref={inputRef}
								multiple
								onChange={handleFileUploadJpg}
								id="uploadfileaddphotojpg"
								className={`${s.input_file}`}
								placeholder="Загрузите фотографию"
								type="file"
								name="uploadfileaddphotojpg"
							/>
						</label>
						{/* label_input_file_invalable */}

						<div className={s.png_show_wrapper}>
							{jpgImagesShow &&
								jpgImagesShow.map((el: File, ind) => {
									return (
										<span
											onClick={() => {
												// console.log('Deletefiles', files);
												// console.log('DeleteImagesData', imagesData);
												//console.log('click')
												//убираем рендеринг какой - фотки
												setJpgImagesShow((prevArray: File[]) => {
													const newArray = [...prevArray];
													newArray.splice(ind, 1);
													return newArray;
												});
												//убираем эту фотку с загального массива фоток
												setImages((prevArray: File[]) => {
													const newArray = [...prevArray];
													const activeIndex = newArray.indexOf(el);
													newArray.splice(activeIndex, 1);
													return newArray;
												});
												//удаляем эту фотку с локального стейта ( массива ) фоток
												setFiles((prevArray: File[]) => {
													const newArray = [...prevArray];
													const activeIndex = newArray.indexOf(el);
													newArray.splice(activeIndex, 1);
													return newArray;
												});
											}}
											className={s.png_show_item}
											key={ind}
										>
											<span className={s.img_backround}></span>
											<svg
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
												width={70}
												height={102}
												className={s.imges_selected}
												style={{}}
												src={URL.createObjectURL(el)}
												alt={'photo'}
											/>
										</span>
									);
								})}
						</div>
					</div>

					{/* <div className={s.input_inner}>
                    <span className={s.title}>Фотография в png</span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotopng">
                        Загрузите фотографию
                        <input  key={Math.random()} multiple onChange={handleFileUploadPng} id="uploadfileaddphotopng" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                    </label>
                </div> */}

					<div className={s.input_inner}>
						<span className={s.title}>Размер</span>
						<span
							onClick={() => {
								setChoiceSize(!choiceSize);
							}}
							className={
								!checkForm || (checkForm && !allValiedForm['sizes'])
									? `${s.input_choice_photo}`
									: `${s.input_choice_photo} ${s.input_invalid}`
							}
						>
							Выбрать размер
							{choiceSize ? (
								<svg
									className={s.open_icon}
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M25 7L7 25"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M25 25L7 7"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg
									className={s.open_icon}
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M26 12L16 22L6 12"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
							<div
								className={
									choiceSize
										? `${s.choice_photo_wrapper} ${s.choice_photo_on}`
										: `${s.choice_photo_wrapper} ${s.choice_photo_off}`
								}
							>
								{filteredSizesItems.map((el, ind) => {
									return (
										<span
											onClick={() => {
												if (!selectedSizes.includes(el.size)) {
													dispatch(setSizes(el.size));
													setAllValiedForm((prevState) => ({
														...prevState,
														sizes: false,
													}));
													// setAllValiedForm((prevState) => {...prevState, })
												}
											}}
											key={ind}
											className={s.item_choice_photo}
										>
											{el.size}
										</span>
									);
								})}
							</div>
						</span>
					</div>

					<div className={s.sizes}>
						{selectedSizes?.map((el, ind) => {
							return <SizeItem key={ind} size={el} id={ind} />;
						})}
					</div>

					<div className={s.input_inner}>
						<span className={s.title}>Цвет</span>
						<span
							onClick={(e) => {
								setChoiceColor(!choiceColor);
							}}
							className={
								!checkForm || (checkForm && !allValiedForm['colourId'])
									? s.input_choice_color
									: ` ${s.input_choice_color} ${s.input_invalid}`
							}
						>
							{!colourId ? (
								'Выбрать цвет'
							) : (
								<span className={s.selected_color_placeholder}>
									<span
										className={s.color}
										style={{
											backgroundColor: `${
												selectedColor ? selectedColor.hex : ''
											}`,
										}}
									></span>
									<span className={s.text}>
										{selectedColor ? selectedColor.ru : ''}
									</span>
								</span>
							)}
							{choiceColor ? (
								<svg
									className={s.open_icon}
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M25 7L7 25"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M25 25L7 7"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg
									className={s.open_icon}
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M26 12L16 22L6 12"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</span>
						{/* style={{top: selectedSizes?.length > 0 ? '500px' : '453.5px'}} */}
						<div
							className={
								choiceColor ? s.color_wrapper_main : s.color_wrapper_main_off
							}
							style={{}}
						>
							{choiceColor
								? renderColorsArr?.map((el, ind) => {
										return el.id !== -48093899940393 ? (
											<div
												onClick={() => {
													setAllValiedForm((prevState) => ({
														...prevState,
														colourId: false,
													}));
													dispatch(setColors(el.id));
													setChoiceColor(!choiceColor);
												}}
												key={ind}
												className={s.color_wrapper}
											>
												<span
													className={s.color}
													style={{
														backgroundColor: `${el.hex}`,
													}}
												></span>
												<span className={s.title}>{el.ru}</span>
											</div>
										) : (
											<div
												onClick={() => {
													// setModalAddColor(true)
													//@ts-ignore
													dispatch(setModalAddColor(true));
													setChoiceColor(!choiceColor);
													// dispatch()
												}}
												key={ind}
												className={s.color_wrapper}
											>
												<svg
													className={s.plus}
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M3.75 12H20.25"
														stroke="#9D9D9D"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M12 3.75V20.25"
														stroke="#9D9D9D"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>

												<span className={s.title}>{el.ru}</span>
											</div>
										);
								  })
								: ''}
						</div>
					</div>

					<div
						className={s.btn_wrapper}
						style={{ marginTop: checkForm ? '0px' : '20px' }}
					>
						{checkForm && (
							<div className={s.check_form}>
								Чтобы добавить фото товару, полностью заполните форму
							</div>
						)}

						<button
							onClick={() => {
								const allStateForm = {
									pngImageShow,
									jpgImagesShow,
									colourId,
									sizes: selectedSizes,
								};

								for (const key in allStateForm) {
									//@ts-ignore
									if (
										//@ts-ignore
										allStateForm[key] === null || //@ts-ignore
										(Array.isArray(allStateForm[key]) && //@ts-ignore
											allStateForm[key].length < 1)
									) {
										setAllValiedForm((prevState) => {
											return { ...prevState, [key]: true };
										});
									} else {
										setAllValiedForm((prevState) => {
											return { ...prevState, [key]: false };
										});
									}
								}

								if (checkValiedForm(allStateForm)) {
									setCheckForm(false);
									generationObjModal();
									setPngImageShow(null);
									setJpgImagesShow([]);
								} else {
									setCheckForm(true);
								}
							}}
							className={s.btn}
						>
							Добавить фотографию
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
