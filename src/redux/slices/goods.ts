import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '@/services';
import { RootState } from '../store';
import {
	Goods,
	fetchedCategory,
	fetchedColour,
	sendProductToCart,
	CartProduct,
} from '../../types/goods';
import { AxiosError } from 'axios';

type GoodsSlice = {
	goods: Goods[] | null;
	product?: Goods | null;
	compareProduct: Goods | null;
	compareOfferProducts: Goods[] | null;
	compareOfferProductModal: Goods | null;
	cartProductId: number | null;
	updateCompareProduct: sendProductToCart;
	basketOfProducts: CartProduct;
	feedbackProduct: {
		imageUrl: string;
		productId: number;
		productName: { ua: string; ru: string; rs: string; en: string };
	} | null;
	loadingStatus: 'loading' | 'error' | 'idle';
	cartLoadingStatus: 'loading' | 'error' | 'idle';
	catalogLoadingStatus: 'loading' | 'error' | 'idle';
	page: number;
	totalProducts: number;
	errors: string | null;
	sortType: string;
	headerCategory: number;
	filterCategories: number[];
	filterSizes: string[] | null;
	filterColours: number[] | null;
	fetchedColours: fetchedColour[] | null;
	fetchedCategories: fetchedCategory[] | null;
	catalogSavedProducts: number[];
};

// interface FetchGoodsPayload {
// 	page: number;
// }

// export const fetchGoods = createAsyncThunk<
// 	{ products: Goods[]; totalProducts: number },
// 	number | undefined,
// 	{ rejectValue: string }
// >('goods/fetchAllGoods', async (page = 1, { getState, rejectWithValue }) => {
// 	const state = getState() as RootState;
// 	const goodsState = state.goods;
// 	try {
// 		const data = await Api().goods.getGoods(page);
// 		return data;
// 	} catch (e) {
// 		if ('rawErrors' in e.response.data) {
// 			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
// 		}
// 	}
// });

