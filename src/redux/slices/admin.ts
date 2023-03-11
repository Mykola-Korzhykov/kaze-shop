import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	Slice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../services'
//types 
import {ProductSend} from '../../types/auth'
import {fetchedColour, Goods} from '../../types/goods'
import photo from '../../assets/images/main/About/girl.svg'


// хардкор
import imgProduct from '../../assets/images/admin/img.svg'

import { RootState } from '../store';
import Cookies from 'js-cookie';

export const findUsersRole = createAsyncThunk(
  'users/fetchUsersRole',
  async (params: string[], thunkAPI) => {
    const instance = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
      },
    });
    const response = await instance.get(`/user/find_users?page=1&pageSize=10&v=${params}`);
    return response.data;
  }
);


export const getUsersRole = createAsyncThunk(
	'users/getUsers',
	async (params: number, thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		})
		const response = await instance.get(
			`/user/get_users?page=${params}&pageSize=10`
		)
		return response.data
	}
)

export const findUsersAdmin = createAsyncThunk(

  'users/fetchUsersAdmin',
  async (params: string[], thunkAPI) => {
    const instance = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
      },
    });
    const response = await instance.get(`/admin/find_admin?page=1&pageSize=10&v=${params}`);
    return response.data;
  }
);


export const getUsersAdmin = createAsyncThunk(
	'users/getAdmins',
	async (params: number, thunkAPI) => {
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (Cookies.get('accessToken') || ''),
			},
		})
		const response = await instance.get(
			`/admin/get_admins?page=${params}&pageSize=10`
		)
		return response.data
	}
)

export interface User {
	id: number
	name: string
	surname: string
	email: string
	phoneNumber: string
	isAdmin: boolean
	addContent: boolean
	editContent: boolean
	editWebsite: boolean
}

export interface initialStateType {
	usersRole: User[]
	usersAdmin: User[]
	inputs: {
		id: number
		text: string
		placeholder: string
		label: string
		type: string
	}[]
	sizesend: [
		{
			id: number
			size: string
		}
	]
	colors: {
		label: string
		hex: string | null
		id: number
	}[]
	addPhotoState: { id: number }[]
	sizesItems: { id: number; size: string }[]
	categoryArr: { id: number; title: string }[]
	loading: boolean
	error: string
	products: ProductSend[]
	editProductItemId: number,
    displayActive: number,
    editProducts: Goods[]
	// colours: fetchedColour[]

}

