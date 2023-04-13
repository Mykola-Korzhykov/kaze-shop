import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateType {
	title: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	description: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	sizeChartImageDescription: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	sizes: string[];
	colourId: number | null;
	price: number | null;
	quantity: number | null;
	imagesjpg: null | any;
	allcoloursId: number[] | null;
	allsizes: string[] | null;
	categories: number[] | null;
	netData: string | null;
	arrObjMod: {
		fileNames: string[];
		sizes: string[];
		colourId: number;
	}[];
	images: File[];
}

const initialState: initialStateType = {
	title: {
		ua: null,
		ru: null,
		rs: null,
		en: null,
	},
	description: {
		ua: null,
		ru: null,
		rs: null,
		en: null,
	},
	sizeChartImageDescription: {
		ua: '',
		ru: '',
		rs: '',
		en: '',
	},
	sizes: [],
	colourId: null,
	price: null,
	quantity: null,
	imagesjpg: [],
	allcoloursId: [],
	allsizes: [],
	categories: [],
	netData: null,
	arrObjMod: [],
	images: [],
};

export const formData = createSlice({
	name: 'formData',
	initialState,
	reducers: {
		setTitle: (
			state,
			action: PayloadAction<{
				branch: keyof initialStateType['title'];
				title: string;
			}>
		) => {
			const { branch, title } = action.payload;
			if (branch in state.title) {
				state.title[branch] = title;
			}
		},
		setSizeChartImageDescription: (
			state,
			action: PayloadAction<{
				branch: keyof initialStateType['sizeChartImageDescription'];
				sizeChartImageDescription: string;
			}>
		) => {
			// console.log('key', action.payload.branch)
			// console.log('title', action.payload.sizeChartImageDescription)
			const { branch, sizeChartImageDescription } = action.payload;
			if (branch in state.sizeChartImageDescription) {
				state.sizeChartImageDescription[branch] = sizeChartImageDescription;
			}
		},
		setDescription: (
			state,
			action: PayloadAction<{
				branch: keyof initialStateType['description'];
				description: string;
			}>
		) => {
			const { branch, description } = action.payload;
			if (branch in state.description) {
				state.description[branch] = description;
			}
		},
		setSizes: (state, action: PayloadAction<string | string[]>) => {
			if (typeof action.payload === 'string') {
				state.sizes.push(action.payload);
			} else {
				state.sizes = action.payload;
			}
		},
		removeSizes: (state, action: PayloadAction<string>) => {
			const found = state.sizes.find((el) => el === action.payload);
			const index = state.sizes.indexOf(found);
			state.sizes.splice(index, 1);
		},
		//colors
		setColors: (state, action: PayloadAction<number>) => {
			state.colourId = action.payload;
		},
		//price
		setPrice: (state, action: PayloadAction<number>) => {
			state.price = Number(action.payload);
		},
		//quantity
		setQuantity: (state, action: PayloadAction<number>) => {
			state.quantity = action.payload;
		},
		setImagesPng: (state, action: PayloadAction<any>) => {
			state.imagesjpg.push(action.payload);
		},
		removeAll: (state) => {
			state.sizes = [];
			state.colourId = null;
			state.imagesjpg = [];
		},
		//allcoloursId
		setAllcoloursId: (state, action: PayloadAction<any>) => {
			state.allcoloursId.push(action.payload);
		},
		//allSizes
		setAllsizes: (state, action: PayloadAction<string[]>) => {
			state.allsizes = [...state.allsizes, ...action.payload];
		},
		//AllCategories
		setCategories: (state, action: PayloadAction<number>) => {
			//по прозьбе бекендера оставил тип данных - массив.
			//учитывая то, что категория должна быть только одна я при наявности ее под первым индексом ее удаляю
			if (state.categories[0]) {
				state.categories.splice(0, 1);
				state.categories.push(action.payload);
			} else {
				state.categories.push(action.payload);
			}
		},
		setNetData: (state, action: PayloadAction<string>) => {
			console.log('вход к описания сетки');
			state.netData = action.payload;
		},
		//

		setArrObjMod: (
			state,
			action: PayloadAction<{
				fileNames: string[];
				colourId: number;
				sizes: string[];
			}>
		) => {
			state.arrObjMod.push(action.payload);
		},
		removearrObjMod: (
			state,
			action: PayloadAction<{ from: number; size: number }>
		) => {
			state.arrObjMod.splice(action.payload.from, action.payload.size);
		},
		setImages: (state, action: PayloadAction<File>) => {
			state.images.push(action.payload);
		},
		clearForm: (state) => {
			state.title.ua = '';
			state.title.ru = '';
			state.title.rs = '';
			state.title.en = '';

			state.description.ua = '';
			state.description.ru = '';
			state.description.rs = '';
			state.description.en = '';

			state.sizeChartImageDescription.ua = '';
			state.sizeChartImageDescription.ru = '';
			state.sizeChartImageDescription.rs = '';
			state.sizeChartImageDescription.en = '';

			state.sizes = [];
			state.colourId = null;
			state.price = null;
			state.quantity = null;
			state.imagesjpg = [];
			(state.allcoloursId = []), (state.allsizes = []);
			state.categories = [];
			state.netData = null;
			state.arrObjMod = [];
			state.images = [];
		},
	},
});

export const {
	setTitle,
	setDescription,
	setSizes,
	removeSizes,
	setColors,
	setPrice,
	setQuantity,
	setImagesPng,
	removeAll,
	setAllcoloursId,
	setAllsizes,
	setCategories,
	setNetData,
	setSizeChartImageDescription,
	setArrObjMod,
	removearrObjMod,
	clearForm,
} = formData.actions;

export default formData.reducer;
