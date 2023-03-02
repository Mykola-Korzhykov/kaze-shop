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
      sizesend:string[],
      colorsend: number[]
    
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
      sizesend:[],
      colorsend: []

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
            state.sizesend.push(action.payload)
        },
        removeSizes: (state, action: PayloadAction<string>) =>{
            const found =  state.sizesend.find((el)=> el === action.payload)
            const index = state.sizesend.indexOf(found)
            state.sizesend.splice(index, 1)
        },
        setColors:  (state, action: PayloadAction<number>) =>{
            console.log('colorsend',  state.colorsend)
            state.colorsend.push(action.payload)
        }


    },
})

export const { 
    setTitle, setDescription, 
    setSizes, removeSizes,
    setColors} = formData.actions

export default formData.reducer