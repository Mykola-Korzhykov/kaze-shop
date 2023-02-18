import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export interface initialStateType {
    users: {
        id: number
    }[]
}

const initialState: initialStateType = {
    users: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ],
}

export const admin = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {

        },
        decrement: (state) => {

        },
        incrementByAmount: (state, action) => {

        },
    },
})

export const { } = admin.actions

export default admin.reducer