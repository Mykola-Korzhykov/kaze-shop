import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface initialStateType {
    title: {
        ua: string | null,
        ru: string | null,
        rs: string | null,
        en: string | null,
      };
      description: {
        ua: string | null,
        ru: string | null,
        rs: string | null,
        en: string | null,
      },
      sizes:string[],
      colourId: number | null,
      price: number | null,
      quantity: number | null,
      imagesjpg: null | any,
      allcoloursId: number[] | null,
      allsizes: string[] | null,
      categories: number[] | null,
    
}

const initialState: initialStateType = {
    title: {
        ua: null,
        ru: null,
        rs: null,
        en: null,
      },
      description: {
        ua: null,
        ru: null,
        rs: null,
        en: null,
      },
      sizes:[],
      colourId: null,
      price: null,
      quantity: null ,
      imagesjpg: [],
      allcoloursId: [],
      allsizes: [],
      categories: [],

}

export const formData = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<{ branch: keyof initialStateType['title'], title: string }>) => {
            const { branch, title } = action.payload;
            if (branch in state.title) {
                state.title[branch] = title;
            }
        },
        setDescription: (state, action: PayloadAction<{ branch: keyof initialStateType['description'], description: string }>) => {
            const { branch, description } = action.payload;
            if (branch in state.description) {
                state.description[branch] = description;
            }
        },
        setSizes: (state, action: PayloadAction<string>) => {
            state.sizes.push(action.payload)
        },
        removeSizes: (state, action: PayloadAction<string>) =>{
            const found =  state.sizes.find((el)=> el === action.payload)
            const index = state.sizes.indexOf(found)
            state.sizes.splice(index, 1)
        },
        //colors
        setColors:  (state, action: PayloadAction<number>) =>{
            state.colourId = action.payload
        },
        //price
        setPrice:  (state, action: PayloadAction<number>) =>{
            state.price = action.payload
        },
        //quantity
        setQuantity:  (state, action: PayloadAction<number>) =>{
            state.quantity = action.payload
        },
        setImagesPng:  (state, action: PayloadAction<any>) =>{
            state.imagesjpg.push(action.payload)
        },
        removeAll:  (state) =>{
            state.sizes = []
            state.colourId = null
            state.imagesjpg = []
    
        },
        //allcoloursId
        setAllcoloursId:  (state, action: PayloadAction<any>) =>{
            state.allcoloursId.push(action.payload)
        },
        //allSizes
        setAllsizes:  (state, action: PayloadAction<string[]>) =>{
            state.allsizes = [...state.allsizes, ...action.payload]

        },
        //AllCategories
        setCategories:  (state, action: PayloadAction<number>) =>{
            state.categories.push(action.payload)

        },

    },
})

export const { 
    setTitle, setDescription, 
    setSizes, removeSizes,
    setColors,
    setPrice,
    setQuantity,
    setImagesPng,
    removeAll,
    setAllcoloursId,
    setAllsizes,
    setCategories} = formData.actions

export default formData.reducer