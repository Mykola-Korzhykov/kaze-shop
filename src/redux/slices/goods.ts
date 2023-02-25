import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Api } from '@/services'
import { RootState } from '../store'
import { Goods, fetchedCategory, fetchedColour } from '../../types/goods'
type GoodsSlice = {
	goods: Goods[] | null
	loadingStatus: 'loading' | 'error' | 'idle'
	page: number
	sortType: string
	filterCategories: number[]
	filterSizes: string[] | null
	filterColours: number[] | null
	fetchedColours: fetchedColour[] | null
	fetchedCategories: fetchedCategory[] | null
}

export const fetchGoods = createAsyncThunk(
	'goods/fetchAllGoods',
	async (_, { getState }) => {
		const state = getState() as RootState
		const goodsState = state.goods
		const pageNumber = goodsState.page
		const data = await Api().goods.getGoods(pageNumber)
		return data
	}
)

export const fetchCategories = createAsyncThunk(
	'goods/fetchCategories',
	async () => {
		const data = await Api().goods.getGategories()
		return data
	}
)

export const fetchColours = createAsyncThunk('goods/fetchColours', async () => {
	const data = await Api().goods.getColours()
	return data
})

export const filterGoods = createAsyncThunk(
	'goods/filterGoods',
	async (_, { getState }) => {
		const state = getState() as RootState

		const goodsState = state.goods
		const sortBy = goodsState.sortType
		const pageNumber = goodsState.page
		const categoriesStr = goodsState.filterCategories.join(',')
		const coloursStr = goodsState.filterColours.join(',')
		const sizesStr = goodsState.filterSizes.join(',')
		const data = await Api().goods.filterGoods(
			pageNumber,
			sizesStr,
			categoriesStr,
			coloursStr,
			sortBy
		)
		return data
	}
)

const initialState: GoodsSlice = {
	goods: null,
	page: 1,
	loadingStatus: 'idle',
	sortType: '',
	filterCategories: [],
	filterSizes: [],
	filterColours: [],
	fetchedColours: null,
	fetchedCategories: null,
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
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGoods.fulfilled, (state, action) => {
			state.goods = action.payload
		}),
			builder.addCase(fetchGoods.pending, state => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(fetchGoods.rejected, state => {
				state.loadingStatus = 'error'
			}),
			builder.addCase(filterGoods.fulfilled, (state, action) => {
				state.goods = action.payload
			}),
			builder.addCase(filterGoods.pending, (state, action) => {
				state.loadingStatus = 'loading'
			}),
			builder.addCase(filterGoods.rejected, (state, action) => {
				state.loadingStatus = 'error'
			}),
			builder.addCase(fetchCategories.fulfilled, (state, action) => {
				state.fetchedCategories = action.payload
			}),
			builder.addCase(fetchColours.fulfilled, (state, action) => {
				state.fetchedColours = action.payload
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
} = goodsSlice.actions

export default goodsSlice.reducer

// When use next-redux-wrapper
// [HYDRATE]: (state, action) => {
// 	return {
// 		...state,
// 		...action.payload.goods,
// 	}
// },
