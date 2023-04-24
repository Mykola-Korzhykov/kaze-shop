import { User } from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '@/services';
import {
	Goods,
	CartProduct,
	UserOrders,
	CartProductItem,
	UserOrderItems,
} from '@/types/goods';
import { RootState } from '../store';

type UserSLice = {
	user: User | null;
	isAuth: boolean;
	loadingStatus: 'loading' | 'error' | 'idle';
	page: number;
	totalProducts: number;
	savedProducts: Goods[];
	watchedProducts: Goods[];
	orders: UserOrders | null;
	leftCarts: CartProduct[];
	isSavedProductsTab: boolean;
	language: 'ua' | 'rs' | 'en' | 'ru';
	cartItemsModal: {
		cartProducts: CartProductItem[];
		totalPrice: string;
		id: number;
		createdAt?: string;
		cartStatus?: 'Canceled' | 'Submitted' | 'Completed' | 'Processing' | 'Paid';
	} | null;
};

const initialState: UserSLice = {
	user: null,
	language: 'ua',
	page: 1,
	totalProducts: 0,
	isAuth: false,
	loadingStatus: 'idle',
	savedProducts: [],
	watchedProducts: [],
	orders: null,
	leftCarts: [],
	isSavedProductsTab: false,
	cartItemsModal: null,
};

const getSavedProducts = (state: RootState) => state.user.savedProducts;

export const getUserSavedProducts = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('user/getUserSavedProducts', async (_, { rejectWithValue, getState }) => {
	try {
		const state = getState() as RootState;
		const userState = state.user;
		const pageNumber = userState.page;

		// const products = getSavedProducts(state);
		// let data;
		// if (!products.length) {
		// i want wont do request if i have smth in redux
		// }

		const data = await Api().user.getSavedProducts(pageNumber);

		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const getUserWatchedProducts = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('user/getUserWatchedProducts', async (_, { rejectWithValue, getState }) => {
	const state = getState() as RootState;
	const userState = state.user;
	const pageNumber = userState.page;
	try {
		const data = await Api().user.getWatchedProducts(pageNumber);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const getUserOrders = createAsyncThunk<
	UserOrders,
	null,
	{ rejectValue: string }
>('user/getUserOrders', async (_, { rejectWithValue, getState }) => {
	const state = getState() as RootState;
	const userState = state.user;
	const pageNumber = userState.page;
	try {
		const data = await Api().user.getOrders(pageNumber);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const getUserOrderBasket = createAsyncThunk<
	UserOrderItems,
	number,
	{ rejectValue: string }
>('user/getUserOrderBasket', async (orderId: number, { rejectWithValue }) => {
	try {
		const data = await Api().user.getOrderBasket(orderId);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const getUserLeftCarts = createAsyncThunk<
	{ leftCarts: CartProduct[], totalCarts: number},
	null,
	{ rejectValue: string }
>('user/getUserLeftCarts', async (_, { rejectWithValue, getState }) => {
	const state = getState() as RootState;
	const userState = state.user;
	const pageNumber = userState.page;

	try {
		const data = await Api().user.getLeftCarts(pageNumber);
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
		setLanguage(state, action: PayloadAction<'ua' | 'rs' | 'en' | 'ru'>) {
			state.language = action.payload;
		},
		setAuthState(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
		setIsSavedProductsTab(state, action: PayloadAction<boolean>) {
			state.isSavedProductsTab = action.payload;
		},
		deleteSavedProduct(state, action: PayloadAction<number>) {
			state.savedProducts = state.savedProducts.filter(
				(el) => el.id !== action.payload
			);
		},
		setCartItemsModal(
			state,
			action: PayloadAction<{
				cartProducts: CartProductItem[];
				totalPrice: string;
				id: number;
				createdAt: string;
			}>
		) {
			state.cartItemsModal = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			if (action.payload >= 1) {
				state.page = action.payload;
			} else {
				state.page = 1;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserSavedProducts.fulfilled, (state, action) => {
			state.loadingStatus = 'idle';
			state.savedProducts = action.payload?.products;
			state.totalProducts = action.payload.totalProducts;
		});
		builder.addCase(getUserSavedProducts.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUserSavedProducts.rejected, (state, action) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(getUserWatchedProducts.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUserWatchedProducts.fulfilled, (state, action) => {
			state.watchedProducts = action.payload.products;
			state.loadingStatus = 'idle';
			state.totalProducts = action.payload.totalProducts;
		});
		builder.addCase(getUserWatchedProducts.rejected, (state, action) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(getUserOrders.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUserOrders.fulfilled, (state, action) => {
			state.orders = action.payload;
			state.totalProducts = action.payload.totalOrders;
			state.loadingStatus = 'idle';
		});
		builder.addCase(getUserOrders.rejected, (state, action) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(getUserOrderBasket.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUserOrderBasket.fulfilled, (state, action) => {
			const productBasket = action.payload;
			state.cartItemsModal = {
				cartProducts: productBasket?.orderProducts,
				cartStatus: productBasket?.orderStatus,
				id: productBasket?.id,
				totalPrice: productBasket?.totalPrice,
			};
			state.loadingStatus = 'idle';
		});
		builder.addCase(getUserOrderBasket.rejected, (state, action) => {
			state.loadingStatus = 'error';
		});
		builder.addCase(getUserLeftCarts.pending, (state, action) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUserLeftCarts.fulfilled, (state, action) => {
			state.leftCarts = action.payload.leftCarts;
			state.totalProducts = action.payload.totalCarts
			state.loadingStatus = 'idle';
		});
		builder.addCase(getUserLeftCarts.rejected, (state, action) => {
			state.loadingStatus = 'error';
		});
	},
});

export const selectUserInfo = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuth;

export const {
	addUserInfo,
	setLanguage,
	setAuthState,
	setIsSavedProductsTab,
	deleteSavedProduct,
	setCartItemsModal,
	setPage,
} = userSLice.actions;

export default userSLice.reducer;
