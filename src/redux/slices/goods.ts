import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Api } from '@/services'
import { RootState } from '../store'
import { Goods, fetchedCategory, fetchedColour } from '../../types/goods'
import { AxiosError } from 'axios'
type GoodsSlice = {
	goods: Goods[] | null
	compareProduct: Goods | null
	basketOfProducts: Goods[] | null
	loadingStatus: 'loading' | 'error' | 'idle'
	page: number
	totalProducts: number
	language: 'ua' | 'rs' | 'en' | 'ru'
	errors: string | null
	sortType: string
	headerCategory: number
	filterCategories: number[]
	filterSizes: string[] | null
	filterColours: number[] | null
	fetchedColours: fetchedColour[] | null
	fetchedCategories: fetchedCategory[] | null
}

export const fetchGoods = createAsyncThunk<
	Goods[],
	null,
	{ rejectValue: string }
>('goods/fetchAllGoods', async (_, { getState, rejectWithValue }) => {
	const state = getState() as RootState
	const goodsState = state.goods
	const pageNumber = goodsState.page
	try {
		const data = await Api().goods.getGoods(pageNumber)
		return data
	} catch (e) {
		if ('rawErrors' in e.response.data) {
			return rejectWithValue(e.response.data.rawErrors[0].ua)
		}
	}
})

export const fetchGoodsByCategory = createAsyncThunk<
	Goods[],
	number,
	{ rejectValue: string }
>(
	'goods/fetchGoodsByCategory',
	async (categoryId: number, { getState, rejectWithValue }) => {
		const state = getState() as RootState
		const goodsState = state.goods
		const pageNumber = goodsState.page
		try {
			const data = await Api().goods.getGoodsByCategory(pageNumber, categoryId)
			return data
		} catch (e) {
			return rejectWithValue(e.response.data.rawErrors[0].ua)
		}
	}
)

export const fetchCategories = createAsyncThunk<
	fetchedCategory[],
	null,
	{ rejectValue: string }
>('goods/fetchCategories', async (_, { rejectWithValue }) => {
	// console.log('fetchCategories запит пошел')
	try {
		const data = await Api().goods.getGategories()
		return data
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].ua)
	}
})

export const fetchColours = createAsyncThunk<
	fetchedColour[],
	null,
	{ rejectValue: string }
>('goods/fetchColours', async (_, { rejectWithValue }) => {
	// console.log('fetchColours запит пошел')
	try {
		const data = await Api().goods.getColours()
		return data
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].ua)
	}
})

export const filterGoods = createAsyncThunk<
	Goods[],
	null,
	{ rejectValue: string }
>('goods/filterGoods', async (_, { getState, rejectWithValue }) => {
	const state = getState() as RootState

	const goodsState = state.goods
	const sortBy = goodsState.sortType
	const pageNumber = goodsState.page
	const categoriesStr = goodsState.filterCategories.join(',')
	const coloursStr = goodsState.filterColours.join(',')
	const sizesStr = goodsState.filterSizes.join(',')
	try {
		const data = await Api().goods.filterGoods(
			pageNumber,
			sizesStr,
			categoriesStr,
			coloursStr,
			sortBy
		)
		return data
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].error)
	}
})

// id: number
// 	ua: string
// 	en: string
// 	rs: string
// 	ru: string
// 	type: 'category'
// 	createdAt: any
// 	updatedAt: any

