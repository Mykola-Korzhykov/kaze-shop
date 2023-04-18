import { FormLoadStatusType, LoadStatus } from '@/types/singleProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormLoadStatusType = {
	stepOne: 'idle',
	stepTwo: 'idle',
	orderNum: null,
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
		changeOrderNum: (state, { payload }: PayloadAction<null | number>) => {
			state.orderNum = payload;
		},
	},
});

export const {
	changeStatusStepTwo,
	changeStatusStepOne,
	changeOrderNum,
	orderInit,
} = order.actions;
export default order.reducer;
