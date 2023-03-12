import React from "react";
import s from './EditProductItem.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
import photo from '../../../../../../../assets/images/admin/img.png'
import Image from "next/image";
import openInput from '../../../../../../../assets/icons/cabinetAdmin/open_input.svg'
//components 
import {Input} from './Input'
import {SizeItem} from '../../AddProduct/SizesItem'
//types 
import {Goods} from '../../../../../../../types/goods'

interface EditProductItemType {
    id: number,
    // price: number
}



export const EditProductItem = ({id, }: EditProductItemType) =>{

    const [choiseSize, setChoiseSize] = React.useState<boolean>(false)
    const [choiceColors, setChoiceColors] = React.useState<boolean>(false)
    const sizesItems = useSelector((state: RootState)=> state.admin.sizesItems)

    console.log('EditProductItemID', id)

    const editProductItemId = useSelector((state: RootState)=> state.admin.editProductItemId)
    const products = useSelector((state: RootState)=>state.admin.editProducts)
    const colors = useSelector((state: RootState)=>state.goods.fetchedColours)

    console.log('colors', colors)


    const [userEdit, setUserEdit] = React.useState<Goods>( {
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
            fileNames: ['fllflf', 'lfllf'],
            colourId: 3,
            sizes: ["S", "M", "L"]
        },
        {
            fileNames: ['lflflf', 'fllflflf'],
            colourId: 4,
            sizes: ["S", "M", "L"]
        },
        ],
          sizeChartImage: 'kfkf'
          ,
        sizes: ['X', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS', 'XS'],
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
    } )

    // const activeProduct = products.find((el)=>{
    //     return el.id === id
    // })

    const  [inputs, setInputs] = React.useState([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название товара', name: 'titleRU', disable: false,  },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название товара', name: 'titleUA', disable: false },
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название товара', name: 'titleSRB',  disable: false },
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название товара', name: 'titleENG',disable: false },
        { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false },
        { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false },
        { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false },
        { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false },
        { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', name: 'text', disable: false },
        { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
        { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },
        // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', name: 'text', disable: true, colors: colors },
        //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
    ])

    return (
        <>
        <div  style={ editProductItemId >= 1 ? {display : 'block'} : {display : 'none'}}  >
       
        <div style={ editProductItemId >= 1 ? {display : 'flex'} : {display : 'none'}} className={s.wrapper}>
        
        {inputs.map((obj, ind)=>{
            return <div  key={ind} className={s.inputs_wrapper}>
                <Input 
                // price={price}
                placeholder={obj.placeholder}
                text={obj.text}
                name={obj.name}
                id={obj.id} 
                type={obj.type}
                disable={obj.disable} 
               />

            </div>
        })}


       

        

        </div>


        <div className={s.addphoto_wrapper}>
            <span className={s.title}>Добавить фото товара</span>
            <span className={s.btn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3.75V20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </span>
        </div>

       {/* мепаю вофо существующих товаров  */}

        <div className={s.net_wrapper}>

          <div className={s.desription_net_wrapper}>
            <span className={s.title}>Описание размерной сетки</span>
            <input className={s.input} name="desription_net" type="text" placeholder={'Описание размерной сетки'} />
          </div>

          <div className={s.file_net_wrapper}>
            <span className={s.title}>Загрузите размерную сетку</span>
            <label className={s.label} htmlFor="uploadnet">
                Изменить размерную сетку
            </label>
            <input className={s.input_file} id='uploadnet' name="net_file" type="file"  />
          </div>
        </div>

        {/* размер товара делаю интуп и СЕТАЮ существующие в отдельную переменную , меняю ее в редактировке и отправляю при отправке */}

        <div className={s.choice_size_wrapper}>
            <span  className={s.choice_size_title}>
                Размер товара
            </span>
           <label className={s.choice_size_label} onClick={()=>{
                setChoiseSize(!choiseSize)
           }}  htmlFor="choisesize">
                Выберите размер
                <input onClick={()=>{
                setChoiseSize(!choiseSize)
           }} className={s.input_colours} disabled id='choisesize' placeholder="Выберите размер" type="text"   />
                <Image className={choiseSize ? `${s.input_icon_on} ${s.input_icon}` : `${ s.input_icon_off} ${s.input_icon}` } src={openInput} alt='error' />

           </label>

           <div className={ choiseSize ?  s.choise_set_wrapper :  s.choise_set_wrapper_off }>
                {sizesItems.map((el, ind)=>{
                    return <div  key={ind} className={s.choise_set_item}>
                        <span className={s.choise_set_title}>
                            {el.size}
                        </span>
                    </div>
                })}
           </div>

           <div className={s.selected_sizes}>
                {userEdit?.sizes.map((el, ind)=>{
                    return <span className={s.selected_sizes_item} key={ind}  > 
                            <SizeItem key={ind} id={ind} size={el} />
                        </span>
                })}
           </div>

        </div>


        <div onClick={()=>{
                setChoiceColors(!choiceColors)
            }} className={s.colours_select_wrapper}>
            <div className={s.title}>
                Цвет товара
            </div>
            <label className={s.label_colors} htmlFor="colorsbyproduct">
                
                Выберите цвет
                <input  className={s.input_colors} id="colorsbyproduct" type="text" />
                <Image className={choiseSize ? `${s.input_icon_on} ${s.input_icon}` : `${ s.input_icon_off} ${s.input_icon}` } src={openInput} alt='error' />
            </label>

            <div className={ choiceColors? s.choice_colors_wrapper : s.choice_colors_wrapper_off }>
                {colors.map((el, ind)=>{
                    return <div className={s.item_wrapper}>
                        <span  style={{
                            marginLeft: '20px',
                            backgroundColor: `${el.hex}`,
                            display: 'block',
                            height: '23px',
                            width: '23px' }}className={s.color}>  </span>

                        <span className={s.title}> {el.label}  </span>

                    </div>
                })}

            </div>
        </div>

        {/* тоже самое с цветами , сатею в отдельную переменную, локальную переменную после чего с ней работаю и отправляю при отправке ее уже  */}

        <div className={s.send_wrapper}>
            <span className={s.send_cancel}>Отмена</span>
            <span className={s.send}>Изменить товар</span>

        </div>
        </div>

        </>
    )

 }