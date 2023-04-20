import { MainProps } from '@/types/mainPageRequest';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: MainProps = {
	lastAddedProduct: [],
	productSliderOne: [],
	productSliderTwo: [],
};

export const main = createSlice({
	name: 'main',
	initialState,
	reducers: {
		initialMain(state, { payload }: PayloadAction<MainProps>) {
			state.lastAddedProduct = payload.lastAddedProduct;
			state.productSliderOne = payload.productSliderOne;
			state.productSliderTwo = payload.productSliderTwo;
		},
	},
});

export const { initialMain } = main.actions;

export default main.reducer;
