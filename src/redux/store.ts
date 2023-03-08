import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import goods from './slices/goods'
import user from './slices/user'
import admin from './slices/admin'
import main from './slices/main'
import formData from './slices/formData'
import modaleSlice from './slices/modal'

export function makeStore() {
	return configureStore({
		reducer: {
			goods: goods,
			user: user,
			admin,
			main,
			formData,
			modaleSlice
		},
	})
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>


export const wrapper = createWrapper<RootStore>(makeStore, { debug: false })
