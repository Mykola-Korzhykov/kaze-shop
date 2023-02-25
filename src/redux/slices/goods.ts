import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Api } from '@/services'
import { Goods } from '../../types/goods'
type GoodsSlice = {
	goods: Goods | null
	filterCategories: string[] | null
	filterSizes: string[] | null
	filterColors: string[] | null
}

const fetchGoods = createAsyncThunk(
	'goods/fetchAllGoods',
	async (_, { getState, dispatch, rejectWithValue }) => {
		const response = await Api().goods.getGoods()
		return response.data
	}
)

const initialState: GoodsSlice = {
	goods: null,
	filterCategories: null,
	filterSizes: null,
	filterColors: null,
}

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action: PayloadAction<Goods>) {
			state.goods = action.payload
		},
		addFilterCategory(state, action: PayloadAction<string>) {
			state.filterCategories.push(action.payload)
		},
		deleteFilterCategory(state, action: PayloadAction<string>) {
			state.filterCategories.filter(el => el !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGoods.fulfilled, (state, action) => {
			// Add user to the state array
		})
		// [HYDRATE]: (state, action) => {
		// 	return {
		// 		...state,
		// 		...action.payload.goods,
		// 	}
		// },
	},
})

export default goodsSlice.reducer
