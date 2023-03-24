import React, {useRef} from "react"
import s from './InputText.module.scss'
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
import Image from 'next/image';
//redux

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"
import {setTitle, setDescription, setPrice, setCategories, setQuantity} from '../../../../../../../redux/slices/formData'
import { useAppDispatch } from '@/redux/hooks'
import {setModalAddCAtegory} from '../../../../../../../redux/slices/modal'

interface InputItemProps {
    value? : any
    id: number,
    type: string,
    text: string,
    placeholder: string,
    // label?: string,
    disable: boolean,
    sizesItems? : any
    name: string
    colors? : {
        label: string,
        hex: string | null, 
        id: number
    }[],
    setModalAddColor?: (n: boolean)=> void
    modalAddColor?: boolean,
    modalAddCAtegory?: boolean, 
    //inputs state
    setInputsState: (n: any)=> void
    inputsState: any,
    ref: any
    // setModalAddCAtegory?: (n: boolean)=> void
}

export const InputTextItem = ({ inputsState, setInputsState , id, type, text, placeholder, disable, name, colors, modalAddColor, setModalAddColor, value}: InputItemProps) => {

    // { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', name: 'titleRU', disable: false,  },
    // { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', name: 'titleUA', disable: false },
    // { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', name: 'titleSRB',  disable: false },
    // { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', name: 'titleENG',disable: false },
    // { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false },
    // { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false },
    // { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false },
    // { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false },
    // { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара', name: 'text', disable: false },
    // { id: 9, type: 'number', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
    // { id: 10, type: 'number', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },
    
    


    const dispatch = useAppDispatch()
    //redux
    const modalAddCAtegory =  useSelector((state: RootState)=> state.modaleSlice.modalAddCAtegory)
    const titleDescription = useSelector((state: RootState)=> state.formData.price)

    const categories = useSelector((state: RootState)=> state.formData.categories)
    const categoryArr = useSelector((state: RootState)=> state.goods.fetchedCategories)

    const newCategoryArr = [...categoryArr, {
		id: 0.1,
		ua: 'UAstring',
		en: 'ENstring',
		rs: 'RSstring',
		ru: 'RUtring',
		type: 'category',
		createdAt: 'string',
		updatedAt: 'string'
	},]

    const activeCategories = categoryArr.find((el)=>{
        return el.id === categories[0]
    })

    //state
    const [categoriesDisplay, setCategoriesDisplay ] = React.useState<boolean>(false)

    function handleBlurSet(event: any) {
        
        if(event.target.name === 'titleRU' ){
            const payload: any = {branch: 'ru', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleUA' ){
            const payload: any = {branch: 'ua', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleSRB' ){
            const payload: any = {branch: 'rs', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleENG' ){
            const payload: any = {branch: 'en', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        //descriptionRU
        if(event.target.name === 'descriptionRU'){
            const payload: any = {branch: 'ru', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionUA'){
            const payload: any = {branch: 'ua', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionSRB'){
            const payload: any = {branch: 'rs', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionENG'){
            const payload: any = {branch: 'en', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
         //quantity
        if(event.target.name === 'quantity'){
            const payload: number = event.target.value
            dispatch(setQuantity(Number(payload))) 
        }
        //price
        if(event.target.name === 'price'){
        const payload: number = event.target.value
        dispatch(setPrice(Number(payload))) 
        }

        // setInputsState((prevState: any)=>{
        //     const prevStateCopy = {...prevState}
        //     prevStateCopy[event.target.id] = event.target.value
        //     return prevStateCopy
        // })

        //setQuantity

        // console.log('titleDescription', titleDescription)
        // console.log('titleStore' , titleStore)
        // console.log('obj',event.target.name )
        // console.log('Пользователь закончил ввод:', event.target.value);
    }

    return (

        <div className={s.wrapper}>
            <div className={s.title}>
                {text} 
                {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
            </div>
            
            {disable == false && type === 'text' ? 
            <input id={`${id}`} 
            value={value}
            name={name}
            onChange={(e)=>{
                setInputsState( (prevState: any)=>{
                    const objCopy = {...prevState}
                    objCopy[id] = e.target.value.trim() !== '' ? true  : false
                    return objCopy
                })
            }}
            onBlur={handleBlurSet}
            className={ inputsState[id] ?  s.input : `${s.input} ${s.input_off_valid}`  } 
            style={{
                border:  inputsState[id] ? '' : 'solid 1.5px red'
            }} 
            type={type}
            placeholder={  inputsState[id] ? placeholder  :   `Это поле не может быть пустым`}  /> : '' }

            {disable == false && type === 'number' ?
            <input id={`${id}`}
            value={value}
            onChange={(e)=>{
                setInputsState( (prevState: any)=>{
                    const objCopy = {...prevState}
                    objCopy[id] = e.target.value.trim() !== '' ? true  : false
                    return objCopy
                })
            }}
            style={{
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
                border:  inputsState[id] ? '' : 'solid 1.5px red'
            }} 
            name={name} 
            onBlur={handleBlurSet} 
            className={ inputsState[id] ?  s.input : `${s.input} ${s.input_off_valid}`  } 
            type={type} 
            placeholder={  inputsState[id] ? placeholder  :   `Это поле не может быть пустым`} /> : '' }

            {type === 'select' ?  
                <label
                    className={s.select__wrapper} 
                    htmlFor={`${id}`} >
                        <input 
                        onClick={(e) => { console.log('[[[[[');  setCategoriesDisplay(!categoriesDisplay); }}  
                        id={`${id}`} 
                        
                        readOnly 
                        className={ inputsState[id] ?  s.input : s.input_off_valid } 
                        type={type}
                        placeholder={activeCategories ? activeCategories.ru : placeholder  } />
                        <Image  className={`${s.select_img}`} src={selectIcon} alt="My Image" />
                        
                        <div className={  categoriesDisplay ?  s.categorychose_wrapper : s.categorychose_wrapper_off }>
                            
                        {  newCategoryArr?.map((el, ind) =>{
                        return el.id !== 0.1 ?
                        <div onClick={ (e) => { 
                            e.preventDefault()
                            e.stopPropagation(); 
                            setInputsState( (prevState: any)=>{
                                const objCopy = {...prevState}
                                objCopy[id] = el.ua !== '' ? true  : false
                                return objCopy
                            })  

                            setCategoriesDisplay(!categoriesDisplay);
                            dispatch(setCategories( el.id))
                            }}  key={ind} className={s.categorychose_item}>
                            <span> {el.ua} </span>
                        </div> 
                        
                        :
                        
                        <div
                        onClick={ (e) => { 
                            e.preventDefault()
                            e.stopPropagation();
                            dispatch(setModalAddCAtegory(true)) 
                            setCategoriesDisplay(!categoriesDisplay);
                            }} 
                        
                        key={ind} className={s.categorychose_add}>
                            <span className={s.categorychose_img}>
                            <svg className={s.plus} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 12H20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 3.75V20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                            </span>
                            <span className={s.categorychose_item_add}>
                               Добавить категорию
                            </span>




                        </div>
                           
                        })  }

                        </div>
                </label>  
            : 

            ''
            
            } 

        
        </div>
    )
}

// categories