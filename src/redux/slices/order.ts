import { FormLoadStatusType, LoadStatus } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormLoadStatusType = {
	stepOne: 'idle',
	stepTwo: 'idle',
	cardId: null,
};

const order = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		orderInit: (store) => {
			store.stepOne = 'idle';
			store.stepTwo = 'idle';
		},
		changeStatusStepOne: (
			state,
			{ payload }: PayloadAction<keyof typeof LoadStatus>
		) => {
			state.stepOne = payload;
		},
		changeStatusStepTwo: (
			state,
			{ payload }: PayloadAction<keyof typeof LoadStatus>
		) => {
			state.stepTwo = payload;
		},
		setCardId: (state, { payload }: PayloadAction<number | null>) => {
			state.cardId = payload;
		},
	},
});

export const {
	changeStatusStepTwo,
	changeStatusStepOne,
	orderInit,
	setCardId,
} = order.actions;
export default order.reducer;
