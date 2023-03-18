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
    // setModalAddCAtegory?: (n: boolean)=> void
    
}

export const InputTextItem = ({ id, type, text, placeholder, disable, name, colors, modalAddColor, setModalAddColor, }: InputItemProps) => {

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

    console.log('categoriesfjfjfjfjfjjf', categories)


    // console.log('modalAddCAtegory', modalAddCAtegory)
    // console.log('categories', categories)
    // console.log('categoryArr', categoryArr)

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
            </div>
            
            {disable == false && type === 'text' ? <input id={`${id}`} name={name} onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder} /> : '' }
            {disable == false && type === 'number' ?  <input id={`${id}`}  style={{WebkitAppearance: 'none', MozAppearance: 'textfield'}} name={name} onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder} /> : '' }
            {disable == true  && type === 'text' && placeholder === 'Выберите существующий товар' ?  <input id={`${id}`} onClick={()=> console.log('p')} style={{cursor: 'pointer'}} readOnly className={s.input} type={type} placeholder={placeholder} /> : ''}

            {/* {disable == true  && type === 'text' && placeholder === 'Выбрать один цвет фотографии' ? 
                <label className={s.select__wrapper} htmlFor="selectColor">
                <input onClick={()=> setModalAddColor(!modalAddColor)} style={{cursor: 'pointer'}} 
                id='selectColor' 
                readOnly 
                className={s.input} 
                type={type} 
                placeholder={placeholder} />
                <Image  className={`${s.select_img}`} src={selectIcon} alt="My Image" />

                <div style={{display: modalAddColor ? 'flex' : 'none' }} className={s.color_wrapper}>
                    {colors?.map((obj)=>{
                        return <div className={s.inner_color}>
                            <span style={{ backgroundColor: `${obj.hex}`,}} className={s.color} > </span>
                            <span className={s.color_title}>{obj.label}</span>
                        </div>
                    })}
                </div>
             </label>    
            : ''} */}

            {type === 'select' ?  
                <label
                 className={s.select__wrapper} htmlFor="selectCategory">
                        <input 
                        onClick={(e) => { console.log('[[[[[');  setCategoriesDisplay(!categoriesDisplay); }}  
                        id='selectCategory' 
                        readOnly 
                        className={s.input} 
                        type={type}
                        placeholder={activeCategories ? activeCategories.ru : placeholder  } />
                        <Image  className={`${s.select_img}`} src={selectIcon} alt="My Image" />

                        <div className={  categoriesDisplay ?  s.categorychose_wrapper : s.categorychose_wrapper_off }>
                            
                        {  newCategoryArr?.map((el, ind) =>{
                        return el.id !== 0.1 ?
                        <div onClick={ (e) => { 
                            e.preventDefault()
                            e.stopPropagation(); 
                            
                            
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