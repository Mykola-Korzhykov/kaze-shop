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
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 4, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', label: 'select' },
        { id: 5, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', label: 'text' },
        { id: 6, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', label: 'text' },
        { id: 7, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', label: 'text' }
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