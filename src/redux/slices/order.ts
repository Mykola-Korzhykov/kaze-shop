import { FormLoadStatusType, FormLoadStatus } from '@/types/singleProduct';
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
		// stepOneSuccess: (state) => {
		// 	state.stepOne = 'success';
		// },
		// stepOneLoaded: (state) => {
		// 	state.stepOne = 'loading';
		// },
		// backToStepOne: (state) => {
		// 	state.stepOne = 'idle';
		// },
		// stepTwoLoaded: (state) => {
		// 	state.stepTwo = 'loading';
		// },
		// stepTwoSuccess: (state) => {
		// 	state.stepTwo = 'success';
		// },
		// stepOneError: (state) => {
		// 	state.stepOne = 'error';
		// },
		// stepTwoError: (state) => {
		// 	state.stepOne = 'error';
		// },
		changeStatusStepOne: (
			state,
			{ payload }: PayloadAction<keyof typeof FormLoadStatus>
		) => {
			state.stepOne = payload;
		},
		changeStatusStepTwo: (
			state,
			{ payload }: PayloadAction<keyof typeof FormLoadStatus>
		) => {
			state.stepTwo = payload;
		},
		changeOrderNum: (state, { payload }: PayloadAction<null | number>) => {
			state.orderNum = payload;
		},
	},
});

export const {
	// stepOneSuccess,
	// stepOneLoaded,
	// backToStepOne,
	// stepTwoLoaded,
	// stepTwoSuccess,
	changeStatusStepTwo,
	changeStatusStepOne,
	changeOrderNum,
	orderInit,
} = order.actions;
export default order.reducer;