const initialState: GoodsSlice = {
	goods: null,
	page: 1,
	compareProduct: null,
	basketOfProducts: null,
	loadingStatus: 'idle',
	sortType: '',
	totalProducts: 0,
	errors: '',
	headerCategory: 0,
	filterCategories: [],
	filterSizes: [],
	filterColours: [],

	fetchedColours: [
	// 	{
	// 		label: 'Бежевый',
	// 		hex: '#FFE4C4',
	// 		id: 1,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Капучинный',
	// 		hex: '#9F8E84',
	// 		id: 2,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Синий',
	// 		hex: '#000080',
	// 		id: 3,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Голубой',
	// 		hex: '#A6BEE5',
	// 		id: 4,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Коричневый',
	// 		hex: '#0B0B0B',
	// 		id: 5,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Изумрудный',
	// 		hex: '#24514C',
	// 		id: 6,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Розовый',
	// 		hex: '#FFC0CB',
	// 		id: 7,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Фиолетовый',
	// 		hex: '#800080',
	// 		id: 8,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Черный',
	// 		hex: '#0B0B0B',
	// 		id: 52,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Оливковый',
	// 		hex: '#829E86',
	// 		id: 432,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Белый',
	// 		hex: '#fff',
	// 		id: 34314,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Серый',
	// 		hex: '#808080',
	// 		id: 13413413413,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// 	{
	// 		label: 'Графитовый',
	// 		hex: '#525A5B',
	// 		id: 57567,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	// {
	// 		label: 'Пудровый',
	// 		hex: '#F2E2D8',
	// 		id: 75756756,
	// 		type: 'colour',
	// 		ru: 'ru',
	// 		rs: 'rs',
	// 		en: 'en',
	// 		ua: 'ua',
	// 		createdAt: 'stringstringTest',
	// 		updatedAt: 'stringTest',
	// 	},
	],
	fetchedCategories: [
	// {
	// 	id: 1,
	// 	ua: 'UAstring',
	// 	en: 'ENstring',
	// 	rs: 'RSstring',
	// 	ru: 'RUtring',
	// 	type: 'category',
	// 	createdAt: 'string',
	// 	updatedAt: 'string'
	// },
	// {
	// 	id: 2,
	// 	ua: 'UAstring',
	// 	en: 'ENstring',
	// 	rs: 'RSstring',
	// 	ru: 'RUtring',
	// 	type: 'category',
	// 	createdAt: 'string',
	// 	updatedAt: 'string'
	// },
	// {
	// 	id: 3,
	// 	ua: 'UAstring',
	// 	en: 'ENstring',
	// 	rs: 'RSstring',
	// 	ru: 'RUtring',
	// 	type: 'category',
	// 	createdAt: 'string',
	// 	updatedAt: 'string'
	// },
	// {
	// 	id: 4,
	// 	ua: 'UAstring',
	// 	en: 'ENstring',
	// 	rs: 'RSstring',
	// 	ru: 'RUtring',
	// 	type: 'category',
	// 	createdAt: 'string',
	// 	updatedAt: 'string'
	// }

	],
	language: 'ua',
}

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action: PayloadAction<Goods[]>) {
			state.goods = action.payload
		},
		setFilterCategory(state, action: PayloadAction<number>) {
			if (state.filterCategories.includes(action.payload)) {
				state.filterCategories = state.filterCategories.filter(
					el => el !== action.payload
				)
			} else {
				state?.filterCategories?.push(action.payload)
			}
		},
		setFilterSize(state, action: PayloadAction<string>) {
			if (state.filterSizes.includes(action.payload)) {
				state.filterSizes = state.filterSizes.filter(
					el => el !== action.payload
				)
			} else {
				state?.filterSizes?.push(action.payload)
			}
		},
		setFilterColour(state, action: PayloadAction<number>) {
			if (state.filterColours.includes(action.payload)) {
				state.filterColours = state.filterColours.filter(
					el => el !== action.payload
				)
			} else {
				state?.filterColours?.push(action.payload)
			}
		},
		setSortType(state, action: PayloadAction<string>) {
			state.sortType = action.payload
		},
		setHeaderCategory(state, action: PayloadAction<number>) {
			state.headerCategory = action.payload
		},
		setPage(state, action: PayloadAction<number>) {
			if (action.payload >= 1) {
				state.page = action.payload
			} else {
				state.page = 1
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGoods.fulfilled, (state, action) => {
			state.goods = action.payload
		}),
			builder.addCase(fetchGoods.pending, state => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchGoods.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(filterGoods.fulfilled, (state, action) => {
				state.goods = action.payload
			}),
			builder.addCase(filterGoods.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(filterGoods.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(fetchCategories.fulfilled, (state, action) => {
				state.fetchedCategories = action.payload
			}),
			builder.addCase(fetchCategories.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchCategories.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(fetchColours.fulfilled, (state, action) => {
				state.fetchedColours = action.payload
			}),
			builder.addCase(fetchColours.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchColours.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(fetchGoodsByCategory.fulfilled, (state, action) => {
				state.goods = action.payload
			}),
			builder.addCase(fetchGoodsByCategory.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchGoodsByCategory.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addDefaultCase((state, action) => {
				const [type] = action.type.split('/').splice(-1)
				if (type === 'rejected') {
					state.errors = action.payload
				} else {
					state.errors = ''
				}
			})
	},
})

export const selectGoods = (state: RootState) => state.goods.goods
export const selectFetchedColours = (state: RootState) =>
	state.goods.fetchedColours
export const selectFetchedCategories = (state: RootState) =>
	state.goods.fetchedCategories

export const {
	setFilterCategory,
	setFilterColour,
	setFilterSize,
	setSortType,
	setPage,
	setHeaderCategory,
} = goodsSlice.actions

export default goodsSlice.reducer

// When use next-redux-wrapper
// [HYDRATE]: (state, action) => {
// 	return {
// 		...state,
// 		...action.payload.goods,
// 	}
// },
