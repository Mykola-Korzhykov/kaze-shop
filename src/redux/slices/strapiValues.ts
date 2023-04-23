import { strapiValuesTypes } from '@/types/mainPageRequest';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: strapiValuesTypes = {
	about: null,
	faq: null,
	mainPage: null,
	reviews: null,
} as const;

export const strapiValues = createSlice({
	name: 'StrapiValues',
	initialState,
	reducers: {
		initial(state, { payload }: PayloadAction<strapiValuesTypes>) {
			state.about = payload.about;
			state.faq = payload.faq;
			state.mainPage = payload.mainPage;
			state.reviews = payload.reviews;
		},
	},
});

export const { initial } = strapiValues.actions;

export default strapiValues.reducer;
