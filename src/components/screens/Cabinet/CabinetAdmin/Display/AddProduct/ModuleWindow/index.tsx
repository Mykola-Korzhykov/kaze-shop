import React from "react"
import s from './ModuleWindow.module.scss'
import { SizeItem } from "../SizesItem"
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'
import {setSizes, setColors} from '../../../../../../../redux/slices/admin'



interface ModuleWindiwProps {
    setModalAddPhoto: (n: boolean)=> void,
    modalAddPhoto: boolean,
    setChoiceColor: (n: boolean)=> void,
    choiceColor: boolean,
    setModalAddColor: (n: boolean)=> void,
    modalAddColor: boolean,
}

export const ModuleWindiw = ({setModalAddPhoto, modalAddPhoto, setChoiceColor, choiceColor, setModalAddColor, modalAddColor}: ModuleWindiwProps) => {

    const dispatch = useAppDispatch()

    const selectedSizes = useSelector((state: RootState)=> state.admin.sizesend)
    const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
    console.log('colors', colors)
    const categories =  useSelector((state: RootState)=> state.goods.fetchedCategories)

    const sizesItems = [
        { id: 0, size: 'XS'},
        { id: 1, size: 'S'},
        { id: 2, size: 'XXL'},
        { id: 3, size: 'XXS'},
        { id: 4, size: 'M'},
     ]

    //  let sizesArr = [{ id: 0, size: 'XS'}, { id: 1, size: 'S'},]

     const [choiceSize, setChoiceSize] = React.useState<boolean>(false)
  

    return (
        <div  style={  modalAddColor  ? {visibility: 'hidden'} :  {visibility: 'visible'}} className={s.module_wrapper}>

       
        <div className={s.module_inner}>

        <div onClick={()=> setModalAddPhoto(false)} className={s.close_modal}>

            <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
        </div>


            <div className={s.title_wrapper}>
                <div className={s.title}>Добавить фотографию</div>
                <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
            </div>

            <div className={s.inputs_wrapper}>
                <div className={s.input_inner}>
                    <span className={s.title}>Фотография в jpg</span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotojpg">
                        Загрузите фотографию
                        <input id="uploadfileaddphotojpg" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                    </label>
                </div>

                <div className={s.input_inner}>
                    <span className={s.title}>Фотография в png</span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotopng">
                        Загрузите фотографию
                        <input id="uploadfileaddphotopng" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                    </label>
                </div>
                
                <div className={s.input_inner}>
                    <span className={s.title}>Размер</span>
                    <span onClick={()=>{
                        setChoiceSize(!choiceSize)
                    }} className={s.input_choice_photo}>
                        Выбрать размер фотографии
                    {choiceSize ? <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                             </svg> : 
                             <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}

                        <div className={ choiceSize ? `${s.choice_photo_wrapper} ${s.choice_photo_on}` : `${s.choice_photo_wrapper} ${s.choice_photo_off}`  }>
                            {sizesItems.map((el, ind)=>{
                                return <span onClick={
                                    ()=>  dispatch(setSizes(el)) 
                                } key={ind} className={s.item_choice_photo}>
                                    {el.size}
                                </span>
                            })}
                           
                        </div>
                    </span>
                </div>

                <div className={s.sizes}>
                    {selectedSizes?.map((el)=>{
                        return <SizeItem size={el.size} id={el.id} />
                    })}
                </div>

                <div className={s.input_inner}>
                    <span className={s.title}>Цвет</span>
                    <span onClick={()=> { setChoiceColor(!choiceColor)}} className={s.input_choice_color}>
                        Выбрать цвет фотографии
                        {choiceColor ? <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                             </svg> : 
                             <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}
                    </span>
                        <div  style={{top: selectedSizes?.length > 0 ? '602px' : '558px'}} className={s.color_wrapper_main}>
                            { choiceColor ? colors?.map((el, ind)=>{
                                return el.id !== 48 ? (
                                    <div onClick={()=> {
                                        dispatch(setColors(el))
                                        setChoiceColor(!choiceColor)
                                    }} key={ind} className={s.color_wrapper}>
                                        <span className={s.color} style={{
                                            backgroundColor: `${el.hex}`,
                                        }}>  
                                        </span>
                                        <span className={s.title}>
                                            {el.label}
                                        </span>
                                    </div>
                                ) : <div onClick={()=> {
                                    setModalAddColor(true)
                                    setChoiceColor(!choiceColor)
                                }} key={ind} className={s.color_wrapper}>
                                    
                                    <svg className={s.plus} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 12H20.25" stroke="#9D9D9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 3.75V20.25" stroke="#9D9D9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                        <span className={s.title}>
                                            {el.label}
                                        </span>
                                       
                                </div>
                            }) : ''}
                        </div>
                   </div>
                <button className={s.btn}>
                    Добавить фотографию
                </button>
            </div>
        </div>
    </div>


    )
}