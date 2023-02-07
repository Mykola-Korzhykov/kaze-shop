import { User } from '@/types/auth'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
type UserSLice = {
	user: User | null
}
const initialState: UserSLice = {
	user: null,
}
const userSLice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		addUserInfo(state, action: PayloadAction<User>) {
			state.user = action.payload
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

export const { addUserInfo } = userSLice.actions

export default userSLice.reducer
