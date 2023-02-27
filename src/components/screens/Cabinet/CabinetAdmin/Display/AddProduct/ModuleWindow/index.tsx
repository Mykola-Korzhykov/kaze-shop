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
    choiceColor: boolean
}


const colors = [
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
  ]

 


export const ModuleWindiw = ({setModalAddPhoto, modalAddPhoto,}: ModuleWindiwProps) => {

    const dispatch = useAppDispatch()

    const selectedSizes = useSelector((state: RootState)=> state.admin.sizes)
    // const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
    const categories =  useSelector((state: RootState)=> state.goods.fetchedCategories)

    // const colors = useSelector((state: RootState) => state.admin.colors)

    
    const sizesItems = [
        { id: 0, size: 'XS'},
        { id: 1, size: 'S'},
        { id: 2, size: 'XXL'},
        { id: 3, size: 'XXS'},
        { id: 4, size: 'M'},
     ]
    //  let sizesArr = [{ id: 0, size: 'XS'}, { id: 1, size: 'S'},]

     const [choiceSize, setChoiceSize] = React.useState<boolean>(false)
     const [choiceColor, setChoiceColor] =React.useState<boolean>(false)

    return (
        <div className={s.module_wrapper}>

       
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
                    <span className={s.title}>Фотография в png и jpg</span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphoto">
                        Загрузите фотографию
                        <input id="uploadfileaddphoto" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
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
                    <div className={s.color_wrapper_main}>
                        { choiceColor ? colors?.map((el, ind)=>{
                            return <div onClick={()=> {
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
                        }) : ''}
                    </div>
                   
                </div>

                <div className={s.btn}>
                    Добавить фотографию
                </div>
            </div>
        </div>
    </div>


    )
}