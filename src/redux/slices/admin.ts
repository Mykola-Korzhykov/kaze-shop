import { createSlice, createAsyncThunk, PayloadAction, Slice } from '@reduxjs/toolkit'
import axios from 'axios'


    //поиск юзерів через дебаунс 
 export const findUsersRole = createAsyncThunk(
    'users/fetchUsersRole',
    async (params: string, thunkAPI) => {
      const response = await axios.get(`/user/find_users?page=1&pageSize=1&v=${params}`)
      return response.data
    }
  )

    //получення всіх юзерів на перший рендерінг 
  export const getUsersRole = createAsyncThunk(
    'users/getUsers',
    async () => {
      const response = await axios.get(`/user/get_users?page=1&pageSize=1`)
      return response.data
    }
  )

     //поиск адмінів через дебаунс 
 export const findUsersAdmin = createAsyncThunk(
    'users/fetchUsersAdmin',
    async (params: string, thunkAPI) => {
      const response = await axios.get(`/admin/find_admin?page=1&pageSize=1&v=${params}`)
      return response.data
    }
  )

    //получення всіх aдмінів
  export const getUsersAdmin = createAsyncThunk(
    'users/getAdmins',
    async () => {
      const response = await axios.get(`/admin/get_admins?page=1&pageSize=1`)
      return response.data
    }
  )




  export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    addContent: boolean;
    editContent: boolean;
    editWebSite: boolean;
  }
  
export interface initialStateType {
    usersRole: User[],
    usersAdmin: User[],
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
    categoryArr: {id: number, title: string }[],
    loading: boolean,
    error: string,


}

const initialState: initialStateType = {
    usersRole: [

        {
            id: 1,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 2,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '+380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 3,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 4,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        }
    ],
    usersAdmin: [

        {
            id: 1,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 2,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '+380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 3,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        },
        {
            id: 4,
            name: 'Pavlo',
            surname: 'Podulak',
            email: 'pdpdpdp@gmail.com',
            phoneNumber: '380688874901',
            isAdmin: false,
            addContent: false,
            editContent: false,
            editWebSite: false,
        }
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
    ],
    loading: false,
    error: 'no error'
}


export const admin: Slice<initialStateType> = createSlice({
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
            state.colors.push(action.payload)
        },
        setAddPhotoState: (state) => {
            state.addPhotoState.push({id: state.addPhotoState[state.addPhotoState.length - 1].id + 1})
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.usersRole = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
        //пошук ролів
          .addCase(findUsersRole.fulfilled, (state, action) => {
            state.usersRole = action.payload;
          })
          .addCase(findUsersRole.pending, (state) => {
            state.loading = true;
          })
          .addCase(findUsersRole.rejected, (state, action) => {
            state.usersRole = []
            state.error = action.error.message;
            state.loading = false;
          })
          //полученя юзерів 
          .addCase(getUsersRole.fulfilled, (state, action) => {
            state.usersRole = action.payload;
          })
          .addCase(getUsersRole.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUsersRole.rejected, (state, action) => {
            state.usersAdmin = []
            state.error = action.error.message;
            state.loading = false;
          })
          //получення адмінів
          .addCase(getUsersAdmin.fulfilled, (state, action) => {
            state.usersAdmin = action.payload;
          })
          .addCase(getUsersAdmin.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUsersAdmin.rejected, (state, action) => {
            state.usersAdmin = []
            state.error = action.error.message;
            state.loading = false;
          })
          // пошук адмінів через дебаунс 
          .addCase(findUsersAdmin.fulfilled, (state, action) => {
            state.usersAdmin = action.payload;
          })
          .addCase(findUsersAdmin.pending, (state) => {
            state.loading = true;
          })
          .addCase(findUsersAdmin.rejected, (state, action) => {
            state.usersAdmin = []
            state.error = action.error.message;
            state.loading = false;
          })
      },


     
})

export const {  setSizes, removeSizes,  setColors, setAddPhotoState, setUsers } = admin.actions

export default admin.reducer