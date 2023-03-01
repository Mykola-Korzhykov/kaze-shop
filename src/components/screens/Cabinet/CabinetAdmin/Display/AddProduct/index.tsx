import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import s from './AddProduct.module.scss'
//comonets
import { InputTextItem } from './InputText'
import {setAddPhotoState} from '../../../../../../redux/slices/admin'
import { useAppDispatch } from '@/redux/hooks'
import { ModuleWindiw } from "./ModuleWindow"
import {SizeItem} from './SizesItem'

interface AddProductProps {
    setModalAddPhoto: (n: boolean)=> void,
    modalAddPhoto: boolean,
    setModalAddColor: (n: boolean)=> void
    modalAddColor: boolean,
}

export const AddProduct = ({setModalAddPhoto, modalAddPhoto, setModalAddColor, modalAddColor}: AddProductProps) => {

    const dispatch = useAppDispatch()
//     function pushItemPhoto(){
//         addPhotoArr.push({id: addPhotoState[addPhotoState.length -1 ].id + 1 })
//         setAddPhoto(addPhotoArr)
//         addPhotoArr = addPhotoState
//     }

//     let addPhotoArr =  [{id: 1}]
//     const [addPhotoState, setAddPhoto] = React.useState([
//         {id: 1}
//    ])

//    console.log('addPhotoState', addPhotoState)
//    console.log('addPhotoArr', addPhotoArr)

   const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
   const addPhotoState =  useSelector((state: RootState)=> state.admin.addPhotoState)

    const  [inputs, setInputs] = React.useState([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', label: 'text', disable: false },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', label: 'text', disable: false },
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', label: 'text',  disable: false },
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', label: 'text',disable: false },
        { id: 5, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', label: 'text', disable: false },
        { id: 6, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', label: 'text', disable: false },
        { id: 7, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', label: 'text', disable: false },
        // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', label: 'text', disable: true, colors: colors },
        //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
   
    ])

    const inputsFistWrapper_1 = inputs?.slice(0, 2)
    const inputsFistWrapper_2 = inputs?.slice(2, 4)
    const inputsFistWrapper_3 = inputs?.slice(4, 6)
    const inputsFistWrapper_4 = inputs?.slice(6, 8)
    const inputsFistWrapper_5 = inputs?.slice(8, 9)
    
    // const inputsSecondWrapper = inputs?.slice(inputs.length - 1, inputs.length)


    const sizesItems = [
       { id: 0, size: 'XS'},
       { id: 1, size: 'S'},
       { id: 2, size: 'XXL'},
       { id: 3, size: 'XXS'},
       { id: 4, size: 'M'},
    //    { id: 5, size: 'XS'},
    ]
    let sizesArr = [{ id: 0, size: 'XS'}, { id: 1, size: 'S'},]
    const [sizesState, setSizesState] = React.useState(null)

    return (
        <div className={s.wrapper}>
            <form action="/submit-form" method="post">
            <div className={s.inputs_text}>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_1?.map((obj) => {
                            return <InputTextItem  
                            disable={obj.disable} 
                            key={obj.id} id={obj.id} 
                            type={obj.type} 
                            text={obj.text} 
                            placeholder={obj.placeholder} />
                        })}
                    </div>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_2?.map((obj) => {
                            return <InputTextItem  
                            disable={obj.disable} 
                            key={obj.id} 
                            id={obj.id} 
                            type={obj.type} 
                            text={obj.text} 
                            placeholder={obj.placeholder}
                            setModalAddColor={setModalAddColor}
                            modalAddColor={modalAddColor} />
                        })}
                    </div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_3?.map((obj) => {
                            return <InputTextItem  
                            disable={obj.disable} 
                            key={obj.id} id={obj.id} 
                            type={obj.type} 
                            text={obj.text} 
                            placeholder={obj.placeholder}
                            setModalAddColor={setModalAddColor}
                            modalAddColor={modalAddColor} />
                        })}
                    </div>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_4?.map((obj) => {
                            return <InputTextItem
                             setModalAddColor={setModalAddColor}
                             modalAddColor={modalAddColor} 
                             disable={obj.disable} 
                             key={obj.id} id={obj.id} 
                             type={obj.type} 
                             text={obj.text} 
                             placeholder={obj.placeholder} />
                        })}
                    </div>



                </div>

                <div className={s.inputs_wrapper}>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_5?.map((obj) => {
                            return <InputTextItem   
                            disable={obj.disable} 
                            key={obj.id} 
                            id={obj.id}
                            type={obj.type} 
                            text={obj.text} 
                            placeholder={obj.placeholder}
                            setModalAddColor={setModalAddColor}
                            modalAddColor={modalAddColor}  />
                            
                        })}
                    </div>

                   


                </div>

                {/* <div className={s.second_wrapper}>
                    {inputsSecondWrapper?.map((obj) => {
                        return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                    })}
                </div> */}
            </div>

                <div className={s.addphoto_wrapper}>
                    <div className={s.descriprion}>
                        <span className={s.title}>Добавить фото товара</span>
                        <span onClick={()=>{
                           dispatch(setAddPhotoState()) 
                        } } className={s.btn}>
                        <svg className={s.img} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 12H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 3.75V20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </span>
                    </div>
                    <div className={s.addphoto}>  
                    {addPhotoState?.map((el, ind)=>{
                        return <div onClick={()=> setModalAddPhoto(!modalAddPhoto)} className={s.addphoto_wrapper}>
                            <div className={s.element_wrapper}>
                                <span className={s.id}> {`${el.id}.`}</span>
                                <span className={s.text}>Загрузить фото</span>
                            </div>
                        </div>
                    })}
                    </div>
                  
                </div>
                <div className={s.net_wrapper}>
                    <span className={s.item_wrapper_1}>
                        Описание размерной сетки
                        <input className={s.item_1} placeholder="Введите описание размерной сетки" type="text" />
                    </span>
                    <span  className={s.item_wrapper_2}>
                        Загрузите размерную сетку
                        <label htmlFor="uploadnet" className={s.label}>
                            Загрузить размерную сетку
                        </label>
                        <input id='uploadnet' className={s.item_2} placeholder="Загрузить размерную сетку" type="file" />
                    </span>
                   
                </div>


                {/* module */}

                {/* <div className={s.module_wrapper}>
                    <div className={s.module_inner}>
                        <div className={s.title_wrapper}>
                            <div className={s.title}>Добавить фотографию</div>
                            <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
                        </div>

                        <div className={s.inputs_wrapper}>
                            <div className={s.input_inner}>
                                <span className={s.title}>Фотография в png и jpg</span>
                                <input placeholder='Загрузите фотографию' type="text" />
                            </div>
                            <div className={s.input_inner}>
                                <span className={s.title}>Размер</span>
                                <input placeholder='Выбрать размер фотографии' type="text" />
                            </div>

                            <div className={s.sizes}>
                                {sizesArr.map((el)=>{
                                    return <SizeItem size={el.size} />
                                })}
                            </div>
                        </div>
                    </div>
                </div> */}



                

                <div className={s.send_wrapper}>
                    <button className={s.btn_cancel}>Отправить</button>
                    <input className={s.btn_send} value='Добавить товар' type="submit" name="submit" id="" />
                </div>
            </form>
        </div>
    )
}