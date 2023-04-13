import { User } from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

interface ModalType {
	modalAddPhoto: boolean;
	modalAddColor: boolean;
	modalAddCAtegory: boolean;
	modalAddEditProduct: boolean;
	choiceColor: boolean;
	countPhoto: number;
	imageUrlArr: string[][];
	sentProductForm: {
		turn: boolean;
		title: string;
		subtitle: string;
		btntitle: string;
	};
}

const initialState: ModalType = {
	modalAddPhoto: false,
	modalAddColor: false,
	modalAddCAtegory: false,
	choiceColor: false,
	countPhoto: 1,
	//для отобржения фото после загрузки
	imageUrlArr: [],
	modalAddEditProduct: false,
	sentProductForm: {
		turn: false,
		title: '',
		subtitle: '',
		btntitle: '',
	},
};

// const [countPhoto, setCountPhoto] = React.useState<number>(1)
const modaleSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setModalAddPhoto: (state, action) => {
			state.modalAddPhoto = action.payload;
		},
		setModalAddColor: (state, action) => {
			state.modalAddColor = action.payload;
		},
		setCountPhoto: (state, action) => {
			state.countPhoto = action.payload;
		},
		setModalAddCAtegory: (state, action) => {
			state.modalAddCAtegory = action.payload;
		},
		setChoiceColorDispatch: (state, action) => {
			// state.choiceColor = action.payload
		},
		setImageUrl: (state, action: PayloadAction<string[]>) => {
			state.imageUrlArr.push(action.payload);
		},
		removeimageUrlArr: (
			state,
			action: PayloadAction<{ from: number; size: number }>
		) => {
			state.imageUrlArr.splice(action.payload.from, action.payload.size);
		},
		setModalAddEditProduct: (state, action) => {
			state.modalAddEditProduct = action.payload;
		},
		setProductForm: (
			state,
			action: PayloadAction<{
				turn: boolean;
				title: string;
				subtitle: string;
				btntitle: string;
			}>
		) => {
			state.sentProductForm.turn = action.payload.turn;
			state.sentProductForm.title = action.payload.title;
			state.sentProductForm.subtitle = action.payload.subtitle;
			state.sentProductForm.btntitle = action.payload.btntitle;
		},
	},
});

export const selectUserInfo = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuth;

export const {
	setModalAddPhoto,
	setModalAddColor,
	setCountPhoto,
	setModalAddCAtegory,
	setChoiceColorDispatch,
	setImageUrl,
	removeimageUrlArr,
	setModalAddEditProduct,
	setProductForm,
} = modaleSlice.actions;

export default modaleSlice.reducer;
