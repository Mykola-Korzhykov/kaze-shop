import React from 'react';
import s from './ModalAddCategory.module.scss';
//redux
import { useSelector } from 'react-redux';
import { CSSProperties } from 'react';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { setModalAddCAtegory } from '../../../../../../../redux/slices/modal';
import axios from 'axios';
import { API_URL } from '../../../../../../../services/index';
import { parseCookies } from 'nookies';
import { setProductForm } from '@/redux/slices/modal';

interface ModalAddCategoryProps {
	// setModalAddCAtegory: (n: boolean)=> void,
	// modalAddCAtegory: boolean,
}

interface inputsStateType {
	ua: string;
	ru: string;
	rs: string;
	en: string;
	//hex: string
}

export const ModalAddCategory = ({}: ModalAddCategoryProps) => {
	const dispatch = useAppDispatch();
	const modalAddCAtegory = useSelector(
		(state: RootState) => state.modaleSlice.modalAddCAtegory
	);

	const [stateInputs, setStateInputs] = React.useState<inputsStateType>({
		ua: '',
		ru: '',
		rs: '',
		en: '',
	});
	interface InputsStateValidType {
		[key: string]: boolean;
	}
	const [validInputs, setValidInputs] = React.useState<InputsStateValidType>({
		ua: true,
		ru: true,
		rs: true,
		en: true,
	});
	const [checkForm, setCheckForm] = React.useState<boolean>(false);
	const [sizeWindow, setSizeWindow] = React.useState<number>(0);

	React.useEffect(() => {
		setSizeWindow(window.innerWidth);
	}, []);

	function sendStateInputs(obj: inputsStateType) {
		const cookies = parseCookies();
		const token = cookies.accessToken;

		axios({
			method: 'PUT',
			url: 'categories/create_category',
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (token || ''),
			},

			data: obj,
		})
			.then((response) => {
				if (response && response && response.status === 201)
					dispatch(
						setProductForm({
							turn: true,
							title: 'Категория успешно добавлена',
							subtitle: 'Нажмите “Готово” для того. чтобы продолжить',
							btntitle: 'готово',
							spiner: false,
							bottom:
								sizeWindow < 500
									? -500
									: sizeWindow < 900
									? -800
									: sizeWindow > 1079
									? 650
									: sizeWindow > 1049
									? 850
									: sizeWindow > 899
									? 950
									: 1,
						})
					);
			})
			.catch((error) => {
				dispatch(
					setProductForm({
						turn: true,
						title: 'Error',
						subtitle: `Error: ${error}`,
						btntitle: 'ok',
						spiner: false,
						bottom:
							sizeWindow < 500
								? -500
								: sizeWindow < 900
								? -800
								: sizeWindow > 1079
								? 650
								: sizeWindow > 1049
								? 850
								: sizeWindow > 899
								? 950
								: 1,
					})
				);
			});

		dispatch(
			setProductForm({
				turn: true,
				title: 'Загрузка...',
				subtitle: 'Категория создается',
				btntitle: 'готово',
				spiner: true,
				bottom:
					sizeWindow < 500
						? -500
						: sizeWindow < 900
						? -800
						: sizeWindow > 1079
						? 650
						: sizeWindow > 1049
						? 850
						: sizeWindow > 899
						? 950
						: 1,
			})
		);
	}

	return (
		<div
			style={{
				display: modalAddCAtegory ? 'flex' : 'none',
			}}
			className={s.module_wrapper}
		>
			<div className={s.module_inner}>
				<div
					onClick={() => dispatch(setModalAddCAtegory(false))}
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
					<div className={s.title}>Добавить категорию</div>
					<div className={s.subtitle}>
						Для того, чтобы добавить новую категорию на сайт, просто напишите ее
						название на четырех языках в полях ниже
					</div>
				</div>

				<div className={s.inputs_wrapper}>
					<div className={s.input_inner}>
						<span className={s.title}>Категория (Украинский)</span>
						<label
							style={{
								border: validInputs.ua
									? '1.5px solid #9D9D9D'
									: '1.5px solid #e73232',
							}}
							className={s.label_input_file}
							htmlFor="choosecategoryUA"
						>
							<input
								key={1}
								required
								onChange={(e) => {
									setValidInputs((prevState: InputsStateValidType) => ({
										...prevState,
										ua: e.target.value.trim() !== '' ? true : false,
									}));
								}}
								onBlur={(e) => {
									setStateInputs((prevState) => ({
										...prevState,
										ua: e.target.value,
									}));
									console.log('setStateInputs', stateInputs);
								}}
								id="choosecategoryUA"
								className={
									validInputs.ua
										? s.input_file
										: `${s.input_file} ${s.input_file_invalid}`
								}
								placeholder={'Введите категорию'}
								type="text"
							/>
						</label>
					</div>

					<div className={s.input_inner}>
						<span className={s.title}>Категория (Русский)</span>
						<label
							style={{
								border: validInputs.ru
									? '1.5px solid #9D9D9D'
									: '1.5px solid #e73232',
							}}
							className={s.label_input_file}
							htmlFor="choosecategoryRU"
						>
							<input
								required
								key={2}
								onChange={(e) => {
									setValidInputs((prevState: InputsStateValidType) => ({
										...prevState,
										ru: e.target.value.trim() !== '' ? true : false,
									}));
								}}
								onBlur={(e) => {
									setStateInputs((prevState) => ({
										...prevState,
										ru: e.target.value,
									}));
									console.log('setStateInputs', stateInputs);
								}}
								id="choosecategoryRU"
								className={
									validInputs.ru
										? s.input_file
										: `${s.input_file} ${s.input_file_invalid}`
								}
								placeholder={'Введите категорию'}
								type="text"
							/>
						</label>
					</div>

					<div className={s.input_inner}>
						<span className={s.title}>Категория (Английский)</span>
						<label
							style={{
								border: validInputs.en
									? '1.5px solid #9D9D9D'
									: '1.5px solid #e73232',
							}}
							className={s.label_input_file}
							htmlFor="choosecategoryEN"
						>
							<input
								required
								onChange={(e) => {
									setValidInputs((prevState: InputsStateValidType) => ({
										...prevState,
										en: e.target.value.trim() !== '' ? true : false,
									}));
								}}
								key={3}
								onBlur={(e) => {
									setStateInputs((prevState) => ({
										...prevState,
										en: e.target.value,
									}));
									console.log('setStateInputs', stateInputs);
								}}
								id="choosecategoryEN"
								className={
									validInputs.en
										? s.input_file
										: `${s.input_file} ${s.input_file_invalid}`
								}
								placeholder={'Введите категорию'}
								type="text"
							/>
						</label>
					</div>

					<div className={s.input_inner}>
						<span className={s.title}>Категория (Сербский)</span>
						<label
							style={{
								border: validInputs.rs
									? '1.5px solid #9D9D9D'
									: '1.5px solid #e73232',
							}}
							className={s.label_input_file}
							htmlFor="choosecategoryRS"
						>
							<input
								required
								onChange={(e) => {
									setValidInputs((prevState: InputsStateValidType) => ({
										...prevState,
										rs: e.target.value.trim() !== '' ? true : false,
									}));
								}}
								key={4}
								onBlur={(e) => {
									setStateInputs((prevState) => ({
										...prevState,
										rs: e.target.value,
									}));
									console.log('setStateInputs', stateInputs);
								}}
								id="choosecategoryRS"
								className={
									validInputs.rs
										? s.input_file
										: `${s.input_file} ${s.input_file_invalid}`
								}
								placeholder={'Введите категорию'}
								type="text"
							/>
						</label>
					</div>

					<div className={s.btn_wrapper}>
						{checkForm && (
							<div className={s.check_form}>
								Чтобы добавить категорию, полностью заполните форму
							</div>
						)}

						<button
							style={{ marginTop: checkForm ? '0px' : '50px' }}
							onClick={() => {
								const valid =
									Object.values(validInputs).some((el) => {
										return el === true;
									}) &&
									Object.values(stateInputs).every((el) => {
										return el !== '';
									});

								if (valid) {
									sendStateInputs(stateInputs);
									dispatch(setModalAddCAtegory(false));
									setCheckForm(false);
								} else {
									console.log('validKkk', valid);
									for (const key in stateInputs) {
										const value = stateInputs[key as keyof inputsStateType];
										if (value === '') {
											setValidInputs((prevState: any) => {
												const copyObject = { ...prevState };
												copyObject[key] = false;
												return copyObject;
											});
										}
									}
									setCheckForm(true);
								}
							}}
							className={s.btn_add}
						>
							Добавить категорию
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
