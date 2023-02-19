import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import product1 from '../../assets/images/main/products/product1.svg'
import product2 from '../../assets/images/main/products/product2.svg'
import product3 from '../../assets/images/main/products/product3.svg'


export interface initialStateType {
    productsLeggings: {
        price: string,
        description: string,
        img: string
        id: number

    }[]
}

const initialState: initialStateType = {
    productsLeggings: [
        { id: 1, price: '78$', description: 'Лосины ТайДай', img: product1 },
        { id: 2, price: '78$', description: 'Лосины ТайДай', img: product2 },
        { id: 3, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 4, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 5, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 6, price: '78$', description: 'Лосины ТайДай', img: product3 },
    ]

}

export const main = createSlice({
    name: 'main',
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

export const { } = main.actions

export default main.reducer