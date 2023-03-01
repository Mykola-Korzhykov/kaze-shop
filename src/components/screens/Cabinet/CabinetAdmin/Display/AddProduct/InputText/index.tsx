import React from "react"
import s from './InputText.module.scss'
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
import Image from 'next/image';

interface InputItemProps {
    id: number,
    type: string,
    text: string,
    placeholder: string,
    label?: string,
    disable: boolean,
    sizesItems? : any
    colors? : {
        label: string,
        hex: string | null, 
        id: number
    }[],
    setModalAddColor?: (n: boolean)=> void
    modalAddColor?: boolean,
}

export const InputTextItem = ({ id, type, text, placeholder, disable, colors, modalAddColor, setModalAddColor}: InputItemProps) => {


    // console.log('colors', colors)
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
            {disable == false && type === 'text' ?  <input className={s.input} type={type} placeholder={placeholder} /> : '' }
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