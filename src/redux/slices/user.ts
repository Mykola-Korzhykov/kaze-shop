import { User } from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '@/services';
import { Goods } from '@/types/goods';
import { RootState } from '../store';

type UserSLice = {
	user: User | null;
	isAuth: boolean;
	loadingStatus: 'loading' | 'error' | 'idle';
	savedProducts: Goods[];
	watchedProducts: Goods[];
};

const initialState: UserSLice = {
	user: null,
	isAuth: false,
	loadingStatus: 'idle',
	savedProducts: [],
	watchedProducts: [],
};

export const getUserSavedProducts = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('user/getUserSavedProducts', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().user.getSavedProducts(1);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const getUserWatchedProducts = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('user/getUserWatchedProducts', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().user.getWatchedProducts(1);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

const userSLice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		addUserInfo(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		setAuthState(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserSavedProducts.fulfilled, (state, action) => {
			state.loadingStatus = 'idle';
			state.savedProducts = action.payload.products;
		});
		builder.addCase(getUserSavedProducts.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
	},
});

export const selectUserInfo = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuth;

export const { addUserInfo, setAuthState } = userSLice.actions;

export default userSLice.reducer;
