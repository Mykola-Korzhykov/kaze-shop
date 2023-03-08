import { User } from '@/types/auth'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

interface ModalType {
	modalAddPhoto: boolean
    modalAddColor: boolean
    modalAddCAtegory: boolean
    choiceColor: boolean
    countPhoto: number
    
}

const initialState: ModalType = {
	modalAddPhoto: false,
    modalAddColor: false,
    modalAddCAtegory: false,
    choiceColor: false,
    countPhoto: 1,

}
// const [countPhoto, setCountPhoto] = React.useState<number>(1)
const modaleSlice = createSlice({
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
        setChoiceColor: (state, action) =>{

        }

	},
})

export const selectUserInfo = (state: RootState) => state.user.user
export const selectAuthState = (state: RootState) => state.user.isAuth

export const { setModalAddPhoto, setModalAddColor, setCountPhoto, setModalAddCAtegory, setChoiceColor } = modaleSlice.actions

export default modaleSlice.reducer
