import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface initialStateType {
   
}

const initialState: initialStateType = {
    
}

export const formData = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setSizes: (state, action) => {
            
        
        },

    },
})

export const {  } = formData.actions

export default formData.reducer