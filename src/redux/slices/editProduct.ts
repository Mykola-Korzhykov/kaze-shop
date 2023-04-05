import { Goods } from '@/types/goods';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface EditProductState {
	activeProduct: Goods | null;
	sizesFromServer: string[];
	imagesFromModal: {
		fileNames: string[];
		sizes: string[];
		colourId: number;
	}[];
}

const initialState: EditProductState = {
	sizesFromServer: [],
	imagesFromModal: [],
	activeProduct: null,
};

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
});

export const {
	editImagesFromModal,
	setSizesFromServer,
	setActiveProduct,
	removeSizesFromServer,
} = editProductSlice.actions;

export default editProductSlice.reducer;
