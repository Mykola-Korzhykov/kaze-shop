import React from "react"
import s from './InputText.module.scss'
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
import Image from 'next/image';
//redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"
import {setTitle, setDescription, setPrice, setCategories, setQuantity} from '../../../../../../../redux/slices/formData'
import { useAppDispatch } from '@/redux/hooks'
import {setModalAddCAtegory} from '../../../../../../../redux/slices/modal'
// import {initialStateType, } from '../../../../../../../redux/slices/formData'

interface InputItemProps {
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
    inputsState: any
    // setModalAddCAtegory?: (n: boolean)=> void
    
}

export const InputTextItem = ({ inputsState, setInputsState , id, type, text, placeholder, disable, name, colors, modalAddColor, setModalAddColor, }: InputItemProps) => {

    const dispatch = useAppDispatch()
    // const titleStore = useSelector((state: RootState)=> state.formData.title)

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

    // const [validLocal, setValidLocal] = React.useState<boolean>(true)

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
            // className={  s.input } 
            type={type}
            placeholder={  inputsState[id] ? placeholder  :   `Это поле не может быть пустым`}  /> : '' }

            {disable == false && type === 'number' ?
            <input id={`${id}`}
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
            // className={ inputsState[id] ?  s.input : `${s.input_off_valid} ${s.input}` } 
            className={ inputsState[id] ?  s.input : `${s.input} ${s.input_off_valid}`  } 
            type={type} 
            placeholder={  inputsState[id] ? placeholder  :   `Это поле не может быть пустым`} /> : '' }

            {/* {disable == true  && type === 'text' && placeholder === 'Выберите существующий товар' ?  <input id={`${id}`} 
            onClick={()=> console.log('p')} 
            style={{cursor: 'pointer'}} 
            readOnly 
            className={s.input} 
            type={type} 
            placeholder={placeholder} /> : ''} */}

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

                            // setInputsState((prevState: any)=>{
                            //     const prevStateCopy = {...prevState}
                            //     prevStateCopy[id] = el.ua
                            //     return prevStateCopy
                            // })

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

               
       
            // <label htmlFor="categoruProduct" className={s.select__wrapper}>
                    
            //         <select className={s.select} placeholder={placeholder} name="categoruProduct" id="categoruProduct">
            //             <option className={s.p} style={{ 'color': 'red' }} value="" disabled selected>Выберите категорию товара </option>
            //         </select>
            // </label> 
            : 

            ''
            
            } 

        
        </div>
    )
}

// categories