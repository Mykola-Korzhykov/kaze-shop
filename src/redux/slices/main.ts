import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
//types 
import { Product } from '@/types/auth'
import product1 from '../../assets/images/main/products/product1.svg'
import product2 from '../../assets/images/main/products/product2.svg'
import product3 from '../../assets/images/main/products/product3.svg'
//fitnes
import productFitnes1 from '../../assets/images/main/productsFitnes/product1.svg'
import productFitnes2 from '../../assets/images/main/productsFitnes/product2.svg'
import productFitnes3 from '../../assets/images/main/productsFitnes/product3.svg'
import productFitnes4 from '../../assets/images/main/productsFitnes/product4.svg'
//ProductsAccessor 
import ProductsAccessor1 from '../../assets/images/main/ProductsAccessories/product1.svg'
import ProductsAccessor2 from '../../assets/images/main/ProductsAccessories/product2.svg'
import ProductsAccessor3 from '../../assets/images/main/ProductsAccessories/product3.svg'
import ProductsAccessor4 from '../../assets/images/main/ProductsAccessories/product4.svg'

export interface initialStateType {
    productsLeggings: Product[],
    productsFitnes: Product[],
    pavlo: Product[]
}

const initialState: initialStateType = {
    productsLeggings: [
        { id: 1, price: '78$', description: 'Лосины ТайДай', img: product1 },
        { id: 2, price: '78$', description: 'Лосины ТайДай', img: product2 },
        { id: 3, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 4, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 5, price: '78$', description: 'Лосины ТайДай', img: product3 },
        { id: 6, price: '78$', description: 'Лосины ТайДай', img: product3 },
    ],
    productsFitnes: [
        { id: 1, price: '78$', description: 'Лосины классика', img: productFitnes1 },
        { id: 2, price: '78$', description: 'Лосины классика', img: productFitnes2 },
        { id: 3, price: '78$', description: 'Лосины классика', img: productFitnes3 },
        { id: 4, price: '78$', description: 'Лосины классика', img: productFitnes4 },
        { id: 5, price: '78$', description: 'Лосины классика', img: productFitnes1 },
        { id: 6, price: '78$', description: 'Лосины классика', img: productFitnes2 },
        { id: 7, price: '78$', description: 'Лосины классика', img: productFitnes3 },
        { id: 8, price: '78$', description: 'Лосины классика', img: productFitnes4 },
    ],
    pavlo: [
        { id: 1, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor1 },
        { id: 2, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor2 },
        { id: 3, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor3 },
        { id: 4, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor4 },
        { id: 5, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor1 },
        { id: 6, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor2 },
        { id: 7, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor3 },
        { id: 8, price: '34$', description: 'Те-ля-ви белая', img: ProductsAccessor4 },
    ]

}

// console.log(initialStateType.productsAccessor)

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