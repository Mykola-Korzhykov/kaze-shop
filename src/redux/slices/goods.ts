import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Api } from '@/services'

type GoodsSlice = {
	goods: [] | null
}

const fetchGoods = createAsyncThunk(
	'goods/fetchAllGoods',
	async (_, thunkAPI) => {
		const response = await Api().goods.getGoods()
		return response.data
	}
)

const initialState: GoodsSlice = {
	goods: [],
}

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action: PayloadAction<[]>) {
			state.goods = action.payload
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
