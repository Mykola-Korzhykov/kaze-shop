import { HomeProps } from '@/types/mainPageRequest';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: HomeProps = {
	about: null,
	faq: null,
	footer: null,
	logo: null,
	mainPage: null,
	reviews: null,
} as const;

type key = typeof initialState[keyof typeof initialState];
export const main = createSlice({
	name: 'main',
	initialState,
	reducers: {
		initial(state, { payload }: PayloadAction<HomeProps>) {
			state.about = payload.about;
			state.faq = payload.faq;
			state.footer = payload.footer;
			state.logo = payload.logo;
			state.mainPage = payload.mainPage;
			state.reviews = payload.reviews;
		},
	},
});

export const { initial } = main.actions;

export default main.reducer;
