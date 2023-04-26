import { SlicesInitType } from '@/types/mainPageRequest';
import { Reviews } from '@/types/product';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: SlicesInitType = {
	about: null,
	faq: null,
	mainPage: null,
	reviews: null,
} as const;

export const strapiValues = createSlice({
	name: 'StrapiValues',
	initialState,
	reducers: {
		initial(state, { payload }: PayloadAction<SlicesInitType>) {
			state.about = payload.about;
			state.faq = payload.faq;
			state.mainPage = payload.mainPage;
			state.reviews = payload.reviews;
		},
		changeClientReviews(state, { payload }: PayloadAction<Reviews[]>) {
			state.reviews.clientReviews = payload;
		},
	},
});

export const { initial, changeClientReviews } = strapiValues.actions;

export default strapiValues.reducer;
