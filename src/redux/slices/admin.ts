import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	Slice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../services';
//types
import { ProductSend } from '../../types/auth';
import {
	fetchedColour,
	Goods,
	GoodsSend,
	GoodsEditTest,
} from '../../types/goods';
import photo from '../../assets/images/main/About/girl.png';
import photoTest from '../../assets/images/product/slider/photo.png';
// хардкор
import imgProduct from '../../assets/images/admin/img.svg';
import { RootState } from '../store';
import Cookies from 'js-cookie';

export const findUsersRole = createAsyncThunk(
	'users/fetchUsersRole',
	async (params: string[], thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		});
		const response = await instance.get(
			`/user/find_users?page=1&pageSize=10&v=${params}`
		);
		return response.data.data;
	}
);

export const getUsersRole = createAsyncThunk(
	'users/getUsers',
	async (params: number, thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		});
		const response = await instance.get(
			`/user/get_users?page=${params}&pageSize=10`
		);
		return response.data.data;
	}
);

export const findUsersAdmin = createAsyncThunk(
	'users/fetchUsersAdmin',
	async (params: string[], thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		});
		const response = await instance.get(
			`/admin/find_admin?page=1&pageSize=10&v=${params}`
		);
		return response.data.data;
	}
);

export const getUsersAdmin = createAsyncThunk(
	'users/getAdmins',
	async (params: number, thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		});
		const response = await instance.get(
			`/admin/get_admins?page=${params}&pageSize=10`
		);
		return response.data.data;
	}
);

export interface User {
	id: number;
	name: string;
	surname: string;
	email: string;
	phoneNumber: string;
	isAdmin: boolean;
	addContent: boolean;
	editContent: boolean;
	editWebsite: boolean;
}

export interface initialStateType {
	startMain: boolean;
	userEdit: GoodsEditTest;
	usersRole: User[];
	usersAdmin: User[];
	usersRoleStatus: 'loading' | 'success' | 'error403' | 'error' | 'pending';
	usersAdminStatus: 'loading' | 'success' | 'error403' | 'error' | 'pending';

	inputs: {
		id: number;
		text: string;
		placeholder: string;
		label: string;
		type: string;
	}[];
	sizesend: [
		{
			id: number;
			size: string;
		}
	];
	colors: {
		label: string;
		hex: string | null;
		id: number;
	}[];
	addPhotoState: { id: number }[];
	sizesItems: { id: number; size: string }[];
	categoryArr: { id: number; title: string }[];
	loading: boolean;
	error: string;
	//editProducts
	products: ProductSend[];
	editProductItemId: number;
	displayActive: number;
	countPhotos: any[];

	editProducts: GoodsSend[];
	arrObjModalSwow: {
		imagesPaths: string[] | File[];
		colourId: number;
		sizes: string[];
	}[];
	colorsStyle: string[];

	// colours: fetchedColour[]
}

