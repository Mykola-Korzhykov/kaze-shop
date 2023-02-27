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
    }[],
    sizes:[
        {
            id: number,
            size: string
        }
    ],
    // sizes2:[
    //     {
    //         id: number,
    //         size: string
    //     }
    // ]
    colors: {
        label: string,
        hex: string, 
        id: number
    }[]

}

const initialState: initialStateType = {
    users: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ],
    inputs: [

    ],
    sizes: [
        { id: 0, size: 'XS' },
    ],
    colors: []
}

export const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSizes: (state, action: PayloadAction<{id: number, size: string }>) => {
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.sizes.push(action.payload)
        },
        removeSizes: (state, action) =>{
            // console.log('вход')
            const found =  state.sizes.find((el)=> el.id === action.payload)
            const index = state.sizes.indexOf(found)
            state.sizes.splice(index, 1)
        },

        setColors: (state, action: PayloadAction<{label: string,hex: string,  id: number }>) => {
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.colors.push(action.payload)
        },
    },
})

export const {  setSizes, removeSizes, setColors } = admin.actions

export default admin.reducer