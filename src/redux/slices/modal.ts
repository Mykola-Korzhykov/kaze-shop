import { User } from '@/types/auth'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

interface ModalType {
	modalAddPhoto: boolean
    modalAddColor: boolean
    modalAddCAtegory: boolean
    choiceColor: boolean
    countPhoto: number,
    imageUrlArr: string[][]
    
}

const initialState: ModalType = {
	modalAddPhoto: false,
    modalAddColor: false,
    modalAddCAtegory: false,
    choiceColor: false,
    countPhoto: 1,
    //для отобржения фото после загрузки 
    imageUrlArr: []
}

// const [countPhoto, setCountPhoto] = React.useState<number>(1)
const modaleSlice  = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setModalAddPhoto: (state, action) =>{
            state.modalAddPhoto = action.payload
        },
        setModalAddColor: (state, action) =>{
            state.modalAddColor = action.payload
        },
        setCountPhoto:  (state, action) =>{
            state.countPhoto = action.payload
        },
        setModalAddCAtegory: (state, action) =>{
            state.modalAddCAtegory = action.payload
        },
        setChoiceColorDispatch: (state, action) =>{
            // state.choiceColor = action.payload
        },
        setImageUrl:(state, action: PayloadAction<string[]>) =>{
            state.imageUrlArr.push(action.payload)
        }

	},
})

export const selectUserInfo = (state: RootState) => state.user.user
export const selectAuthState = (state: RootState) => state.user.isAuth

export const { setModalAddPhoto, setModalAddColor, setCountPhoto, setModalAddCAtegory, setChoiceColorDispatch, setImageUrl } = modaleSlice.actions

export default modaleSlice.reducer
