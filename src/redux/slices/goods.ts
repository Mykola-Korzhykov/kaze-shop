import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Api } from '@/services'
import { RootState } from '../store'
import {
	Goods,
	fetchedCategory,
	fetchedColour,
	CartProduct,
} from '../../types/goods'
import { AxiosError } from 'axios'

type GoodsSlice = {
	goods: Goods[] | null
	product?: Goods | null
	compareProduct: Goods | null
	compareOfferProducts: Goods[] | null
	compareOfferProductModal: Goods | null
	basketOfProducts: Goods[]
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
	{ products: Goods[]; totalProducts: number },
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
	{ products: Goods[]; totalProducts: number },
	number,
	{ rejectValue: string }
>(
	'goods/fetchGoodsByCategory',
	async (categoryId, { getState, rejectWithValue }) => {
		const state = getState() as RootState
		const goodsState = state.goods
		// const category = goodsState.headerCategory
		const pageNumber = goodsState.page
		try {
			const data = await Api().goods.getGoodsByCategory(pageNumber, categoryId)
			return data
		} catch (e) {
			return rejectWithValue(e.response.data.rawErrors[0].ua)
		}
	}
)
export const fetchCompareOfferProducts = createAsyncThunk<
	{ products: Goods[] },
	number,
	{ rejectValue: string }
>(
	'goods/fetchCompareOfferProducts',
	async (categoryId: number, { getState, rejectWithValue }) => {
		const state = getState() as RootState
		const goodsState = state.goods
		const pageNumber = goodsState.page
		try {
			const data = await Api().goods.getProductsWithAnotherCategory(
				pageNumber,
				categoryId
			)
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
	try {
		const data = await Api().goods.getGategories()
		return data.data
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].ua)
	}
})

export const addProductToCart = createAsyncThunk<
	fetchedCategory[],
	null,
	{ rejectValue: string }
>(
	'goods/addProductToCart',
	async (product: CartProduct, { rejectWithValue }) => {
		try {
			const data = await Api().goods.addToCart(product.id, product)
			return data.data
		} catch (e) {
			return rejectWithValue(e.response.data.rawErrors[0].ua)
		}
	}
)

export const fetchColours = createAsyncThunk<
	fetchedColour[],
	null,
	{ rejectValue: string }
>('goods/fetchColours', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().goods.getColours()
		return data.data
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].ua)
	}
})

export const filterGoods = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
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
	compareOfferProducts: null,
	compareOfferProductModal: null,
	basketOfProducts: [],
	loadingStatus: 'idle',
	sortType: '',
	totalProducts: 0,
	errors: '',
	headerCategory: 0,
	filterCategories: [],
	filterSizes: [],
	filterColours: [],
	fetchedColours: [
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
	fetchedCategories: [
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
		{
			id: 2,
			ua: 'Категорія 2',
			en: 'Категория 3',
			rs: 'Категорія 2 rs',
			ru: 'Категорія 2 ru',
			type: 'category',
			createdAt: 'any',
			updatedAt: 'any',
		},
		{
			id: 3,
			ua: 'Категорія 3',
			en: 'Категория 3',
			rs: 'Категорія 2 rs',
			ru: 'Категорія 3 ru',
			type: 'category',
			createdAt: 'any',
			updatedAt: 'any',
		},
		{
			id: 4,
			ua: 'Категорія 4',
			en: 'Категория 4',
			rs: 'Категорія 4 rs',
			ru: 'Категорія 4 ru',
			type: 'category',
			createdAt: 'any',
			updatedAt: 'any',
		},
		{
			id: 2,
			ua: 'Категорія 4',
			en: 'Категория 4',
			rs: 'Категорія 4 rs',
			ru: 'Категорія 4 ru',
			type: 'category',
			createdAt: 'any',
			updatedAt: 'any',
		},
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
		addProductToCompareAndBasket(state, action: PayloadAction<Goods>) {
			state.basketOfProducts.push(action.payload)
			state.compareProduct = action.payload
		},
		addCompareProductToModal(state, action: PayloadAction<Goods>) {
			state.compareOfferProductModal = action.payload
		},
		setSizeForProduct(state, action: PayloadAction<{ newSize: string }>) {
			// const id = action.payload.id
			// const newSize = action.payload.newSize
			// const product = state.compareOfferProducts.filter(el => el.id === id)[0]
			// const firstSize = product.sizes[0]
			// product.sizes = [newSize, ...product.sizes, firstSize]
			const newSize = action.payload.newSize
			const product = state.compareProduct
			const firstSize = product.sizes[0]
			product.sizes = [newSize, ...product.sizes, firstSize]
		},
		setColorForProduct(
			state,
			action: PayloadAction<{ id: number; newColor: string }>
		) {
			const id = action.payload.id
			const newColor = action.payload.newColor
			const product = state.compareOfferProducts.filter(el => el.id === id)[0]
			product.hexes = [newColor, ...product.hexes]
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGoods.fulfilled, (state, action) => {
			state.loadingStatus = 'idle'
			state.goods = action.payload.products
			state.totalProducts = action.payload.totalProducts
		}),
			builder.addCase(fetchGoods.pending, state => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchGoods.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(filterGoods.fulfilled, (state, action) => {
				state.loadingStatus = 'idle'
				state.goods = action.payload.products
				state.totalProducts = action.payload.totalProducts
			}),
			builder.addCase(filterGoods.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(filterGoods.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loadingStatus = 'idle'
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
				state.loadingStatus = 'idle'
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
				state.loadingStatus = 'idle'
				state.goods = action.payload.products
				state.totalProducts = action.payload.totalProducts
				// state.goods = action.payload
			}),
			builder.addCase(fetchGoodsByCategory.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchGoodsByCategory.rejected, (state, action) => {
				state.loadingStatus = 'error'
				state.errors = action.payload
			}),
			builder.addCase(fetchCompareOfferProducts.fulfilled, (state, action) => {
				state.loadingStatus = 'idle'
				state.compareOfferProducts = action.payload.products
			}),
			builder.addCase(fetchCompareOfferProducts.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchCompareOfferProducts.rejected, (state, action) => {
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
	addProductToCompareAndBasket,
	setHeaderCategory,
	addCompareProductToModal,
	setSizeForProduct,
	setColorForProduct,
} = goodsSlice.actions

export default goodsSlice.reducer

// When use next-redux-wrapper
// [HYDRATE]: (state, action) => {
// 	return {
// 		...state,
// 		...action.payload.goods,
// 	}
// },
