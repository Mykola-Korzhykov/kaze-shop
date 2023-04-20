import { Goods } from '@/types/goods';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Api } from '@/services';
interface EditProductState {
	activeProduct: Goods | null;
	editProducts: Goods[];
	sizesFromServer: string[];
	imagesFromModal: {
		fileNames: string[];
		sizes: string[];
		colourId: number;
	}[];
}

const initialState: EditProductState = {
	editProducts: [],
	sizesFromServer: [],
	imagesFromModal: [],
	activeProduct: null,
};

export const fetchEditGoods = createAsyncThunk<
	{ products: Goods[]; totalProducts: number },
	null,
	{ rejectValue: string }
>('editProducts/fetchEditGoods', async (_, { getState, rejectWithValue }) => {
	const state = getState() as RootState;
	const goodsState = state.goods;
	const pageNumber = goodsState.page;
	try {
		const data = await Api().goods.getEditGoods(pageNumber);
		return data;
	} catch (e) {
		if ('rawErrors' in e.response.data) {
			return rejectWithValue(e?.response?.data?.rawErrors[0]?.ua);
		}
	}
});

const editProductSlice = createSlice({
	name: 'editProduct',
	initialState,
	reducers: {
		editImagesFromModal(
			state,
			action: PayloadAction<{
				fileNames: string[];
				sizes: string[];
				colourId: number;
			}>
		) {
			state.imagesFromModal.push(action.payload);
		},
		setSizesFromServer(state, action: PayloadAction<string | string[]>) {
			if (typeof action.payload === 'string') {
				state.sizesFromServer.push(action.payload);
			} else {
				state.sizesFromServer = action.payload;
			}
		},
		removeSizesFromServer: (state, action: PayloadAction<string>) => {
			const found = state.sizesFromServer.find((el) => el === action.payload);
			const index = state.sizesFromServer.indexOf(found);
			state.sizesFromServer.splice(index, 1);
		},
		setActiveProduct: (state, action: PayloadAction<Goods | null>) => {
			state.activeProduct = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEditGoods.fulfilled, (state, action) => {
			state.editProducts = action.payload.products
		});
	},
});

export const {
	editImagesFromModal,
	setSizesFromServer,
	setActiveProduct,
	removeSizesFromServer,
} = editProductSlice.actions;

export default editProductSlice.reducer;