export const fetchGoods = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('goods/fetchAllGoods', async (_, { getState, rejectWithValue }) => {
	const state = getState() as RootState;
	const goodsState = state.goods;
	const pageNumber = goodsState.page;

	try {
		const data = await Api().goods.getGoods(pageNumber);
		return data;
	} catch (e) {
		if ('rawErrors' in e.response.data) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
});

interface GoodsData {
	colors: fetchedColour[];
	categories: fetchedCategory[];
	goods: { products: Goods[]; totalProducts: number };
}

export const fetchGoodsData = createAsyncThunk<
	GoodsData,
	null,
	{ rejectValue: string }
>('goods/fetchGoodsData', async (_, { rejectWithValue, getState }) => {
	const state = getState() as RootState;
	const goodsState = state.goods;
	const pageNumber = goodsState.page;
	const categoryId = goodsState.headerCategory;
	try {
		const [colors, categories, goods] = await Promise.all([
			Api().goods.getColours(),
			Api().goods.getGategories(),
			Api().goods.getGoods(pageNumber, categoryId),
		]);
		return { colors: colors?.data, categories: categories?.data, goods };
	} catch (error) {
		return rejectWithValue('error');
	}
});
export const fetchCategories = createAsyncThunk<
	fetchedCategory[],
	null,
	{ rejectValue: string }
>('goods/fetchCategories', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().goods.getGategories();
		console.log('Fetch categories data,', data);
		return data?.data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const fetchColours = createAsyncThunk<
	fetchedColour[],
	null,
	{ rejectValue: string }
>('goods/fetchColours', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().goods.getColours();
		console.log('Fetch colours data,', data);
		return data?.data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

export const fetchGoodsByCategory = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	number,
	{ rejectValue: string }
>(
	'goods/fetchGoodsByCategory',
	async (categoryId, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const goodsState = state.goods;
		// const category = goodsState.headerCategory
		const pageNumber = goodsState.page;
		try {
			const data = await Api().goods.getGoodsByCategory<{
				products: Goods[];
				totalProducts: number;
			}>(pageNumber, categoryId);
			return data;
		} catch (e) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
);

export const fetchCompareOfferProducts = createAsyncThunk<
	{ products: Goods[] },
	number,
	{ rejectValue: string }
>(
	'goods/fetchCompareOfferProducts',
	async (categoryId: number, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const goodsState = state.goods;
		const pageNumber = goodsState.page;
		try {
			const data = await Api().goods.getProductsWithAnotherCategory(
				pageNumber,
				categoryId
			);
			return data;
		} catch (e) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
);

export const filterGoods = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('goods/filterGoods', async (_, { getState, rejectWithValue }) => {
	const state = getState() as RootState;

	const goodsState = state.goods;
	const sortBy = goodsState.sortType;
	const pageNumber = goodsState.page;
	const categoriesStr = goodsState.filterCategories.join(',');
	const coloursStr = goodsState.filterColours.join(',');
	const sizesStr = goodsState.filterSizes.join(',');
	try {
		const data = await Api().goods.filterGoods(
			pageNumber,
			sizesStr,
			categoriesStr,
			coloursStr,
			sortBy
		);
		return data;
	} catch (e) {
		return rejectWithValue(e.response.data.rawErrors[0].error);
	}
});

// CART THUNKS

export const updateCartProduct = createAsyncThunk<
	{ cartProductId: number },
	null,
	{ rejectValue: string }
>('products/updateCartProduct', async (_, { getState, rejectWithValue }) => {
	try {
		const state = getState() as RootState;
		const goodsState = state.goods;
		const updateProduct = goodsState.updateCompareProduct;
		const cartProductId = goodsState.cartProductId;
		const updateProductObj = Object.assign({}, updateProduct);
		delete updateProductObj?.id;
		const data = await Api().goods.updateProduct(
			cartProductId,
			updateProductObj
		);
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ru);
	}
});

export const addProductToCart = createAsyncThunk<
	{ cartProductId: number },
	sendProductToCart,
	{ rejectValue: string }
>(
	'goods/addProductToCart',
	async (product: sendProductToCart, { rejectWithValue, dispatch }) => {
		try {
			const productObj = Object.assign({}, product);
			delete productObj.id;
			if (product?.fromCatalog) {
				dispatch(setCartProductId(null));
			}
			delete productObj.fromCatalog;
			const data = await Api().goods.addToCart(product.id, productObj);
			return data;
		} catch (e) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
);

export const deleteCartProduct = createAsyncThunk<
	{ cartProductId: number },
	number,
	{ rejectValue: string }
>(
	'goods/deleteCartProduct',
	async (cartProductId: number, { rejectWithValue }) => {
		try {
			const data = await Api().goods.deleteProduct(cartProductId);
			return data;
		} catch (e) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
);

export const getCartProducts = createAsyncThunk<
	{ cart: CartProduct },
	null,
	{ rejectValue: string }
>('goods/getCartProducts', async (_, { rejectWithValue }) => {
	try {
		const data = await Api().goods.getCartProducts();
		return data;
	} catch (e) {
		return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
	}
});

const initialState: GoodsSlice = {
	goods: null,
	page: 1,
	compareProduct: null,
	compareOfferProducts: null,
	compareOfferProductModal: null,
	cartProductId: null,
	feedbackProduct: null,
	updateCompareProduct: { id: null, imageUrl: '', colourId: 0, size: '' },
	basketOfProducts: null,
	loadingStatus: 'idle',
	cartLoadingStatus: 'idle',
	catalogLoadingStatus: 'idle',
	sortType: '',
	totalProducts: 0,
	errors: '',
	headerCategory: 0,
	filterCategories: [],
	filterSizes: [],
	catalogSavedProducts: [],
	filterColours: [],
	fetchedColours: [],
	fetchedCategories: [],
};

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action: PayloadAction<Goods[]>) {
			state.goods = action.payload;
		},
		setFilterCategory(state, action: PayloadAction<number>) {
			if (state.filterCategories.includes(action.payload)) {
				state.filterCategories = state.filterCategories.filter(
					(el) => el !== action.payload
				);
			} else {
				state?.filterCategories?.push(action.payload);
			}
		},
		setFilterSize(state, action: PayloadAction<string>) {
			if (state.filterSizes.includes(action.payload)) {
				state.filterSizes = state.filterSizes.filter(
					(el) => el !== action.payload
				);
			} else {
				state?.filterSizes?.push(action.payload);
			}
		},
		setFilterColour(state, action: PayloadAction<number>) {
			if (state.filterColours.includes(action.payload)) {
				state.filterColours = state.filterColours.filter(
					(el) => el !== action.payload
				);
			} else {
				state?.filterColours?.push(action.payload);
			}
		},
		setFeedbackProduct(
			state,
			action: PayloadAction<{
				imageUrl: string;
				productId: number;
				productName: { ua: string; ru: string; rs: string; en: string };
			}>
		) {
			state.feedbackProduct = action.payload;
		},
		setSortType(state, action: PayloadAction<string>) {
			state.sortType = action.payload;
		},
		setHeaderCategory(state, action: PayloadAction<number>) {
			state.headerCategory = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			if (action.payload >= 1) {
				state.page = action.payload;
			} else {
				state.page = 1;
			}
		},
		addProductToCompare(state, action: PayloadAction<Goods>) {
			// state.basketOfProducts.push(action.payload)
			state.compareProduct = action.payload;
		},
		addCompareProductToModal(state, action: PayloadAction<Goods>) {
			state.compareOfferProductModal = action.payload;
		},
		deleteCompareOfferProduct(state, action: PayloadAction<number>) {
			state.compareOfferProducts = state.compareOfferProducts.filter(
				(el) => el.id !== action.payload
			);
		},
		setUpdateCompareProduct(state, action: PayloadAction<sendProductToCart>) {
			state.updateCompareProduct = action.payload;
		},
		setLoadingStatus(
			state,
			action: PayloadAction<'loading' | 'error' | 'idle'>
		) {
			state.loadingStatus = action.payload;
		},
		addToSavedProducts(state, action: PayloadAction<number>) {
			state.catalogSavedProducts.push(action.payload);
		},
		deleteCatalogSavedProduct(state, action: PayloadAction<number>) {
			state.catalogSavedProducts = state.catalogSavedProducts.filter(
				(el) => el !== action.payload
			);
		},
		setCartProductId(state, action: PayloadAction<number | null>) {
			state.cartProductId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGoodsData.fulfilled, (state, action) => {
			state.loadingStatus = 'idle';
			state.catalogLoadingStatus = 'idle';
			state.goods = action.payload.goods.products;
			state.totalProducts = action.payload.goods.totalProducts;
			state.fetchedCategories = action.payload.categories;
			state.fetchedColours = action.payload.colors;
			state.catalogSavedProducts = action.payload.goods.products
				.filter((el) => el.isSaved === true)
				.map((el) => el.id);
		}),
			builder.addCase(fetchGoodsData.pending, (state) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(fetchGoodsData.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(fetchGoods.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.catalogLoadingStatus = 'idle';
				state.goods = action.payload.products;
				state.totalProducts = action.payload.totalProducts;
				state.catalogSavedProducts = action.payload.products
				.filter((el) => el.isSaved === true)
				.map((el) => el.id);
			}),
			builder.addCase(fetchGoods.pending, (state) => {
				state.loadingStatus = 'loading';
				state.catalogLoadingStatus = 'loading';
			}),
			builder.addCase(fetchGoods.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.catalogLoadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(filterGoods.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';

				state.goods = action.payload.products;
				state.totalProducts = action.payload.totalProducts;
				state.catalogSavedProducts = action.payload.products
				.filter((el) => el.isSaved === true)
				.map((el) => el.id);
			}),
			builder.addCase(filterGoods.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(filterGoods.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.fetchedCategories = action.payload;
			}),
			builder.addCase(fetchCategories.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(fetchCategories.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(fetchColours.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.fetchedColours = action.payload;
			}),
			builder.addCase(fetchColours.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(fetchColours.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(fetchGoodsByCategory.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.goods = action.payload.products;
				state.totalProducts = action.payload.totalProducts;
				state.catalogSavedProducts = action.payload.products
				.filter((el) => el.isSaved === true)
				.map((el) => el.id);
				// state.goods = action.payload
			}),
			builder.addCase(fetchGoodsByCategory.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(fetchGoodsByCategory.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(fetchCompareOfferProducts.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.compareOfferProducts = action.payload.products;
			}),
			builder.addCase(fetchCompareOfferProducts.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(fetchCompareOfferProducts.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(addProductToCart.fulfilled, (state, action) => {
				state.cartLoadingStatus = 'idle';
				if (!state.cartProductId) {
					state.cartProductId = action.payload.cartProductId;
				}
			}),
			builder.addCase(addProductToCart.pending, (state, action) => {
				state.cartLoadingStatus = 'loading';
			}),
			builder.addCase(addProductToCart.rejected, (state, action) => {
				state.cartLoadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(getCartProducts.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.basketOfProducts = action.payload.cart;
			}),
			builder.addCase(getCartProducts.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(getCartProducts.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addCase(updateCartProduct.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
			}),
			builder.addCase(updateCartProduct.pending, (state, action) => {
				state.loadingStatus = 'loading';
			}),
			builder.addCase(updateCartProduct.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.errors = action.payload;
			}),
			builder.addDefaultCase((state, action) => {
				const [type] = action.type.split('/').splice(-1);
				if (type === 'rejected') {
					state.errors = action.payload;
				} else {
					state.errors = '';
				}
			});
	},
});

export const selectGoods = (state: RootState) => state.goods.goods;
export const selectFetchedColours = (state: RootState) =>
	state.goods.fetchedColours;
export const selectFetchedCategories = (state: RootState) =>
	state.goods.fetchedCategories;

export const {
	setFilterCategory,
	setFilterColour,
	setLoadingStatus,
	setFilterSize,
	setSortType,
	setUpdateCompareProduct,
	setPage,
	addProductToCompare,
	setHeaderCategory,
	addCompareProductToModal,
	deleteCompareOfferProduct,
	setFeedbackProduct,
	deleteCatalogSavedProduct,
	setCartProductId,
	addToSavedProducts,
} = goodsSlice.actions;

export default goodsSlice.reducer;

// When use next-redux-wrapper
// [HYDRATE]: (state, action) => {
// 	return {
// 		...state,
// 		...action.payload.goods,
// 	}
// },
