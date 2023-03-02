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
    sizesend:[
        {
            id: number,
            size: string
        }
    ],
    colors: {
        label: string,
        hex: string | null, 
        id: number
    }[],
    addPhotoState: {id: number}[],
    sizesItems: { id: number,size: string}[],
    categoryArr: {id: number, title: string }[]

}

const initialState: initialStateType = {
    users: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ],
    inputs: [

    ],
    sizesend: [
        { id: 0, size: 'XS' },
    ],
    colors: [ { label: 'Бежевый', hex: '#FFE4C4', id: 1 },
    { label: 'Капучинный', hex: '#9F8E84', id: 2 },
    { label: 'Синий', hex: '#000080', id: 3 },
    { label: 'Голубой', hex: '#A6BEE5', id: 4 },
    { label: 'Коричневый', hex: '#0B0B0B', id: 5 },
    { label: 'Изумрудный', hex: '#24514C', id: 6 },
    { label: 'Розовый', hex: '#FFC0CB', id: 7 },
    { label: 'Фиолетовый', hex: '#800080', id: 8 },
    { label: 'Черный', hex: '#0B0B0B', id: 52 },
    { label: 'Оливковый', hex: '#829E86', id: 432 },
    { label: 'Белый', hex: '#fff', id: 34314 },
    { label: 'Серый', hex: '#808080', id: 13413413413 },
    { label: 'Графитовый', hex: '#525A5B', id: 57567 },
    { label: 'Пудровый', hex: '#F2E2D8', id: 75756756 },
    {label: 'Добавить цвет ', hex: null, id: 75756756 }],
    addPhotoState: [{id: 1}],
    sizesItems: [
        { id: 0, size: 'XS'},
        { id: 1, size: 'S'},
        { id: 2, size: 'XXL'},
        { id: 3, size: 'XXS'},
        { id: 4, size: 'M'},
    ],
    categoryArr: [
        {id: 1, title: 'первая категоря'},
        {id: 2, title: 'вторая'}, 
        {id: 0.1, title: 'уоуооуоуоуоуоуоу категория '}
    ]
}


export const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSizes: (state, action: PayloadAction<{id: number, size: string }>) => {
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.sizesend.push(action.payload)
        },
        removeSizes: (state, action) =>{
            // console.log('вход')
            const found =  state.sizesend.find((el)=> el.id === action.payload)
            const index = state.sizesend.indexOf(found)
            state.sizesend.splice(index, 1)
        },

        setColors: (state, action: PayloadAction<{label: string,hex: string,  id: number }>) => {
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.colors.push(action.payload)
        },
        setAddPhotoState: (state) => {
            
            //const found =  state.sizes.indexOf(action.payload.id)
            state.addPhotoState.push({id: state.addPhotoState[state.addPhotoState.length - 1].id + 1})
        },

    },
})

export const {  setSizes, removeSizes,  setColors, setAddPhotoState } = admin.actions

export default admin.reducer