const initialState: initialStateType = {
	usersAdmin: [
        //  {
        //      id: 1,
        //      name: 'Pavlo',
        //      surname: 'Kolumyp',
        //      email:' pashawork@gmail.com',
        //      phoneNumber: '+380688874920',
        //      isAdmin: true,
        //      addContent: false,
        //      editContent: true,
        //      editWebsite: false,
        //  },
        // {
        //     id: 2,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 3,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 4,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 5,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
    ],
	usersRole: [
        //  {
        //      id: 1,
        //      name: 'Pavlo',
        //      surname: 'Kolumyp',
        //      email:' pashawork@gmail.com',
        //      phoneNumber: '+380688874920',
        //      isAdmin: true,
        //      addContent: false,
        //      editContent: false,
        //      editWebsite: false,
        //  },
        // {
        //     id: 2,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 3,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: true,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 4,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: false,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
        // {
        //     id: 5,
        //     name: 'Pavlo',
        //     surname: 'Kolumyp',
        //     email:' pashawork@gmail.com',
        //     phoneNumber: '+380688874920',
        //     isAdmin: false,
        //     addContent: false,
        //     editContent: true,
        //     editWebsite: false,
        // },
    ],
	inputs: [],
	sizesend: [{ id: 0, size: 'XS' }],
	colors: [
		{ label: 'Бежевый', hex: '#FFE4C4', id: 1 },
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
		{ label: 'Добавить цвет ', hex: null, id: 75756756 },
	],
	addPhotoState: [{ id: 1 }],
	sizesItems: [

		{id: 0, size: 'XS'},
		{id: 1, size: ' XS-S'},
		{id: 2, size: 'S'},
		{id: 3, size: 'S-M'},
		{id: 4, size: 'M'},
		{id: 5, size: 'L'},
		{id: 6, size: 'L-XL'},
		{id: 7, size: '2XL'},
		{id: 8, size: '3XL'},
		{id: 9, size: '4XL'},

	],
	categoryArr: [
		{ id: 1, title: 'первая категоря' },
		{ id: 2, title: 'вторая' },
		{ id: 0.1, title: 'уоуооуоуоуоуоуоу категория ' },
	],
	loading: false,
	error: 'no error',
	products: [
		{
			title: {
				ua: 'ProductUA',
				ru: 'ProductRU',
				rs: 'ProductRS',
				en: 'ProductEN',
			},
			description: {
				ua: 'ProductUA',
				ru: 'ProductRU',
				rs: 'ProductRS',
				en: 'ProductEN',
			},
			sizeChartImageDescription: {
				ua: 'cетка ua ',
				ru: 'cетка ru',
				rs: 'cетка rs',
				en: 'cетка en',
			},
			sizes: ['S', 'M'],
			colourId: 5,
			price: 500,
			quantity: 100,
			imagesjpg: [imgProduct, imgProduct, imgProduct, imgProduct, imgProduct],
			allcoloursId: [1, 2, 3, 4, 5, 6],
			allsizes: ['S', 'M', ''],
			categories: [1, 2, 3],
			netData: 'dlldldlldldldldldlldldldldldldldldldlldld',
			arrObjMod: [
				{ fileNames: ['text1', 'twxt2'], colourId: 3, sizes: ['S', 'M'] },
			],
			images: [imgProduct, imgProduct, imgProduct, imgProduct],
			id: 1,
		},
	],
	editProductItemId: -1,
    displayActive: 1,
    editProducts:[
        {
	id: 1,
	title: {
		ua: 'Павло',
		ru:' Паша',
		rs: 'хз',
		en: 'The best',
	},
	description: {
		ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
		ru: 'на русс опис doprepwfieifweifipowerf',
		rs: 'на rs опис лдощцаозщуцощауоазуцща',
		en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
	},
	price: 300,
	quantity: 100,
    // { fileNames: string[], colourId: number; sizes: string[]}
	images: [
    {
        fileNames: [photo, photo],
        colourId: 3,
        sizes: ["S", "M", "L"]
    },
    {
        fileNames: [photo, photo],
        colourId: 4,
        sizes: ["S", "M", "L"]
    },
    ],
      sizeChartImage: 'kfkf'
      ,
	sizes: ['X', 'XS'],
	colours: [
		{
			label: 'Бежевый',
			hex: '#FFE4C4',
			id: 1,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Капучинный',
			hex: '#9F8E84',
			id: 2,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Синий',
			hex: '#000080',
			id: 3,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Голубой',
			hex: '#A6BEE5',
			id: 4,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
	],
	categories: [
		{
        id: 1,
		ua: 'Категорія 1',
		en: 'Категория 1',
		rs:	'Категорія 1 rs',
		ru: 'Категорія 1 ru',
		type: 'category',
		createdAt: 'any',
		updatedAt: 'any',
        }
	]
} ,
{
	id: 1,
	title: {
		ua: 'Павло',
		ru:' Паша',
		rs: 'хз',
		en: 'The best',
	},
	description: {
		ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
		ru: 'на русс опис doprepwfieifweifipowerf',
		rs: 'на rs опис лдощцаозщуцощауоазуцща',
		en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
	},
	price: 300,
	quantity: 100,
    // { fileNames: string[], colourId: number; sizes: string[]}
	images: [
    {
        fileNames: [photo, photo],
        colourId: 3,
        sizes: ["S", "M", "L"]
    },
    {
        fileNames: [photo, photo],
        colourId: 4,
        sizes: ["S", "M", "L"]
    },
    ],
      sizeChartImage: 'kfkf'
      ,
	sizes: ['X', 'XS'],
	colours: [
		{
			label: 'Бежевый',
			hex: '#FFE4C4',
			id: 1,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Капучинный',
			hex: '#9F8E84',
			id: 2,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Синий',
			hex: '#000080',
			id: 3,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Голубой',
			hex: '#A6BEE5',
			id: 4,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
	],
	categories: [
		{
        id: 1,
		ua: 'Категорія 1',
		en: 'Категория 1',
		rs:	'Категорія 1 rs',
		ru: 'Категорія 1 ru',
		type: 'category',
		createdAt: 'any',
		updatedAt: 'any',
        }
	]
} ,
{
	id: 1,
	title: {
		ua: 'Павло',
		ru:' Паша',
		rs: 'хз',
		en: 'The best',
	},
	description: {
		ua: 'на укр опис алклалцуацушатщукшацашцушаршшашар',
		ru: 'на русс опис doprepwfieifweifipowerf',
		rs: 'на rs опис лдощцаозщуцощауоазуцща',
		en: ' на en опис оацзоащцущкаоцукаозукаоузкоауцщащз',
	},
	price: 300,
	quantity: 100,
    // { fileNames: string[], colourId: number; sizes: string[]}
	images: [
    {
        fileNames: [photo, photo],
        colourId: 3,
        sizes: ["S", "M", "L"]
    },
    {
        fileNames: [photo, photo],
        colourId: 4,
        sizes: ["S", "M", "L"]
    },
    ],
      sizeChartImage: 'kfkf'
      ,
	sizes: ['X', 'XS'],
	colours: [
		{
			label: 'Бежевый',
			hex: '#FFE4C4',
			id: 1,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Капучинный',
			hex: '#9F8E84',
			id: 2,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Синий',
			hex: '#000080',
			id: 3,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
		{
			label: 'Голубой',
			hex: '#A6BEE5',
			id: 4,
			type: 'colour',
			ru: 'ru',
			rs: 'rs',
			en: 'en',
			ua: 'ua',
			createdAt: 'stringstringTest',
			updatedAt: 'stringTest',
		},
	],
	categories: [
		{
        id: 1,
		ua: 'Категорія 1',
		en: 'Категория 1',
		rs:	'Категорія 1 rs',
		ru: 'Категорія 1 ru',
		type: 'category',
		createdAt: 'any',
		updatedAt: 'any',
        }
	]
} ,
],
// id: number
// title: {
//     ua: string
//     ru: string
//     rs: string
//     en: string
// }
// description: {
//     ua: string
//     ru: string
//     rs: string
//     en: string
// }
// price: number
// quantity: number
// images: { fileNames: string[], colourId: number; sizes: string[]}[]
// sizeChartImage: string
// sizes: string[]
// colours: fetchedColour[]
// categories: fetchedCategory[]

}




export const admin: Slice<initialStateType> = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setSizes: (state, action: PayloadAction<{ id: number; size: string }>) => {
			//const found =  state.sizes.indexOf(action.payload.id)
			state.sizesend.push(action.payload)
		},
		removeSizes: (state, action) => {
			// console.log('вход')
			const found = state.sizesend.find(el => el.id === action.payload)
			const index = state.sizesend.indexOf(found)
			state.sizesend.splice(index, 1)
		},

		setColors: (
			state,
			action: PayloadAction<{ label: string; hex: string; id: number }>
		) => {
			state.colors.push(action.payload)
		},
		setAddPhotoState: state => {
			state.addPhotoState.push({
				id: state.addPhotoState[state.addPhotoState.length - 1].id + 1,
			})
		},
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.usersRole = action.payload
		},
		setEditProductItemId: (state, action: PayloadAction<number>) => {
			state.editProductItemId = action.payload
		},
        setChangeCheckbox: (state, action: PayloadAction<{id: number, branch: keyof User, bool: boolean}>) => {
            //@ts-ignore
            state.usersRole[action.payload.id - 1][action.payload.branch] = action.payload.bool;
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
            console.log('ошибка поиск юзеров')
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
            state.usersRole = []
            console.log('ошибка получения юзеров')
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
            console.log('ошибка получения админов')
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
            console.log('ошибка поиск админов')
            state.error = action.error.message;
            state.loading = false;
          })
      },


    
})

export const {
	setSizes,
	removeSizes,
	setColors,
	setAddPhotoState,
	setUsers,
	setEditProductItemId,
    setChangeCheckbox
} = admin.actions

export default admin.reducer
