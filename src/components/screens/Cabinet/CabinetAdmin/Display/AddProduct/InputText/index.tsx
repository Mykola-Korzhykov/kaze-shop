import React from "react"
import s from './InputText.module.scss'
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
import Image from 'next/image';
//redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"
import {setTitle, setDescription} from '../../../../../../../redux/slices/formData'
import { useAppDispatch } from '@/redux/hooks'
import {initialStateType} from '../../../../../../../redux/slices/formData'

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
}

export const InputTextItem = ({ id, type, text, placeholder, disable, name, colors, modalAddColor, setModalAddColor}: InputItemProps) => {

    const dispatch = useAppDispatch()
    // const titleStore = useSelector((state: RootState)=> state.formData.title)
    const titleDescription = useSelector((state: RootState)=> state.formData.description)
    // console.log(titleDescription)
   

    // console.log('colors', colors)
    interface BranchPayloadAction {
        branch: string,
        title: string
      }
     
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


        // console.log('titleDescription', titleDescription)
        // console.log('titleStore' , titleStore)
        // console.log('obj',event.target.name )
        // console.log('Пользователь закончил ввод:', event.target.value);
      }
    
    const sizesItems = [
        { id: 0, size: 'XS'},
        { id: 1, size: 'S'},
        { id: 2, size: 'XXL'},
        { id: 3, size: 'XXS'},
        { id: 4, size: 'M'},
     ]
   
    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                {text}
                
            </div>
            {disable == false && type === 'text' ?  <input name={name} onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder} /> : '' }
            {disable == true  && type === 'text' && placeholder === 'Выберите существующий товар' ?  <input onClick={()=> console.log('p')} style={{cursor: 'pointer'}} readOnly className={s.input} type={type} placeholder={placeholder} /> : ''}
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
                <label  className={s.select__wrapper} htmlFor="selectCategory">
                        <input style={{cursor: 'pointer'}} id='selectCategory' readOnly className={s.input} type={type} placeholder={placeholder} />
                        <Image  className={`${s.select_img}`} src={selectIcon} alt="My Image" />
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