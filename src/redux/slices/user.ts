import { User } from '@/types/auth'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

type UserSLice = {
	user: User | null
	isAuth: boolean
}

const initialState: UserSLice = {
	user: null,
	isAuth: false,
}

const userSLice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		addUserInfo(state, action: PayloadAction<User>) {
			state.user = action.payload
		},
		setAuthState(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.user,
			}
		},
	},
})

export const selectUserInfo = (state: RootState) => state.user.user
export const selectAuthState = (state: RootState) => state.user.isAuth

export const { addUserInfo, setAuthState } = userSLice.actions

export default userSLice.reducer
