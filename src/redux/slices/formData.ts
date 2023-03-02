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
      sizesend:[]
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
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.sizesend.push(action.payload)
        },
        removeSizes: (state, action: PayloadAction<string>) =>{
            // console.log('вход')
            const found =  state.sizesend.find((el)=> el === action.payload)
            const index = state.sizesend.indexOf(found)
            state.sizesend.splice(index, 1)
        },

    },
})

export const { setTitle, setDescription, setSizes, removeSizes} = formData.actions

export default formData.reducer