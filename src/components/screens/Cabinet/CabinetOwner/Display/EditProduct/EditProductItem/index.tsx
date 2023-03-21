import React from "react";
import s from './EditProductItem.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
import {addCountPhotos} from '../../../../../../../redux/slices/admin'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import photoTest from '../../../../../../../assets/images/product/slider/photo.png'
import photo from '../../../../../../../assets/images/admin/img.png'
import Image from "next/image";
import openInput from '../../../../../../../assets/icons/cabinetAdmin/open_input.svg'
//components 
import {Input} from './Input'
import {SizeItem} from '../../AddProduct/SizesItem'
import {ColorItem} from '../../AddProduct/ColorItem'
//types 
import {Goods} from '../../../../../../../types/goods'
import {ImageData}  from '../../../../../../../types/goods'

interface EditProductItemType {
    id: number,
    // price: number
}

export const EditProductItem = ({id, }: EditProductItemType) =>{

    const dispatch = useAppDispatch()

    const [choiseSize, setChoiseSize] = React.useState<boolean>(false)
    const [choiceColors, setChoiceColors] = React.useState<boolean>(false)
    const sizesItems = useSelector((state: RootState)=> state.admin.sizesItems)
    const userEdit = useSelector((state: RootState)=> state.admin.userEdit)

    // console.log('EditProductItemID', id)

    const editProductItemId = useSelector((state: RootState)=> state.admin.editProductItemId)
    const products = useSelector((state: RootState)=>state.admin.editProducts)
    const colors = useSelector((state: RootState)=>state.goods.fetchedColours)

    // console.log('userEdit', userEdit.images[0].imagesPaths)

    interface ImageData {
        imagesPaths: string[];
        record: Record<string, string>;
        sizes: string[];
    }

    React.useEffect(()=>{
        
    }, [])

   

    // const [arrPhotos, setArrPhotos] = React.useState<any>([...userEdit.images])
    // console.log('arrPhotos', arrPhotos)

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
            <span className={s.btn }  onClick={(e)=>{
                console.log('click')
                // e.stopPropagation()
                //@ts-ignore
                dispatch(addCountPhotos()) 
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3.75V20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </span>
        </div>

       {/* мепаю вофо существующих товаров  */}

       <div className={s.photos_wrapper}>

       {/* {userEdit.images.map((el: any, ind: number) => {
            return (
                <div className={s.item}>
                    <span className={s.index}>{ind}</span>
                    <span className={s.button_product}>lflflfllflflf</span>
                    <div className={s.photos_wrapper}>
                        {el.imagesPaths.map((el: any)=>{
                            return  <span className={s.photo_wrapper}>
                                        <Image src={el} alt={'photo'}/>
                                    </span>
                        })}
                    </div>
                </div>
            );
        })} */}

        {userEdit.images.map((el, ind)=>{
            return  <div  className={s.item}>
                        <div className={s.info_wrapper}>
                            <span className={s.index}>{`${ind + 1}.`}</span>  
                            <span className={s.button_product}
                                    style={{
                                        color: el !== null ? `${el.colour.hex}` : '#0B0B0B',
                                        border: el !== null ? `${el.colour.hex} solid 1.5px` : '#0B0B0B solid 1.5px',
                                        
                                    }} 
                                        > {el !== null ? 'Удалить сет' : 'Загрузить фото' }</span>
                        </div>
                        
                            {el &&   
                            <div className={s.photos_wrapper}>
                                {el.imagesPaths.map((el: any)=>{
                                    return  <span className={s.photo_wrapper}>
                                                <Image  
                                                src={el}
                                                alt={'photo'}
                                                width={70}
                                                height={102}
                                                
                                                />
                                            </span>
                                })}
                            </div>} 
                           
                    </div>
        })}

       </div>

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
                // console.log('click')
                }} className={s.colours_select_wrapper}>
                <div className={s.title}>
                    Цвет товара
                </div>
                <label className={s.label_colors} htmlFor="colorsbyproduct">
                    Выберите цвет
                    <input onClick={(e) => {
                        e.stopPropagation();
                    }}  className={s.input_colors} id="colorsbyproduct" type="text" />
                    <Image className={choiseSize ? `${s.input_icon_on} ${s.input_icon}` : `${ s.input_icon_off} ${s.input_icon}` } src={openInput} alt='error' />
                </label>
                <div className={ choiceColors? s.choice_colors_wrapper : s.choice_colors_wrapper_off }>
                    {colors.map((el, ind)=>{
                        return <div key={ind} className={s.item_wrapper}>
                            <span 
                                style={{
                                    marginLeft: '20px',
                                    backgroundColor: `${el.hex}`,
                                    display: 'block',
                                    height: '23px',
                                    width: '23px'
                                }}
                                className={s.color}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                            <span
                                className={s.title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {el.ua}
                            </span>
                        </div>
                    })}
                </div>


            </div>

            <div className={s.select_colors_wrapper}>
                     {userEdit.colours?.map((el, ind)=>{
                        return < ColorItem key={ind} hex={el.hex} label={el.ua} /> 
                     })}
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