import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export interface initialStateType {
    users: {
        id: number
    }[],
    inputs: {
        id: number,
        text: string,
        placeholder: string,
        label: string
        type: string
    }[]

}

const initialState: initialStateType = {
    users: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ],
    inputs: [
        { id: 1, type: 'text', text: 'Название товара', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 2, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', label: 'select' },
        { id: 3, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', label: 'text' },
        { id: 4, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', label: 'text' },
        { id: 5, type: 'text', text: 'Описание товара', placeholder: 'Введите описание товара', label: 'text' }
    ]

}

export const admin = createSlice({
    name: 'admin',
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