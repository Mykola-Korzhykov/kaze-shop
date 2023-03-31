import { Goods } from '@/types/goods';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../types/singleProduct';

const initialState: initialState = {
	id: null,
	title: null,
	description: null,
	sizeChartImageDescription: null,
	price: null,
	quantity: null,
	images: null,
	sizeChartImage: null,
	sizes: null,
	hexes: null,
	colours: null,
	categories: null,
	reviews: null,
};
const singleProductSlice = createSlice({
	name: 'singleProduct',
	initialState: initialState,
	reducers: {},
});

// export const selectUserInfo = (state: RootState) => state;
// export const selectAuthState = (state: RootState) => state.user.isAuth;
