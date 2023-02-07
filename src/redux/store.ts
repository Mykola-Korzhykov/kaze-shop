import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import goods from './slices/goods'
import user from './slices/user'
export function makeStore() {
	return configureStore({
		reducer: {
			goods: goods,
			user: user,
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