const initialState: initialStateType = {
	startMain: false,
	arrObjModalSwow: [],
	colorsStyle: [],
	//@ts-ignore
	userEdit: {
		id: 1,
		title: {
			ua: 'Павло',
			ru: ' Паша',
			rs: 'хз',
			en: 'The best',
		},
		description: {
			ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
			ru: 'на русс опис doprepwfieifweifipowerf',
			rs: 'на rs опис лдощцаозщуцощауоазуцща',
			en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
		},
		price: 300,
		quantity: 100,
		// { fileNames: string[], colourId: number; sizes: string[]}
		images: [
			{
				imagesPaths: [photoTest, photoTest],
				colour: {
					hex: '#FFE4C4',
					id: 1,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				sizes: ['S', 'M', 'L'],
			},
			{
				imagesPaths: [photoTest, photoTest],
				colour: {
					hex: 'red',
					id: 1,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				sizes: ['S', 'M', 'L'],
			},
		],
		sizeChartImage: 'kfkf',
		sizeChartImageDescription: '21231231',
		hexes: ['blue', 'red'],
		sizes: [],
		colours: [
			{
				hex: '#FFE4C4',
				id: 1,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#9F8E84',
				id: 2,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#000080',
				id: 3,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#A6BEE5',
				id: 4,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#FFE4C4',
				id: 1,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#9F8E84',
				id: 2,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#000080',
				id: 3,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
			{
				hex: '#A6BEE5',
				id: 4,
				ru: 'ru',
				rs: 'rs',
				en: 'en',
				ua: 'ua',
				type: 'colour',
				createdAt: 'test',
				updatedAt: 'test',
			},
		],
		categories: [
			{
				id: 1,
				ua: 'Категорія 1',
				en: 'Категория 1',
				rs: 'Категорія 1 rs',
				ru: 'Категорія 1 ru',
				type: 'category',
				createdAt: 'any',
				updatedAt: 'any',
			},
		],
	},

	usersRoleStatus: 'success',
	usersAdmin: [
		// {
		// 	id: 1,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 2,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 3,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 4,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 5,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
	],

	usersAdminStatus: 'success',

	usersRole: [
		// {
		// 	id: 1,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: false,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 2,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 3,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: true,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 4,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: false,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
		// {
		// 	id: 5,
		// 	name: 'Pavlo',
		// 	surname: 'Kolumyp',
		// 	email: ' pashawork@gmail.com',
		// 	phoneNumber: '+380688874920',
		// 	isAdmin: false,
		// 	addContent: false,
		// 	editContent: true,
		// 	editWebsite: false,
		// },
	],
	inputs: [],
	sizesend: [{ id: 0, size: 'XS' }],
	colors: [
		// { label: 'Бежевый', hex: '#FFE4C4', id: 1 },
		// { label: 'Капучинный', hex: '#9F8E84', id: 2 },
		// { label: 'Синий', hex: '#000080', id: 3 },
		// { label: 'Голубой', hex: '#A6BEE5', id: 4 },
		// { label: 'Коричневый', hex: '#0B0B0B', id: 5 },
		// { label: 'Изумрудный', hex: '#24514C', id: 6 },
		// { label: 'Розовый', hex: '#FFC0CB', id: 7 },
		// { label: 'Фиолетовый', hex: '#800080', id: 8 },
		// { label: 'Черный', hex: '#0B0B0B', id: 52 },
		// { label: 'Оливковый', hex: '#829E86', id: 432 },
		// { label: 'Белый', hex: '#fff', id: 34314 },
		// { label: 'Серый', hex: '#808080', id: 13413413413 },
		// { label: 'Графитовый', hex: '#525A5B', id: 57567 },
		// { label: 'Пудровый', hex: '#F2E2D8', id: 75756756 },
		// { label: 'Добавить цвет ', hex: null, id: 75756756 },
	],
	addPhotoState: [{ id: 1 }],
	sizesItems: [
		{ id: 0, size: 'XS' },
		{ id: 1, size: ' XS-S' },
		{ id: 2, size: 'S' },
		{ id: 3, size: 'S-M' },
		{ id: 4, size: 'M' },
		{ id: 5, size: 'L' },
		{ id: 6, size: 'L-XL' },
		{ id: 7, size: '2XL' },
		{ id: 8, size: '3XL' },
		{ id: 9, size: '4XL' },
	],
	categoryArr: [
		{ id: 1, title: 'первая категоря' },
		{ id: 2, title: 'вторая' },
		{ id: 0.1, title: 'уоуооуоуоуоуоуоу категория ' },
	],
	loading: false,
	error: 'no error',
	products: [
		{
			title: {
				ua: 'ProductUA',
				ru: 'ProductRU',
				rs: 'ProductRS',
				en: 'ProductEN',
			},
			description: {
				ua: 'ProductUA',
				ru: 'ProductRU',
				rs: 'ProductRS',
				en: 'ProductEN',
			},
			sizeChartImageDescription: {
				ua: 'cетка ua ',
				ru: 'cетка ru',
				rs: 'cетка rs',
				en: 'cетка en',
			},
			sizes: ['S', 'M'],
			colourId: 5,
			price: 500,
			quantity: 100,
			imagesjpg: [imgProduct, imgProduct, imgProduct, imgProduct, imgProduct],
			allcoloursId: [1, 2, 3, 4, 5, 6],
			allsizes: ['S', 'M', ''],
			categories: [1, 2, 3],
			netData: 'dlldldlldldldldldlldldldldldldldldldlldld',
			arrObjMod: [
				{ fileNames: ['text1', 'twxt2'], colourId: 3, sizes: ['S', 'M'] },
			],
			images: [imgProduct, imgProduct, imgProduct, imgProduct],
			id: 1,
		},
	],
	editProductItemId: -1,
	displayActive: 1,
	editProducts: [
		{
			id: 1,
			title: {
				ua: 'Павло',
				ru: ' Паша',
				rs: 'хз',
				en: 'The best',
			},
			description: {
				ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
				ru: 'на русс опис doprepwfieifweifipowerf',
				rs: 'на rs опис лдощцаозщуцощауоазуцща',
				en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
			},
			price: 300,
			quantity: 100,
			// { fileNames: string[], colourId: number; sizes: string[]}
			images: [
				{
					fileNames: [photo, photo],
					colourId: 3,
					sizes: ['S', 'M', 'L'],
				},
				{
					fileNames: [photo, photo],
					colourId: 4,
					sizes: ['S', 'M', 'L'],
				},
			],
			sizeChartImage: 'kfkf',
			sizes: ['X', 'XS'],
			colours: [
				{
					hex: '#FFE4C4',
					id: 1,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#9F8E84',
					id: 2,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#000080',
					id: 3,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#A6BEE5',
					id: 4,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
			],
			categories: [
				{
					id: 1,
					ua: 'Категорія 1',
					en: 'Категория 1',
					rs: 'Категорія 1 rs',
					ru: 'Категорія 1 ru',
					type: 'category',
					createdAt: 'any',
					updatedAt: 'any',
				},
			],
		},
		{
			id: 2,
			title: {
				ua: 'Павло',
				ru: ' Паша',
				rs: 'хз',
				en: 'The best',
			},
			description: {
				ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
				ru: 'на русс опис doprepwfieifweifipowerf',
				rs: 'на rs опис лдощцаозщуцощауоазуцща',
				en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
			},
			price: 300,
			quantity: 100,
			// { fileNames: string[], colourId: number; sizes: string[]}
			images: [
				{
					fileNames: [photo, photo],
					colourId: 3,
					sizes: ['S', 'M', 'L'],
				},
				{
					fileNames: [photo, photo],
					colourId: 4,
					sizes: ['S', 'M', 'L'],
				},
			],
			sizeChartImage: 'kfkf',
			sizes: ['X', 'XS'],
			colours: [
				{
					hex: '#FFE4C4',
					id: 1,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#9F8E84',
					id: 2,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#000080',
					id: 3,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#A6BEE5',
					id: 4,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
			],
			categories: [
				{
					id: 1,
					ua: 'Категорія 1',
					en: 'Категория 1',
					rs: 'Категорія 1 rs',
					ru: 'Категорія 1 ru',
					type: 'category',
					createdAt: 'any',
					updatedAt: 'any',
				},
			],
		},
		{
			id: 3,
			title: {
				ua: 'Павло',
				ru: ' Паша',
				rs: 'хз',
				en: 'The best',
			},
			description: {
				ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
				ru: 'на русс опис doprepwfieifweifipowerf',
				rs: 'на rs опис лдощцаозщуцощауоазуцща',
				en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
			},
			price: 300,
			quantity: 100,
			// { fileNames: string[], colourId: number; sizes: string[]}
			images: [
				{
					fileNames: [photo, photo],
					colourId: 3,
					sizes: ['S', 'M', 'L'],
				},
				{
					fileNames: [photo, photo],
					colourId: 4,
					sizes: ['S', 'M', 'L'],
				},
			],
			sizeChartImage: 'kfkf',
			sizes: ['X', 'XS'],
			colours: [
				{
					hex: '#FFE4C4',
					id: 1,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#9F8E84',
					id: 2,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#000080',
					id: 3,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
				{
					hex: '#A6BEE5',
					id: 4,
					ru: 'ru',
					rs: 'rs',
					en: 'en',
					ua: 'ua',
					type: 'colour',
					createdAt: 'test',
					updatedAt: 'test',
				},
			],
			categories: [
				{
					id: 1,
					ua: 'Категорія 1',
					en: 'Категория 1',
					rs: 'Категорія 1 rs',
					ru: 'Категорія 1 ru',
					type: 'category',
					createdAt: 'any',
					updatedAt: 'any',
				},
			],
		},
	],
	//реализовую с помощью массива
	countPhotos: [],
	// id: number
	// title: {
	//     ua: string
	//     ru: string
	//     rs: string
	//     en: string
	// }
	// description: {
	//     ua: string
	//     ru: string
	//     rs: string
	//     en: string
	// }
	// price: number
	// quantity: number
	// images: { fileNames: string[], colourId: number; sizes: string[]}[]
	// sizeChartImage: string
	// sizes: string[]
	// colours: fetchedColour[]
	// categories: fetchedCategory[]
};

export const admin: Slice<initialStateType> = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setSizes: (state, action: PayloadAction<string>) => {
			//const found =  state.sizes.indexOf(action.payload.id)
			state.userEdit.sizes.push(action.payload);
		},
		removeSizes: (state, action: PayloadAction<string>) => {
			// console.log('вход')
			const found = state.userEdit.sizes.find((el) => el === action.payload);
			const index = state.userEdit.sizes.indexOf(found);
			state.userEdit.sizes.splice(index, 1);
		},

		setColors: (
			state,
			action: PayloadAction<{ label: string; hex: string; id: number }>
		) => {
			state.colors.push(action.payload);
		},
		setAddPhotoState: (state) => {
			state.addPhotoState.push({
				id: state.addPhotoState[state.addPhotoState.length - 1].id + 1,
			});
		},
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.usersRole = action.payload;
		},
		setEditProductItemId: (state, action: PayloadAction<number>) => {
			state.editProductItemId = action.payload;
		},
		setChangeCheckbox: (
			state,
			action: PayloadAction<{ id: number; branch: keyof User; bool: boolean }>
		) => {
			//@ts-ignore
			state.usersRole[action.payload.id - 1][action.payload.branch] =
				action.payload.bool;
		},
		//пушишь все обьекты , при добавлении товару пушишь number (для добавление еще одного айтома) , потом при добалении товара реплейсишь его под нужный индекс
		addCountPhotos: (state) => {
			state.userEdit.images.push(null);
		},
		setArrObjModalSwow: (state, action: PayloadAction<any>) => {
			state.arrObjModalSwow.push(action.payload);
		},
		setColorsStyle: (state, action: PayloadAction<any>) => {
			state.colorsStyle.push(action.payload);
		},
		setStartMain: (state, action: PayloadAction<boolean>) => {
			state.startMain = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			//пошук ролів
			.addCase(findUsersRole.fulfilled, (state, action) => {
				state.usersRole = action.payload;
				state.usersRoleStatus = 'success';
			})
			.addCase(findUsersRole.pending, (state) => {
				state.loading = true;
				state.usersRoleStatus = 'pending';
			})
			.addCase(findUsersRole.rejected, (state, action) => {
				state.usersRole = [];
				console.log('ошибка поиск юзеров');
				state.error = action.error.message;
				state.loading = false;
				state.usersRoleStatus =
					action.error.code === '403' || 403 ? 'error403' : 'error';
			})

			//полученя юзерів
			.addCase(getUsersRole.fulfilled, (state, action) => {
				state.usersRole = action.payload;
				state.usersRoleStatus = 'success';
			})
			.addCase(getUsersRole.pending, (state) => {
				state.loading = true;
				state.usersRoleStatus = 'pending';
			})
			.addCase(getUsersRole.rejected, (state, action) => {
				state.usersRole = [];
				console.log('ошибка получения юзеров');
				state.error = action.error.message;
				state.loading = false;
				state.usersRoleStatus =
					action.error.code === '403' || 403 ? 'error403' : 'error';
			})
			//получення адмінів
			.addCase(getUsersAdmin.fulfilled, (state, action) => {
				state.usersAdmin = action.payload;
				state.usersAdminStatus = 'success';
			})
			.addCase(getUsersAdmin.pending, (state) => {
				state.loading = true;
				state.usersAdminStatus = 'pending';
			})
			.addCase(getUsersAdmin.rejected, (state, action) => {
				state.usersAdmin = [];
				console.log('ошибка получения админов');
				state.error = action.error.message;
				state.loading = false;
				state.usersAdminStatus =
					action.error.code === '403' || 403 ? 'error403' : 'error';
			})
			// пошук адмінів через дебаунс
			.addCase(findUsersAdmin.fulfilled, (state, action) => {
				state.usersAdminStatus = 'success';
				state.usersAdmin = action.payload;
			})
			.addCase(findUsersAdmin.pending, (state) => {
				state.loading = true;
				state.usersAdminStatus = 'pending';
			})
			.addCase(findUsersAdmin.rejected, (state, action) => {
				state.usersAdmin = [];
				console.log('ошибка поиск админов');
				state.error = action.error.message;
				state.loading = false;
				state.usersAdminStatus =
					action.error.code === '403' || 403 ? 'error403' : 'error';
			});
	},
});

export const {
	setSizes,
	removeSizes,
	setColors,
	setAddPhotoState,
	setUsers,
	setEditProductItemId,
	setChangeCheckbox,
	addCountPhotos,
	setArrObjModalSwow,
	setColorsStyle,
	setStartMain,
} = admin.actions;

export default admin.reducer;
