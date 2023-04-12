import { FormLoadStatusType } from '@/types/singleProduct';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FormLoadStatusType = {
	stepOne: 'idle',
	stepTwo: 'idle',
};

const order = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		stepOneSuccess: (state) => {
			state.stepOne = 'success';
		},
		stepOneLoaded: (state) => {
			state.stepOne = 'loading';
		},
		backToStepOne: (state) => {
			state.stepOne = 'idle';
		},
		stepTwoSuccess: (state) => {
			state.stepTwo = 'success';
		},
		stepTwoLoaded: (state) => {
			state.stepTwo = 'loading';
		},
	},
});

export const {
	stepOneSuccess,
	stepOneLoaded,
	backToStepOne,
	stepTwoLoaded,
	stepTwoSuccess,
} = order.actions;
export default order.reducer;
