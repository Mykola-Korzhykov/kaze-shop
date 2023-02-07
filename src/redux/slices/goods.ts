import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
const goodsSlice = createSlice({
	name: 'test',
	initialState: {},
	reducers: {},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.goods,
			}
		},
	},
})

export default goodsSlice.reducer
